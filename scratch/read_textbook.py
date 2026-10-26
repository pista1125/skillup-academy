import sys
from pypdf import PdfReader

def search_pdf(pdf_path, query, max_pages=300):
    reader = PdfReader(pdf_path)
    print(f"Total pages: {len(reader.pages)}")
    found = []
    for idx, page in enumerate(reader.pages[:max_pages]):
        text = page.extract_text() or ""
        if query.lower() in text.lower():
            found.append((idx + 1, text))
            print(f"Found '{query}' on page {idx + 1}")
    return found

print("Searching Tankönyv I...")
tk_pages = search_pdf(r"C:\Users\Istvan\Downloads\OH-MAT09TA_I__teljes.pdf", "Számolás törtekkel", 150)

print("\n--- FIRST MATCH TEXT ---")
if tk_pages:
    print(f"Page {tk_pages[0][0]}:")
    print(tk_pages[0][1][:1500])

