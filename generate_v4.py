import json
import os
import random

MAP_HTML = """
  <rect x="70" y="160" width="660" height="400" fill="white" stroke="#a1a1aa" stroke-width="2" />
  
  <path d="M 70 420 L 210 470 L 310 470 L 430 380 L 490 330 L 580 260" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />
  <path d="M 580 260 L 630 220 L 730 210" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />
  <path d="M 580 260 L 650 265 L 730 255" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />
  <path d="M 590 480 L 630 510 L 730 540" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />
  <path d="M 480 490 L 590 480" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />

  <path d="M 210 470 L 210 500 L 240 560" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 210 470 L 180 490 L 140 560" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 310 470 L 320 560" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 310 470 L 270 280 L 170 160" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 430 380 L 420 300 L 460 160" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 430 380 L 480 490" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 480 490 L 470 530 L 510 560" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 590 480 L 590 400 L 550 350 L 580 260" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 590 480 L 650 350 L 730 420" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />

  <circle cx="210" cy="470" r="10" fill="#94a3b8" />
  <text x="210" y="450" font-family="Arial" font-size="20" font-weight="bold" fill="#64748b" text-anchor="middle">Erdőhát</text>

  <circle cx="310" cy="470" r="8" fill="#94a3b8" />
  <text x="310" y="450" font-family="Arial" font-size="16" fill="#64748b" text-anchor="middle">Majorpuszta</text>

  <circle cx="430" cy="380" r="8" fill="#94a3b8" />
  <text x="450" y="370" font-family="Arial" font-size="16" fill="#64748b" text-anchor="start">Zöldhát</text>

  <circle cx="580" cy="260" r="12" fill="#94a3b8" />
  <text x="540" y="245" font-family="Arial" font-size="22" font-weight="bold" fill="#64748b" text-anchor="middle">Zedújfalú</text>

  <circle cx="480" cy="490" r="8" fill="#94a3b8" />
  <text x="480" y="515" font-family="Arial" font-size="16" fill="#64748b" text-anchor="middle">Halászfalva</text>

  <circle cx="590" cy="480" r="8" fill="#94a3b8" />
  <text x="590" y="505" font-family="Arial" font-size="16" fill="#64748b" text-anchor="middle">Vártornya</text>
"""

def get_sign_xml(signs):
    text_elements = ""
    start_y = 75 if len(signs) == 1 else (55 if len(signs) == 2 else 35)
    
    for idx, sign in enumerate(signs):
        text_y = start_y + idx * 40
        if sign['dir'] == 'left':
            text_elements += f'<path d="M 210 {text_y - 5} L 180 {text_y - 5} L 180 {text_y - 15} L 150 {text_y + 5} L 180 {text_y + 25} L 180 {text_y + 15} L 210 {text_y + 15} Z" fill="white" />'
            text_elements += f'<text x="230" y="{text_y + 15}" fill="white" font-family="Arial" font-size="28" font-weight="bold" text-anchor="start">{sign["text"]}</text>'
        elif sign['dir'] == 'right':
            text_elements += f'<text x="410" y="{text_y + 15}" fill="white" font-family="Arial" font-size="28" font-weight="bold" text-anchor="end">{sign["text"]}</text>'
            text_elements += f'<path d="M 430 {text_y - 5} L 460 {text_y - 5} L 460 {text_y - 15} L 490 {text_y + 5} L 460 {text_y + 25} L 460 {text_y + 15} L 430 {text_y + 15} Z" fill="white" />'
        elif sign['dir'] == 'straight':
            text_elements += f'<path d="M 310 {text_y + 15} L 310 {text_y - 5} L 300 {text_y - 5} L 320 {text_y - 25} L 340 {text_y - 5} L 330 {text_y - 5} L 330 {text_y + 15} Z" fill="white" />'
            text_elements += f'<text x="360" y="{text_y + 15}" fill="white" font-family="Arial" font-size="28" font-weight="bold" text-anchor="start">{sign["text"]}</text>'
            
    return f"""
  <g transform="translate(80, 20)">
    <rect width="640" height="130" rx="10" fill="#71717a" stroke="white" stroke-width="4" />
    <rect width="630" height="120" x="5" y="5" rx="6" fill="#71717a" stroke="white" stroke-width="2" />
    {text_elements}
  </g>
"""

def get_arrow_xml(id_val, x, y, rot):
    return f"""
  <g transform="translate({x}, {y}) rotate({rot})">
    <rect x="-15" y="-10" width="30" height="20" fill="black" />
    <path d="M 15 -14 L 30 0 L 15 14 Z" fill="black" />
    <text x="0" y="45" font-family="Arial" font-size="28" font-weight="bold" fill="black" transform="rotate({-rot})">{id_val}</text>
  </g>
"""

