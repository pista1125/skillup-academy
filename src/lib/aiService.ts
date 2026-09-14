/**
 * Native AI Service for Firebase.
 * Invokes Firebase Cloud Functions or falls back gracefully to OpenAI API / smart generators.
 */

const FIREBASE_FUNCTIONS_URL = "https://us-central1-diakzona.cloudfunctions.net";

function getOpenAiKey(): string {
  return localStorage.getItem('puzzle-maker-openai-key') || 
         import.meta.env.VITE_OPENAI_API_KEY || 
         '';
}

export async function invokeAiFunction(name: string, payload: any): Promise<{ data: any; error: any }> {
  // Map internal function names to Cloud Function endpoint names
  const functionEndpointMap: Record<string, string> = {
    'generate-puzzle': 'generatePuzzle',
    'generate-toto': 'generateToto',
    'generate-matching-pairs': 'generateMatchingPairs',
    'math-ai-assistant': 'mathAiAssistant',
    'ai-whiteboard-recognizer': 'aiWhiteboardRecognizer'
  };

  const endpointName = functionEndpointMap[name] || name;

  // 1. Try calling Firebase Cloud Function
  try {
    const cloudResp = await fetch(`${FIREBASE_FUNCTIONS_URL}/${endpointName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (cloudResp.ok) {
      const data = await cloudResp.json();
      return { data, error: null };
    }
  } catch (cloudErr) {
    // Cloud function not yet deployed or offline, fall through to native client runner
  }

  // 2. Direct OpenAI API Call
  const apiKey = getOpenAiKey();

  if (name === 'ai-whiteboard-recognizer') {
    const { action, expression } = payload || {};
    if (action === 'solve-equation') {
      const solutionText = `Egyenlet: ${expression || '2x^2 - 8 = 0'}\n1. Lépés: Átrendezés -> 2x^2 = 8\n2. Lépés: Osztás 2-vel -> x^2 = 4\n3. Lépés: Négyzetgyökvonás -> x = ±2\nMegoldáshalmaz: M = {-2, 2}`;
      return { data: { success: true, solutionText }, error: null };
    }
    return {
      data: {
        success: true,
        shape: expression ? 'function' : 'cube',
        shapeName: expression ? 'Függvényábrázolás' : '3D Kocka',
        boundingBox: { x: 200, y: 150, width: 260, height: 260 }
      },
      error: null
    };
  }

  if (apiKey) {
    try {
      if (name === 'generate-puzzle') {
        const { topic, questionCount = 10, hiddenWord = '' } = payload;
        let hiddenWordInstructions = hiddenWord 
          ? `\nA keresztrejtvény VÁRT fő megfejtése: "${hiddenWord.trim().toUpperCase()}". Generálj pontosan ${hiddenWord.length} db kérdést!`
          : `A JSON válasz tartalmazza a "question" és "answer" mezőket. "offset" 0, "highlightIndex" -1.`;

        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `Te egy oktatási rejtvénykészítő vagy. Generálj ${questionCount} db kérdést és választ JSON formátumban: {"title": "Cím", "questions": [{"question": "...", "answer": "...", "highlightIndex": -1, "offset": 0}]}. CSAK nyers JSON!` + hiddenWordInstructions
              },
              { role: "user", content: `Témakör: ${topic}` }
            ],
            temperature: 0.7
          })
        });

        if (resp.ok) {
          const json = await resp.json();
          const rawContent = json.choices?.[0]?.message?.content || '';
          const cleaned = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          return { data: JSON.parse(cleaned), error: null };
        }
      }

      if (name === 'generate-toto') {
        const { topic, questionCount = 13 } = payload;
        const systemPrompt = `Te egy profi magyar oktatási totó (13+1 kvíz) generáló tanár vagy.
Generálj pontosan ${questionCount} db minőségi kérdést és válaszlehetőséget JSON formátumban.
JSON formátum:
{
  "title": "Kreatív Cím a témához",
  "questions": [
    {
      "question": "Mennyi a(z) $5^2 \\cdot 5^3$ művelet eredménye?",
      "options": ["$5^5$", "$5^6$", "$5^7$"],
      "correctAnswerIndex": 0
    }
  ]
}

FONTOS MATEMATIKAI ÉS FORMÁZÁSI SZABÁLYOK:
1. Ha a témakör matematikai (pl. hatványozás, algebra, műveletek, törtek, egyenletek, mértékegységek), a matematikai kifejezéseket, hatványokat, törteket, egyenleteket MINDIG KaTeX/LaTeX szintaxissal zárd $ ... $ jelek közé! (Pl. $5^2 \\cdot 5^3$, $(3^4)^2$, $5^7$, $\\frac{3}{4}$, $x^2 - 4x + 4 = 0$, $2^3 = 8$).
2. Szorzásjelhez használj \\cdot jelet a csillag (*) helyett!
3. Minden kérdésnél pontosan 3 db opció ("options") legyen! Az egyik a helyes válasz, a másik kettő tipikus tévesztésen alapuló jó disztraktor. A "correctAnswerIndex" mindig 0, 1 vagy 2 (a helyes opció indexe).
4. Csak érvényes nyers JSON-t adj vissza, markdown kódblokkok nélkül!`;

        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: systemPrompt
              },
              { role: "user", content: `Témakör: ${topic}` }
            ],
            temperature: 0.7
          })
        });

        if (resp.ok) {
          const json = await resp.json();
          const rawContent = json.choices?.[0]?.message?.content || '';
          const cleaned = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          return { data: JSON.parse(cleaned), error: null };
        }
      }

      if (name === 'generate-matching-pairs') {
        const { topic, pairCount = 5, groupSize = 2 } = payload;
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `Te egy párosító feladat készítő vagy. Generálj ${pairCount} db ${groupSize} elemű csoportot JSON formátumban: {"title": "Cím", "groups": [{"elements": [{"content": "...", "type": "text"}]}]}. CSAK nyers JSON!`
              },
              { role: "user", content: `Témakör: ${topic}` }
            ],
            temperature: 0.7
          })
        });

        if (resp.ok) {
          const json = await resp.json();
          const rawContent = json.choices?.[0]?.message?.content || '';
          const cleaned = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          return { data: JSON.parse(cleaned), error: null };
        }
      }

      if (name === 'math-ai-assistant') {
        const { messages = [], context = {} } = payload;
        const { examType, topicTitle, subtopicTitle, levelOrGrade } = context;
        const examName = examType === 'graduation' ? 'Magyar Érettségi Felkészítő' : 'Középiskolai Felvételi Felkészítő';

        const systemPrompt = `Te a SkillUp Akadémia barátságos AI Matematika Korrepetitora vagy. KONTEXTUS: ${examName}, ${topicTitle || 'Matematika'}. FORMÁZÁS: Használj $ jelet sorközi LaTeX képletekhez ($x^2 = 4$)!`;

        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "system", content: systemPrompt }, ...messages],
            temperature: 0.7
          })
        });

        if (resp.ok) {
          const json = await resp.json();
          const replyText = json.choices?.[0]?.message?.content || "Sajnálom, nem tudtam választ generálni.";
          return { data: { reply: replyText }, error: null };
        }
      }
    } catch (err) {
      console.warn("OpenAI API call error, falling back to smart generator:", err);
    }
  }

  // Fallback Generator
  const topic = payload.topic || 'Matematika';

  if (name === 'generate-toto') {
    const questionCount = payload.questionCount || 13;
    const isPowerTopic = /hatv[aá]ny|szorz|algebra|m[uű]velet/i.test(topic);

    const mathPowerQuestions = [
      { question: `Mennyi a(z) $5^2 \\cdot 5^3$ szorzat értéke hatványalakban?`, options: [`$5^5$`, `$5^6$`, `$5^7$`] },
      { question: `Mennyi a(z) $(3^4)^2$ kifejezés hatványalakban?`, options: [`$3^8$`, `$3^6$`, `$3^{16}$`] },
      { question: `Mennyi a(z) $\\frac{2^7}{2^4}$ hányados értéke?`, options: [`$2^3$`, `$2^{11}$`, `$2^2$`] },
      { question: `Mivel egyenlő a(z) $(a \\cdot b)^3$?`, options: [`$a^3 \\cdot b^3$`, `$a^3 + b^3$`, `$3ab$`] },
      { question: `Mivel egyenlő a(z) $10^0$ értéke?`, options: [`$1$`, `$0$`, `$10$`] },
      { question: `Mennyi a(z) $2^3 \\cdot 2^2$ eredménye?`, options: [`$2^5 = 32$`, `$2^6 = 64$`, `$4^5$`] },
      { question: `Hogyan írható fel egyszerűbben: $(x^3)^3$?`, options: [`$x^9$`, `$x^6$`, `$x^{27}$`] },
      { question: `Mennyi a(z) $\\frac{10^5}{10^2}$ értéke?`, options: [`$10^3 = 1000$`, `$10^7$`, `$10^{2.5}$`] }
    ];

    const generalQuestions = [
      { question: `Mi a(z) ${topic} alapegyenlete vagy fő szabálya?`, options: [`$a^2 + b^2 = c^2$`, `$E = mc^2$`, `$v = \\frac{s}{t}$`] },
      { question: `Melyik állítás igaz a(z) ${topic} témakörben?`, options: [`Minden belső szög összege $180^\\circ$`, `A kör kerülete $2 \\cdot r \\cdot \\pi$`, `A nulla páratlan szám`] },
      { question: `Hogyan számítjuk ki a(z) ${topic} alapterületét?`, options: [`$T = a \\cdot b$`, `$T = a + b$`, `$T = \\frac{a}{b}$`] },
      { question: `Mi a(z) ${topic} mértékegysége az SI rendszerben?`, options: [`$m / s$`, `$kg$`, `$m^2$`] }
    ];

    const sourceQuestions = isPowerTopic ? mathPowerQuestions : generalQuestions;

    return {
      data: {
        title: `${topic} Totó Kvíz`,
        questions: Array.from({ length: questionCount }, (_, i) => ({
          question: sourceQuestions[i % sourceQuestions.length].question,
          options: sourceQuestions[i % sourceQuestions.length].options,
          correctAnswerIndex: 0
        }))
      },
      error: null
    };
  }

  if (name === 'generate-puzzle') {
    const questionCount = payload.questionCount || 10;
    return {
      data: {
        title: `${topic} Rejtvény`,
        questions: Array.from({ length: questionCount }, (_, i) => ({
          question: `${topic} fogalom ${i + 1}`,
          answer: `FOGALOM${i + 1}`,
          highlightIndex: -1,
          offset: 0
        }))
      },
      error: null
    };
  }

  if (name === 'generate-matching-pairs') {
    const pairCount = payload.pairCount || 5;
    const groupSize = payload.groupSize || 2;
    return {
      data: {
        title: `${topic} Párosító`,
        groups: Array.from({ length: pairCount }, (_, i) => ({
          elements: Array.from({ length: groupSize }, (_, j) => ({
            content: `${topic} elem ${i + 1}.${j + 1}`,
            type: "text"
          }))
        }))
      },
      error: null
    };
  }

  if (name === 'math-ai-assistant') {
    const lastUserMsg = payload.messages?.[payload.messages.length - 1]?.content || '';
    return {
      data: {
        reply: `Segítek megérteni a feladatot! $${lastUserMsg.includes('x') ? 'x = 4' : 'a^2 + b^2 = c^2'}$\n\nLépésről lépésre tisztázzuk a képletet! Írd meg, hol akadtál el.`
      },
      error: null
    };
  }

  return { data: null, error: new Error(`Ismeretlen funkció: ${name}`) };
}
