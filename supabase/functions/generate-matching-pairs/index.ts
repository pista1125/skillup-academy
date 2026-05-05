import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { OpenAI } from "https://esm.sh/openai@4.28.0";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { topic, pairCount = 5, groupSize = 2 } = await req.json();

        if (!topic) {
            return new Response(
                JSON.stringify({ error: 'Topic is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const apiKey = Deno.env.get('OPENAI_API_KEY');
        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: 'OPENAI_API_KEY nem található a környezeti változók között' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const openai = new OpenAI({ apiKey });

        const promptInstruction = `
Te egy oktatási feladatkészítő asszisztens vagy.
Készíts egy párosító (vagy csoportosító) feladatot a következő témában: "${topic}".

Kérlek, generálj pontosan ${pairCount} db csoportot.
Egy csoport pontosan ${groupSize} db elemből áll (ezek az egymáshoz tartozó fogalmak, kifejezések, képletek).

SZABÁLYOK:
- A válaszod KIZÁRÓLAG egy érvényes JSON objektum legyen! Ne tegyél köré \`\`\`json markdown blokkot!
- Formátum:
{
  "title": "A feladat címe",
  "groups": [
    {
      "elements": [
        {"content": "elem 1 tartalma", "type": "text vagy math"},
        {"content": "elem 2 tartalma", "type": "text vagy math"}
        // ... (pontosan ${groupSize} db elem a "elements" tömbben)
      ]
    }
  ]
}
- A "type" mező értéke legyen "math" ha LaTeX formátumot tartalmaz (pl. képletek, törtek), és "text" ha sima szöveg.
- Az elemek ne legyenek túl hosszúak (lehetőleg 1-4 szó).
- Ha 3 vagy 4 elemű a csoport, ügyelj arra, hogy mindegyik elem egyértelműen kapcsolódjon ugyanahhoz a koncepcióhoz (pl. "20 cm", "2 dm", "0.2 m").
        `.trim();

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: promptInstruction },
                { role: "user", content: `Témakör: ${topic}\nCsoportok száma: ${pairCount}\nElemek száma egy csoportban: ${groupSize}` },
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const content = completion.choices[0].message.content || '';
        let parsed;
        try {
            const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsed = JSON.parse(cleaned);
        } catch (e) {
            console.error("Hiba a JSON feldolgozásakor:", content);
            throw new Error("Az AI nem megfelelő formátumban válaszolt.");
        }

        return new Response(
            JSON.stringify(parsed),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
