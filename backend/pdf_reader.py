import io
import requests
from pypdf import PdfReader
import PyPDF2

def get_pdf_text(path):
    pdf_file = open('./uploads/c1c07d58-406a-4832-9fbd-3a31e79aa9ac.pdf', 'rb')
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    text = ""
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()
    text = text.replace("\n", "")
    text = text.replace("•", "")
    text = text.replace("�", "")
    text = text.replace("$", "")

    return text