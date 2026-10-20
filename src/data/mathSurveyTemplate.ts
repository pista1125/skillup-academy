import { SurveyTemplate } from '@/types/surveyFeedback';

export const MATH_SURVEY_TEMPLATE: SurveyTemplate = {
  id: 'math_feedback_comprehensive',
  title: 'Visszajelző lap – Gondolatok a matematikaórákról',
  subtitle: 'A véleményed fontos! Nincs jó vagy rossz válasz.',
  note: 'Válaszolj őszintén; a nevedet nem kötelező megadnod!',
  sections: [
    {
      id: 'section_1_feelings',
      number: 1,
      title: 'Hogyan érzed magad a matematikaórákon?',
      subtitle: 'Általános hangulat és tanórai élmények',
      icon: '😊',
      badgeColor: 'from-blue-500 to-indigo-600',
      questions: [
        {
          id: 'q1_love_math',
          number: 1,
          question: 'Mennyire szereted a matematikaórákat?',
          type: 'single_choice',
          options: [
            { value: 'very', label: 'Nagyon', icon: '🌟', score: 5 },
            { value: 'rather_yes', label: 'Inkább igen', icon: '👍', score: 4 },
            { value: 'medium', label: 'Közepesen', icon: '😐', score: 3 },
            { value: 'rather_not', label: 'Inkább nem', icon: '👎', score: 2 },
            { value: 'not_at_all', label: 'Egyáltalán nem', icon: '😞', score: 1 }
          ],
          required: true
        },
        {
          id: 'q2_comprehension',
          number: 2,
          question: 'Mennyire érted meg a tananyagot az órákon?',
          type: 'single_choice',
          options: [
            { value: 'always', label: 'Szinte mindig', icon: '💡', score: 4 },
            { value: 'mostly', label: 'Többnyire', icon: '👌', score: 3 },
            { value: 'sometimes', label: 'Néha', icon: '🤔', score: 2 },
            { value: 'rarely', label: 'Ritkán', icon: '❓', score: 1 }
          ],
          required: true
        },
        {
          id: 'q3_courage_ask',
          number: 3,
          question: 'Mennyire mersz kérdezni, hibázni vagy segítséget kérni?',
          type: 'single_choice',
          options: [
            { value: 'fully', label: 'Teljesen', icon: '🙋‍♂️', score: 5 },
            { value: 'mostly', label: 'Többnyire', icon: '✋', score: 4 },
            { value: 'sometimes', label: 'Néha', icon: '🤐', score: 3 },
            { value: 'rarely', label: 'Ritkán', icon: '😟', score: 2 },
            { value: 'not_at_all', label: 'Egyáltalán nem', icon: '❌', score: 1 }
          ],
          required: true
        },
        {
          id: 'q4_explanation',
          number: 4,
          question: 'Milyen a tanár magyarázata?',
          type: 'single_choice',
          options: [
            { value: 'clear', label: 'Érthető', icon: '🎯', score: 4 },
            { value: 'mostly_clear', label: 'Többnyire érthető', icon: '👍', score: 3 },
            { value: 'hard_to_follow', label: 'Néha nehéz követni', icon: '⚡', score: 2 },
            { value: 'unclear', label: 'Gyakran nem értem', icon: '🌫️', score: 1 }
          ],
          required: true
        },
        {
          id: 'q5_atmosphere',
          number: 5,
          question: 'Milyen a matematikaórák hangulata?',
          type: 'single_choice',
          options: [
            { value: 'very_good', label: 'Nagyon jó', icon: '🎉', score: 4 },
            { value: 'good', label: 'Inkább jó', icon: '🙂', score: 3 },
            { value: 'variable', label: 'Változó', icon: '⚖️', score: 2 },
            { value: 'rather_bad', label: 'Inkább rossz', icon: '🙁', score: 1 }
          ],
          required: true
        }
      ]
    },
    {
      id: 'section_2_learning_support',
      number: 2,
      title: 'Mi segíti a tanulásodat?',
      subtitle: 'Módszerek, feladattípusok és nehézségek',
      icon: '🚀',
      badgeColor: 'from-emerald-500 to-teal-600',
      questions: [
        {
          id: 'q6_helps_most',
          number: 6,
          question: 'Mi segít a legjobban? (Többet is bejelölhetsz)',
          type: 'multi_choice',
          options: [
            { value: 'teacher_explanation', label: 'Tanári magyarázat', icon: '👨‍🏫' },
            { value: 'worked_examples', label: 'Kidolgozott példa', icon: '📝' },
            { value: 'practice', label: 'Sok gyakorlás', icon: '🔄' },
            { value: 'pair_work', label: 'Páros munka', icon: '👥' },
            { value: 'group_work', label: 'Csoportmunka', icon: '🤝' },
            { value: 'playful_tasks', label: 'Játékos feladatok / versenyek', icon: '🎮' },
            { value: 'kahoot_digital', label: 'Kahoot vagy más digitális feladat', icon: '📱' },
            { value: 'diakzona', label: 'DiákZóna', icon: '💻' },
            { value: 'peer_help', label: 'Osztálytársi segítség', icon: '💬' }
          ]
        },
        {
          id: 'q7_hardest_thing',
          number: 7,
          question: 'Mi nehezíti leginkább a tanulást a matematikaórán?',
          type: 'text',
          placeholder: 'Írd le bátran a saját szavaiddal (pl. túl gyors tempó, zaj, bonyolult képletek)...'
        }
      ]
    },
    {
      id: 'section_3_diakzona',
      number: 3,
      title: 'DiákZóna – a matematikatanuló weboldal',
      subtitle: 'Tapasztalataid a digitális felülettel kapcsolatban',
      icon: '💻',
      badgeColor: 'from-purple-500 to-pink-600',
      questions: [
        {
          id: 'q8_diakzona_frequency',
          number: 8,
          question: 'Használtad már a DiákZóna weboldalt?',
          type: 'single_choice',
          options: [
            { value: 'regularly', label: 'Rendszeresen', icon: '🔥', score: 4 },
            { value: 'sometimes', label: 'Néha', icon: '🕒', score: 3 },
            { value: 'once_twice', label: 'Egyszer-kétszer', icon: '👀', score: 2 },
            { value: 'not_yet', label: 'Még nem', icon: '❌', score: 1 }
          ],
          required: true
        },
        {
          id: 'q9_diakzona_helpfulness',
          number: 9,
          question: 'Ha használtad, mennyire segített a tanulásban vagy gyakorlásban?',
          type: 'single_choice',
          options: [
            { value: 'a_lot', label: 'Nagyon sokat', icon: '⭐', score: 4 },
            { value: 'some', label: 'Valamennyit', icon: '👍', score: 3 },
            { value: 'barely', label: 'Alig', icon: '🤏', score: 2 },
            { value: 'not_at_all', label: 'Egyáltalán nem', icon: '👎', score: 1 },
            { value: 'not_used', label: 'Még nem használtam', icon: '➖', score: 0 }
          ]
        },
        {
          id: 'q10_diakzona_usability',
          number: 10,
          question: 'Mennyire könnyű megtalálni rajta a tananyagot és a kvízeket?',
          type: 'single_choice',
          options: [
            { value: 'very_easy', label: 'Nagyon könnyű', icon: '🟢', score: 4 },
            { value: 'rather_easy', label: 'Inkább könnyű', icon: '🟡', score: 3 },
            { value: 'sometimes_hard', label: 'Néha nehéz', icon: '🟠', score: 2 },
            { value: 'hard', label: 'Nehéz', icon: '🔴', score: 1 },
            { value: 'not_used', label: 'Még nem használtam', icon: '➖', score: 0 }
          ]
        },
        {
          id: 'q11_diakzona_feedback',
          number: 11,
          question: 'Mi tetszik a legjobban a DiákZónában, és min változtatnál?',
          type: 'split_text',
          subLabels: {
            first: 'Tetszik:',
            second: 'Változtatnék rajta:'
          }
        }
      ]
    },
    {
      id: 'section_4_teacher_feedback',
      number: 4,
      title: 'Visszajelzés a tanár munkájáról',
      subtitle: 'Erősségek, javaslatok és órai igények',
      icon: '🎯',
      badgeColor: 'from-amber-500 to-orange-600',
      questions: [
        {
          id: 'q12_teacher_strengths',
          number: 12,
          question: 'Mi az, amit a tanár jól csinál, és szeretnéd, ha ezután is így lenne?',
          type: 'text',
          placeholder: 'Pl. érthető magyarázatok, türelem, jó humor, érdekes példák...'
        },
        {
          id: 'q13_teacher_changes',
          number: 13,
          question: 'Min változtasson a tanár, hogy könnyebben vagy szívesebben tanulj?',
          type: 'text',
          placeholder: 'Pl. lassabb haladás, több közös gyakorlás, több idő a feladatokra...'
        },
        {
          id: 'q14_wishes',
          number: 14,
          question: 'Mit szeretnél gyakrabban az órákon? (Többet is bejelölhetsz)',
          type: 'multi_choice',
          options: [
            { value: 'playful_tasks', label: 'Játékos feladatokat', icon: '🎲' },
            { value: 'pair_group_work', label: 'Páros/csoportmunkát', icon: '👫' },
            { value: 'more_explanation', label: 'Több magyarázatot', icon: '🗣️' },
            { value: 'more_practice', label: 'Több gyakorlást', icon: '✍️' },
            { value: 'choice_difficulty', label: 'Választható nehézségű feladatokat', icon: '🎚️' },
            { value: 'digital_tasks', label: 'Digitális feladatokat', icon: '💻' },
            { value: 'movement_tasks', label: 'Mozgásos feladatot', icon: '🏃' },
            { value: 'math_puzzles', label: 'Matematikai fejtörőket', icon: '🧩' },
            { value: 'more_solo_work', label: 'Több önálló munkát', icon: '🧑‍💻' }
          ],
          hasOtherOption: true
        }
      ]
    },
    {
      id: 'section_5_ideas',
      number: 5,
      title: 'Ötletek és záró gondolatok',
      subtitle: 'A te kreatív javaslataid',
      icon: '💡',
      badgeColor: 'from-rose-500 to-red-600',
      questions: [
        {
          id: 'q15_one_magic_thing',
          number: 15,
          question: 'Mi az az egy dolog, amitől jobb lenne a matematikaóra?',
          type: 'text',
          placeholder: 'Ha egyetlen dolgon változtathatnál a matekórákon, mi lenne az?'
        },
        {
          id: 'q16_additional_thoughts',
          number: 16,
          question: 'Van még valami, amit szeretnél elmondani?',
          type: 'text',
          placeholder: 'Bármilyen további gondolat, üzenet a tanárnak...'
        }
      ]
    }
  ]
};
