from flask import Flask
from flask import request
import sqlite3
conn = sqlite3.connect('FridaCV.db')
cursor = conn.cursor() # con el cursor se hacen consultas

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
    cursor.execute('INSERT INTO Company (company_name, email, password) VALUES (?, ?, ?)', (name, email, password))
    conn.commit()
    cursor.execute('SELECT * FROM Company')
    company = cursor.fetchall()
    print(company)


if __name__ == "__main__":
    app.run(debug=False)