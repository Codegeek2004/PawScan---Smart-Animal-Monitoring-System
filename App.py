from flask import Flask, render_template, request
import pandas as pd
import os

app = Flask(__name__)

# Path to the Excel file
EXCEL_FILE = 'registration.xlsx'

# Create the Excel file if it doesn't exist
if not os.path.exists(EXCEL_FILE):
    df = pd.DataFrame(columns=["Name", "Email", "Phone"])
    df.to_excel(EXCEL_FILE, index=False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']

    # Read the existing Excel file
    df = pd.read_excel(EXCEL_FILE)

    # Add the new data
    new_data = {"Name": name, "Email": email, "Phone": phone}
    df = df.append(new_data, ignore_index=True)

    # Save back to Excel
    df.to_excel(EXCEL_FILE, index=False)

    return f"Thank you for registering, {name}!"

if __name__ == '__main__':
    app.run(debug=True)
