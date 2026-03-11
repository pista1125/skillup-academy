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
        const { topic, questionCount = 10, hiddenWord = '' } = await req.json();

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

        // Construct dynamic instructions based on whether a hidden word is provided
        let hiddenWordInstructions = '';
        if (hiddenWord) {
            const cleanWord = hiddenWord.trim().toUpperCase().replace(/\s+/g, '');

            hiddenWordInstructions = `
A keresztrejtvény VÁRT fő megfejtése a következő szó lenne: "${cleanWord}".
Kérlek, generálj pontosan ${cleanWord.length} db kérdést.
A LEGFONTOSABB SZABÁLY: Olyan kérdéseket és válaszokat generálj, amelyek tökéletesen illeszkednek a témához, és a válaszok minden esetben PONTOS, ÉRTELMES, KIVÁLÓ MINŐSÉGŰ magyar szavak vagy kifejezések legyenek! A minőség mindenek felett áll!

MÁSODLAGOS CÉL (opcionális): Próbáld meg úgy összeállítani a szavakat, hogy az i. válasz tartalmazza a "${cleanWord}" i. betűjét. Ha sikerül egy ilyen szót találnod ami TÖKÉLETESEN illik a témához, akkor használd azt. Ha nem találsz ilyet, AKKOR INKÁBB GENERÁLJ EGY JÓ, TÉMÁBA VÁGÓ SZÓT, függetlenül attól, hogy tartalmazza-e a betűt vagy sem. Később a felhasználó úgyis kézzel tudja módosítani.

A JSON tömb minden objektumának az "answer" mezőjén kívül tartalmaznia kell a következőket:
- "highlightIndex": (szám) 0-tól induló index, amely megadja, hogy a válasz hányadik (space-t is beszámítva, 0 indexelve) karaktere felel meg az adott kérdéshez várt betűnek. Ha a szóban NINCS benne a várt betű (mivel a szavak minőségét preferáltad), akkor ez az érték legyen -1, vagy válassz egy véletlenszerű indexet a szó hosszán belül.
- "offset": 0 (mindig legyen 0)
`;
        } else {
             hiddenWordInstructions = `A JSON válasz tartalmazza a "question" és "answer" mezőket. "offset" legyen 0 minden szónál, "highlightIndex" pedig -1.`;
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `Te egy matematikai és általános oktatási rejtvénykészítő vagy. A felhasználó megad egy témakört, és egy kért kérdés-mennyiséget.
A feladatod ${questionCount} db kérdést (és megoldást) generálni az adott témában. (Kivéve, ha meg van adva megfejtés, akkor pontosan annyi kérdés kell, ahány betű a megfejtésben van!)

FONTOS SZABÁLYOK:
- A megoldás lehet több szóból álló, ilyenkor szóközök választják el (pl. "NÉGYZET ALAPÚ"). A space karakter megengedett, és 1 karakter hosszú rácselemet foglal!
- A válaszod KIZÁRÓLAG egy JSON objektum, amiben szerepel egy "title" és egy "questions" nevű tömb.
- A "questions" tömb objektumai tartalamazzanak: "question" (kérdés szövege) és "answer" (megoldás, CSUPA NAGYBETŰVEL).
- A megoldás rövid és egyértelmű legyen.
- A "title" mező (szöveg) a rejtvény témájához illő cím.
- A formátum szigorúan: {"title": "cím", "questions": [{"question": "...", "answer": "...", "highlightIndex": ..., "offset": ...}, ...]}
- CSAK érvényes JSON-t adj vissza, Markdown formatting \`\`\`json blokk nélkül!` + hiddenWordInstructions
                },
                {
                    role: "user",
                    content: `Témakör: ${topic}\nKérdések (vagy betűk) száma: ${questionCount}`,
                },
            ],
            temperature: 0.7,
            max_tokens: 2500,
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
