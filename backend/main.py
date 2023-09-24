import os
import uuid
from flask import Flask
from flask import request
import sqlite3

from frida_test import get_info_user

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
    cursor.execute('INSERT INTO Company (company_name, email, password) VALUES (?, ?, ?);', (name, email, password))
    connection.commit()

    cursor.execute('SELECT * FROM Company')
    company = cursor.fetchall()
    connection.close()
    return company

@app.route("/api/jobs", methods=["POST"])
def create_job():
    json_data = request.json
    id_company = json_data["id_company"]
    position_name = json_data["position_name"]
    position_description = json_data["position_description"]

    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO CompanyPosition (id_company, position_name, position_description) VALUES (?, ?, ?);', (id_company, position_name, position_description))
    connection.commit()

    cursor.execute('SELECT * FROM CompanyPosition')
    company_positions = cursor.fetchall()
    connection.close()
    return company_positions

@app.route("/api/jobs", methods=["PUT"])
def update_job():
    json_data = request.json
    # id_company, position_name, position_description
    id_company = json_data["id_company"]
    position_name = json_data["position_name"]
    position_description = json_data["position_description"]

    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('UPDATE CompanyPosition SET position_name=?, position_description=? WHERE id_company=?;', (position_name, position_description, id_company))
    connection.commit()

    cursor.execute('SELECT * FROM CompanyPosition WHERE id_company=?', (id_company))
    updated_position = cursor.fetchall()
    connection.close()
    return updated_position

@app.route("/api/jobs", methods=["DELETE"])
def delete_job():
    json_data = request.json
    id_company = json_data["id_company"]

    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM CompanyPosition WHERE id_company=?;', (id_company))
    connection.commit()

@app.route("/users/", methods=["get"])
def get_all_user():
    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM Candidate')
    candidates = cursor.fetchall()
    connection.close()
    return candidates

@app.route("/api/users", methods=["POST"])
def create_user():
    email = request.form["email"]
    resume_file = request.files["resume"]
    hashed_filename = str(uuid.uuid4()) + ".pdf"
    resume_file.save(os.path.join("./uploads", hashed_filename))
    print(email)
    print(resume_file.filename)
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
