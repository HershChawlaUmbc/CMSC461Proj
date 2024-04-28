import sqlite3

# Connect to SQLite database (or create if it doesn't exist)
conn = sqlite3.connect('nfl_salary_cap.db')

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Create Teams table
cursor.execute('''CREATE TABLE IF NOT EXISTS Teams (
                    TeamID INTEGER PRIMARY KEY,
                    TeamName TEXT,
                    TeamLocation TEXT,
                    TeamOwner TEXT,
                    Logo TEXT
                )''')

# Create Players table
cursor.execute('''CREATE TABLE IF NOT EXISTS Players (
                    PlayerID INTEGER PRIMARY KEY,
                    Name TEXT,
                    Position TEXT,
                    TeamID INTEGER,
                    FOREIGN KEY(TeamID) REFERENCES Teams(TeamID)
                )''')

# Create Contracts table
cursor.execute('''CREATE TABLE IF NOT EXISTS Contracts (
                    ContractID INTEGER PRIMARY KEY,
                    PlayerID INTEGER,
                    Salary REAL,
                    FOREIGN KEY(PlayerID) REFERENCES Players(PlayerID)
                )''')

# Create SalaryCap table
cursor.execute('''CREATE TABLE IF NOT EXISTS SalaryCap (
                    SeasonID INTEGER PRIMARY KEY,
                    SeasonYear INTEGER,
                    SalaryCapLimit REAL
                )''')

# Create Transactions table
cursor.execute('''CREATE TABLE IF NOT EXISTS Transactions (
                    TransactionID INTEGER PRIMARY KEY,
                    PlayerID INTEGER,
                    TransactionType TEXT,
                    TransactionDate DATE,
                    FOREIGN KEY(PlayerID) REFERENCES Players(PlayerID)
                )''')

# Commit changes and close the connection
conn.commit()
conn.close()

print("Database schema created successfully!")
