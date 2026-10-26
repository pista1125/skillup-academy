from pypdf import PdfReader

# Extract pages 48 to 56 of Tankönyv I
reader_tk = PdfReader(r"C:\Users\Istvan\Downloads\OH-MAT09TA_I__teljes.pdf")
with open(r"C:\Users\Istvan\PycharmProjects\skillup-academy\scratch\textbook_lesson13.txt", "w", encoding="utf-8") as f:
    for p in range(48, 56):
        if p < len(reader_tk.pages):
            f.write(f"\n\n=== TANKÖNYV PAGE {p+1} ===\n\n")
            f.write(reader_tk.pages[p].extract_text() or "")

print("Tankönyv pages 49-56 extracted.")

# Search Gyakorló / munkafüzet
reader_gy = PdfReader(r"C:\Users\Istvan\Downloads\OH-MAT912GY__teljes.pdf")
print(f"Gyakorló total pages: {len(reader_gy.pages)}")
with open(r"C:\Users\Istvan\PycharmProjects\skillup-academy\scratch\gyakorlo_fractions.txt", "w", encoding="utf-8") as f:
    for idx, page in enumerate(reader_gy.pages[:100]):
        text = page.extract_text() or ""
        if "tört" in text.lower() or "számolás törtekkel" in text.lower():
            f.write(f"\n\n=== GYAKORLÓ PAGE {idx+1} ===\n\n")
            f.write(text)

print("Gyakorló extracted.")
