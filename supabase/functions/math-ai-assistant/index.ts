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
    const { messages = [], context = {} } = await req.json();

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OPENAI_API_KEY is not configured in Supabase Environment Secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openai = new OpenAI({ apiKey });

    // Build system prompt using active learning context
    const { examType, topicTitle, subtopicTitle, levelOrGrade } = context;
    const examName = examType === 'graduation' ? 'Magyar Érettségi Felkészítő' : 'Középiskolai Felvételi Felkészítő';

    const systemPrompt = `Te a SkillUp Akadémia barátságos, türelmes és magas szakmai felkészültségű AI Matematika Korrepetitora vagy.
Segítesz a diákoknak megérteni a matematika feladatokat és felkészülni a felvételire vagy érettségire.

AKTUÁLIS TANULÁSI KONTEXTUS:
- Vizsga típus: ${examName || 'Matematika'}
- Fő témakör: ${topicTitle || 'Általános matematika'}
- Alfejezet: ${subtopicTitle || 'Aktuális tananyag'}
- Szint / Évfolyam: ${levelOrGrade || 'Alap'}

PEDAGÓGIAI IRÁNYELVEK:
1. Légy bátorító, türelmes, érthető és kedves a diákkal.
2. NE add meg azonnal a végeredményt tálcán! Segítő kérdésekkel, részletes levezetésekkel és közérthető magyarázatokkal vezesd rá a diákot a megoldásra.
3. Képek elemzése esetén (pl. lefotózott feladatlap, kézzel írt megoldás, geometriai ábra): először olvasd ki a képen látható szöveget/számokat, majd tisztázd a feladat célját, és ellenőrizd vagy lépésről lépésre segítsd a megoldást.
4. Használj szép KaTeX matematika formulákat:
   - Inline egyenletekhez: $a^2 + b^2 = c^2$, $\\sin\\alpha = \\frac{a}{c}$
   - Blokk egyenletekhez: $$x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
5. Használj jól olvasható Markdown kiemeléseket (félkövér, felsorolás, lépésekre bontás).`;

    // Construct full completion request
    const completionMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: completionMessages,
      max_tokens: 2000,
      temperature: 0.7,
    });

    const replyText = completion.choices[0]?.message?.content || "Sajnálom, nem tudtam választ generálni. Kérlek próbáld újra!";

    return new Response(
      JSON.stringify({ reply: replyText }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in math-ai-assistant edge function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
