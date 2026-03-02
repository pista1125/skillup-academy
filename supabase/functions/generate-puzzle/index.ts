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
        const { prompt } = await req.json();

        if (!prompt) {
            return new Response(
                JSON.stringify({ error: 'Prompt is required' }),
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
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `Te egy matematikai rejtvénykészítő vagy. A felhasználó leírja, milyen rejtvényt szeretne, és te generálsz 5-15 matematikai kérdést és megoldást.

FONTOS SZABÁLYOK:
- A válaszod KIZÁRÓLAG egy JSON tömb legyen, semmi más szöveg!
- Minden elemnek legyen "question" (kérdés szövege) és "answer" (megoldás) mezője
- A megoldás legyen rövid: szám vagy rövid szó (max 6 karakter)
- A kérdések legyenek érthetőek és kornak megfelelőek
- Generálj egy "title" mezőt is a rejtvény számára
- A formátum: {"title": "cím", "questions": [{"question": "...", "answer": "..."}, ...]}
- CSAK érvényes JSON-t adj vissza, semmi mást!`
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const content = completion.choices[0].message.content;

        // Attempt to parse to ensure it's valid JSON
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
