from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
import re

app = Flask(__name__)
CORS(app)

@app.route('/api/search', methods=['POST'])
def search_keywords():
    file = request.files.get('file')
    keywords = request.form.get('keywords')
    
    if not file or not keywords:
        return jsonify({"error": "File and keywords required"}), 400

    keywords = [k.strip().lower() for k in keywords.split(',')]
    text_by_page = {}

    # Read PDF content
    with fitz.open(stream=file.read(), filetype="pdf") as doc:
        for page_num, page in enumerate(doc, start=1):
            text = page.get_text()
            for kw in keywords:
                if kw.lower() in text.lower():
                    if page_num not in text_by_page:
                        text_by_page[page_num] = {"text": text, "matches": []}
                    text_by_page[page_num]["matches"].append(kw)

    results = []
    for page_num, data in text_by_page.items():
        text = data["text"]
        matches = data["matches"]

        # Extract details
        judge_name = re.findall(r"Before\s+Hon'?ble\s+(.+?)(?:,|\n)", text, re.IGNORECASE)
        vc_link = re.findall(r"https?://[^\s]+", text)
        court_number = re.findall(r"Court\s+No\.\s*:?(\d+)", text, re.IGNORECASE)
        serial_number = re.findall(r"Item\s*No\.\s*(\d+)", text, re.IGNORECASE)
        case_titles = re.findall(r"(.+?\bV/?S\.?\b.+?)(?:\n|$)", text, re.IGNORECASE)

        results.append({
            "page": page_num,
            "keywords": matches,
            "judge": judge_name[0].strip() if judge_name else "Not Found",
            "vc_link": vc_link[0] if vc_link else "Not Found",
            "court_number": court_number[0] if court_number else "Not Found",
            "serial_number": serial_number[0] if serial_number else "Not Found",
            "case_title": case_titles[0].strip() if case_titles else "Not Found",
        })

    return jsonify({"results": results})

if __name__ == '__main__':
    app.run(debug=True)
