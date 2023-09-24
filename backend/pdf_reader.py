import io

import requests
from pypdf import PdfReader
import PyPDF2

url = 'http://www.arkansasrazorbacks.com/wp-content/uploads/2017/02/Miami-Ohio-Game-2.pdf'

r = requests.get(url)
# print(r.content)
f = io.BytesIO(r.content)
print(f)

pdf_reader = PyPDF2.PdfReader(f)
reader = PdfReader(f)
print(pdf_reader)

text = ""
for page_num in range(len(pdf_reader.pages)):
    page = pdf_reader.pages[page_num]
    text += page.extract_text()
text = text.replace("\n", "")
text = text.replace("•", "")
text = text.replace("�", "")
text = text.replace("$", "")

print(text)