import os
import uuid
from flask import Flask
from flask import request
import sqlite3

from pdf_reader import get_pdf_text
from frida import get_info_user

app = Flask(__name__)

@app.route("/")
def hello_world():
    get_info_user()
    return "<p>Hello, World!</p>"

@app.route("/api/companies", methods=["POST"])
def create_company():
    json_data = request.json
    name = json_data["name"]
    email = json_data["email"]
    password = json_data["password"]
    
    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Company (company_name, email, password) VALUES (?, ?, ?)', (name, email, password))
    connection.commit()

    cursor.execute('SELECT * FROM Company')
    company = cursor.fetchall()
    connection.close()
    return company

@app.route("/users/", methods=["GET"])
def get_all_user():
    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM Candidate')
    candidates = cursor.fetchall()
    connection.close()
    return candidates

@app.route("/api/users", methods=["POST"])
def create_user():
    resume_file = request.files["resume_file"]
    hashed_filename = str(uuid.uuid4()) + ".pdf"
    resume_file.save(os.path.join("./uploads", hashed_filename))
    print(hashed_filename)
    print(resume_file.filename)
    complete_path = "./uploads/" + hashed_filename
    file_string = get_pdf_text(complete_path)
    # print(file_string)
    get_info_user(file_string)
    
    return ""

# @app.route("/upload_user", methods=["POST"])
# def create_user():
#     json_data = request.json
#     name = json_data["name"]
#     email = json_data["email"]
#     cv_route = json_data["cv_route"]

#     connection = sqlite3.connect('FridaCV.db')
#     cursor = connection.cursor()
#     cursor.execute('INSERT INTO Candidate (name, email, cv_route) VALUES (?, ?, ?)', (name, email, cv_route))
#     connection.commit()

#     cursor.execute('SELECT * FROM Candidate WHERE name = ?', (name))
#     candidates = cursor.fetchall()
#     connection.close()
#     return candidates


if __name__ == "__main__":
    app.run(debug=False, port=4000)
