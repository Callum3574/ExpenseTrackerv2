import psycopg2
import psycopg2.extras  # We'll need this to convert SQL responses into dictionaries
from flask import Flask, current_app, jsonify
from flask import request
from flask import Flask, redirect, url_for, render_template, request, flash
import json

def get_db_connection():
  try:
    conn = psycopg2.connect("dbname=expense_tracker user=callumhall host=localhost")
    return conn
  except:
    print("Error connecting to database.")

conn = get_db_connection()


app = Flask(__name__)


@app.route("/", methods = ["GET"])
def index():
    return current_app.send_static_file("index.html")

@app.route('/tracker', methods=['GET'])
def get_records_from_db():
    if conn!= None:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM money;")
            data = cursor.fetchall()
            return jsonify(data)
        except:
            return "Error 404, NOT FOUND", 404
    else:
        return "Error connecting to Database", 500

@app.route('/', methods=["POST"])
def input_from_user():
    new_input_from_user = request.json
    if conn != None:
        try:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO money (location, amount, date) VALUES (%s, %s, %s)", ((new_input_from_user['location']), (new_input_from_user['amount']),(new_input_from_user['date'])))
            conn.commit()
            cursor.close()
        except:
            return "Unable to post this request, ERROR", 400
    
    else:
        "No connection to the database", 500

    return ''

   
@app.route('/delete/<id>', methods = ['GET'])
def delete_record(id):
    print(id)
    if conn != None:
        try:
            cursor = conn.cursor()
            cursor.execute(f"DELETE FROM money WHERE id = {id}")
            conn.commit()
        except:
            return 404
    else:
        return 404
    return ' '