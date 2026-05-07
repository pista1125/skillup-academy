import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { OpenAI } from "https://esm.sh/openai@4.28.0";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { topic, questionCount = 13 } = await req.json();

        if (!topic) {
            return new Response(
                JSON.stringify({ error: 'Topic is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const apiKey = Deno.env.get('OPENAI_API_KEY');
        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: 'OPENAI_API_KEY not found in environment' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const openai = new OpenAI({
            apiKey: apiKey,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `Te egy oktatási segédanyag-készítő vagy. A feladatod egy "Totó" típusú kvíz generálása.
Egy Totó 13+1 (vagy a megadott mennyiségű) kérdésből áll, és minden kérdéshez pontosan 3 válaszlehetőség tartozik.

SZABÁLYOK:
- A válaszod KIZÁRÓLAG egy JSON objektum legyen.
- Az objektum tartalmazzon egy "title" mezőt (a kvíz címe) és egy "questions" tömböt.
- A "questions" tömb elemei:
    - "question": A kérdés szövege.
    - "options": Egy tömb, ami pontosan 3 választ tartalmaz.
    - FONTOS: Mindig a HELYES választ tedd az "options" tömb ELSŐ helyére (0. index)! A többi két helyre kerüljenek a rossz válaszok.
    - "correctAnswerIndex": Mindig legyen 0 (mivel a helyes válasz az első helyen van).
- A kérdések legyenek érdekesek és illeszkedjenek a megadott témakörhöz.
- A válaszlehetőségek legyenek rövidek, egyértelműek.
- CSAK érvényes JSON-t adj vissza, Markdown formatting nélkül!`
                },
                {
                    role: "user",
                    content: `Témakör: ${topic}\nKérdések száma: ${questionCount}`,
                },
            ],
            temperature: 0.7,
            max_tokens: 2500,
        });

        const content = completion.choices[0].message.content;

        let parsed;
        try {
            const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsed = JSON.parse(cleaned);
        } catch (e) {
            console.error("Failed to parse OpenAI response:", content);
            throw new Error("Invalid JSON returned from AI");
        }

        return new Response(
            JSON.stringify(parsed),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
