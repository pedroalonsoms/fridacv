import sqlite3
conn = sqlite3.connect('FridaCV.db')
cursor = conn.cursor() # con el cursor se hacen consultas

# Tablas del procesamiento de CVs por la IA
#cursor.execute('CREATE TABLE IF NOT EXISTS Candidate (id_candidate INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), password VARCHAR(50), mail VARCHAR(50), cv_route VARCHAR(50), longevity BOOLEAN)')
cursor.execute('CREATE TABLE IF NOT EXISTS Candidate (id_candidate INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), email VARCHAR(50), cv_route VARCHAR(50))')
cursor.execute('CREATE TABLE IF NOT EXISTS URL (id_candidate INTEGER, url VARCHAR(100), source VARCHAR(50), FOREIGN KEY (id_candidate) REFERENCES Candidate(id_candidate))')
cursor.execute('CREATE TABLE IF NOT EXISTS Hardskills (id_candidate INTEGER, hardskill VARCHAR(50), word_repetition INTEGER, FOREIGN KEY (id_candidate) REFERENCES Candidate(id_candidate))')
cursor.execute('CREATE TABLE IF NOT EXISTS Softskills (id_candidate INTEGER, softskill VARCHAR(50), FOREIGN KEY (id_candidate) REFERENCES Candidate(id_candidate))')
cursor.execute('CREATE TABLE IF NOT EXISTS Redflags (id_candidate INTEGER, description VARCHAR(250), FOREIGN KEY (id_candidate) REFERENCES Candidate(id_candidate))')

# Tablas de la informacion del sitio web de job hunting
cursor.execute('CREATE TABLE IF NOT EXISTS Company (id_company INTEGER PRIMARY KEY AUTOINCREMENT, company_name VARCHAR(50), email VARCHAR(50), password VARCHAR(50))')
cursor.execute('CREATE TABLE IF NOT EXISTS CompanyPosition (id_company INTEGER, position_name VARCHAR(50), position_description VARCHAR(500), FOREIGN KEY (id_company) REFERENCES Company(id_company))')
cursor.execute('CREATE TABLE IF NOT EXISTS ConfirmedCandidates (id_company, id_candidate, FOREIGN KEY (id_company) REFERENCES Company(id_company), FOREIGN KEY (id_candidate) REFERENCES Candidate(id_candidate))')

conn.commit() # confirmando cambios en la BD

conn.close()