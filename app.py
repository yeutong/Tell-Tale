import random
import json
import openai
from flask import Flask, render_template, jsonify
import os

# global var
current_words = []
all_words = []

app = Flask(__name__)

# setup
with open('static/data/words.txt', 'r') as f:
    all_words = [line.strip() for line in f]

openai.api_key = os.environ.get('OPENAI_KEY')


# routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_words', methods=['GET'])
def get_words():
    selected_words = random.sample(all_words, 5)
    return jsonify(selected_words)

@app.route('/generate_response/<words>', methods=['GET'])
def generate_response(words):
    prompt = f"""Give the following five words: {words}, provide the meaning of each word and then make a short story based on them. Your response should be formatted in HTML and follow the template below. 

<div style="border: 2px solid #eaeaea; padding: 20px; border-radius: 10px; background-color: #f7f7f7; font-family: Arial, sans-serif; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);">
    <h2 style="margin-bottom: 10px;">Vocabulary:</h2>
    <ul style="list-style-type: disc; margin-left: 20px;">
        <li><strong>[Word 1]:</strong> [Meaning of Word 1]</li>
        <li><strong>[Word 2]:</strong> [Meaning of Word 2]</li>
        <li><strong>[Word 3]:</strong> [Meaning of Word 3]</li>
        <li><strong>[Word 4]:</strong> [Meaning of Word 4]</li>
        <li><strong>[Word 5]:</strong> [Meaning of Word 5]</li>
    </ul>
    
    <h2 style="margin-top: 20px;">Story:</h2>
    <p>Your concise story of maximum 100 words here, incorporating the words from the vocabulary section and make them bold.</p>
</div> """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use gpt-3.5-turbo model
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    response = response.choices[0].message.content
    return jsonify({'response': response})


if __name__ == '__main__':
    app.run(debug=True)
