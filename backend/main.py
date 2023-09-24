from flask import Flask
from flask import request
import sqlite3

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/insert_company", methods=["POST"])
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


@app.route("/upload_user", methods=["POST"])
def create_user():
    json_data = request.json
    name = json_data[name]
    email = json_data[email]
    cv_route = json_data[cv_route]
    cursor.execute('INSERT INTO Candidate (name, email, cv_route) VALUES (?, ?, ?)', (name, email, cv_route))
    conn.commit()


if __name__ == "__main__":
    app.run(debug=False)