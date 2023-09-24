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
    cursor.execute('SELECT * FROM Candidate ORDER BY ranking_points DESC')
    candidates = cursor.fetchall()
    connection.close()
    return candidates

@app.route("/api/users", methods=["POST"])
def create_user():
    resume_file = request.files["resume_file"]
    hashed_filename = str(uuid.uuid4()) + ".pdf"
    resume_file.save(os.path.join("./uploads", hashed_filename))
    complete_path = "./uploads/" + hashed_filename
    file_string = get_pdf_text(complete_path)
    parsed_file = get_info_user(file_string) # [personal_info_arr, soft_skills_arr, technical_skills_arr, number_time_periods_arr]
    name = parsed_file[0][0]
    email = parsed_file[0][3]
    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Candidate (name, email, cv_route, ranking_points) VALUES (?, ?, ?, ?)', (name, email, complete_path, 0))
    connection.commit()
    query = "select id_candidate from Candidate where cv_route = '" + complete_path + "'"
    cursor.execute(query)
    user_id = cursor.fetchall()[0][0]

    for i in range(4,len(parsed_file[0])):
        print(parsed_file[0][i])
        cursor.execute('INSERT INTO URL (id_candidate, url) VALUES (?, ?)', (user_id, parsed_file[0][i]))
        connection.commit()

    new_ranking_points = 0
    for i in range(len(parsed_file[1])):
        print(parsed_file[1][i])
        cursor.execute('INSERT INTO Softskills (id_candidate, softskill) VALUES (?, ?)', (user_id, parsed_file[1][i]))
        connection.commit()
        new_ranking_points += 1

    for i in range(len(parsed_file[2])):
        print(parsed_file[2][i])
        cursor.execute('INSERT INTO Hardskills (id_candidate, hardskill) VALUES (?, ?)', (user_id, parsed_file[2][i]))
        connection.commit()
        new_ranking_points += 1

    longevity = False
    for i in range(len(parsed_file[3])):
        if parsed_file[3][i] >= 23:
            longevity = True
            new_ranking_points += 5

    if longevity:
        desc = "The user tends to stay more than 2 years"
        cursor.execute('INSERT INTO Redflags (id_candidate, description) VALUES (?, ?)', (user_id, desc))
        connection.commit()
    else:
        desc = "The user tends to stay less than 2 years"
        cursor.execute('INSERT INTO Redflags (id_candidate, description) VALUES (?, ?)', (user_id, desc))
        connection.commit()

    query = "UPDATE Candidate SET ranking_points = " + str(new_ranking_points) + " WHERE id_candidate = " + str(user_id)
    cursor.execute(query)
    connection.commit()

    connection.close()
    
    return ""


@app.route("/urls/", methods=["get"])
def get_all_urls():
    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM URL')
    candidates = cursor.fetchall()
    connection.close()
    return candidates


@app.route("/soft_skills/", methods=["get"])
def get_all_soft_skills():
    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM Softskills')
    candidates = cursor.fetchall()
    connection.close()
    return candidates

@app.route("/hard_skills/", methods=["get"])
def get_all_hard_skills():
    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM Hardskills')
    candidates = cursor.fetchall()
    connection.close()
    return candidates

@app.route("/red_flags/", methods=["get"])
def get_all_red_flags():
    connection = sqlite3.connect('FridaCV.db')
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM Redflags')
    candidates = cursor.fetchall()
    connection.close()
    return candidates

if __name__ == "__main__":
    app.run(debug=False, port=4000)