base_tasks = [
  { "signs": [{ "text": 'Zedújfalú', "dir": 'left' }, { "text": 'Majorpuszta', "dir": 'right' }], "pos": [{ "x": 315, "y": 520, "rot": -90 }, { "x": 425, "y": 280, "rot": 100, "isCorrect": True }, { "x": 520, "y": 485, "rot": 180 }, { "x": 380, "y": 417, "rot": -36 }] },
  { "signs": [{ "text": 'Halászfalva', "dir": 'straight' }, { "text": 'Vártornya', "dir": 'left' }], "pos": [{ "x": 610, "y": 230, "rot": -20 }, { "x": 260, "y": 470, "rot": 0 }, { "x": 540, "y": 485, "rot": 180 }, { "x": 450, "y": 425, "rot": 65, "isCorrect": True }] },
  { "signs": [{ "text": 'Erdőhát', "dir": 'left' }, { "text": 'Zöldhát', "dir": 'right' }], "pos": [{ "x": 380, "y": 417, "rot": 144 }, { "x": 260, "y": 470, "rot": 0 }, { "x": 315, "y": 510, "rot": -90, "isCorrect": True }, { "x": 400, "y": 340, "rot": 60 }] },
  { "signs": [{ "text": 'Zedújfalú', "dir": 'left' }, { "text": 'Majorpuszta', "dir": 'right' }, { "text": 'Halászfalva', "dir": 'straight'}], "pos": [{ "x": 425, "y": 310, "rot": 90, "isCorrect": True }, { "x": 530, "y": 295, "rot": 145 }, { "x": 380, "y": 417, "rot": -36 }, { "x": 450, "y": 440, "rot": -115 }] },
  { "signs": [{ "text": 'Vártornya', "dir": 'straight' }, { "text": 'Zedújfalú', "dir": 'left' }], "pos": [{ "x": 450, "y": 425, "rot": 65 }, { "x": 530, "y": 485, "rot": -5, "isCorrect": True }, { "x": 615, "y": 515, "rot": -130 }, { "x": 565, "y": 375, "rot": 90 }] },
  { "signs": [{ "text": 'Vártornya', "dir": 'right' }, { "text": 'Zöldhát', "dir": 'left' }], "pos": [{ "x": 580, "y": 400, "rot": 90 }, { "x": 450, "y": 425, "rot": 65 }, { "x": 540, "y": 485, "rot": 180 }, { "x": 485, "y": 530, "rot": -90, "isCorrect": True }] },
  { "signs": [{ "text": 'Zedújfalú', "dir": 'straight' }, { "text": 'Halászfalva', "dir": 'right' }], "pos": [{ "x": 425, "y": 310, "rot": 90 }, { "x": 380, "y": 417, "rot": -36, "isCorrect": True }, { "x": 315, "y": 510, "rot": -90 }, { "x": 450, "y": 440, "rot": -115 }] },
  { "signs": [{ "text": 'Majorpuszta', "dir": 'straight' }, { "text": 'Halászfalva', "dir": 'left' }], "pos": [{ "x": 380, "y": 417, "rot": -36 }, { "x": 530, "y": 485, "rot": -5 }, { "x": 510, "y": 310, "rot": 145, "isCorrect": True }, { "x": 425, "y": 280, "rot": 100 }] },
  { "signs": [{ "text": 'Erdőhát', "dir": 'straight' }], "pos": [{ "x": 380, "y": 417, "rot": 144, "isCorrect": True }, { "x": 260, "y": 470, "rot": 0 }, { "x": 450, "y": 425, "rot": 65 }, { "x": 315, "y": 510, "rot": -90 }] },
  { "signs": [{ "text": 'Zedújfalú', "dir": 'right' }, { "text": 'Halászfalva', "dir": 'left' }], "pos": [{ "x": 510, "y": 310, "rot": 145 }, { "x": 530, "y": 485, "rot": -5 }, { "x": 565, "y": 375, "rot": 90 }, { "x": 615, "y": 515, "rot": -130, "isCorrect": True }] }
]

target_dir = os.path.join(os.getcwd(), 'public', 'assets', 'competency', 'probameres-10')
os.makedirs(target_dir, exist_ok=True)

competency_tasks_data = []

letters = ['A', 'B', 'C', 'D']

for idx, task in enumerate(base_tasks):
    arrows_xml = ""
    correct_index = 0
    
    for i, p in enumerate(task['pos']):
        arrows_xml += get_arrow_xml(letters[i], p['x'], p['y'], p['rot']) + "\n"
        if p.get('isCorrect'):
            correct_index = i
            
    svg_content = f'''<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
{get_sign_xml(task['signs'])}
{MAP_HTML}
{arrows_xml}
</svg>'''

    with open(os.path.join(target_dir, f'probameres_10_orient_{idx + 1}.svg'), 'w', encoding='utf-8') as f:
        f.write(svg_content)
        
    competency_tasks_data.append({
        "id": f"p10-{idx + 1}",
        "type": "multiple-choice",
        "context": "Melyik betűvel jelzett nyíl mutatja a térképen, hogy hol vannak épp Csanádék, ha a nyilak az autók haladási irányát mutatják?",
        "question": "Jelöld meg a helyes válasz betűjelét!",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": correct_index,
        "points": 1,
        "image": f"/assets/competency/probameres-10/probameres_10_orient_{idx + 1}.svg"
    })

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(competency_tasks_data, f, indent=2, ensure_ascii=False)

print("Generated safely with Python!")
