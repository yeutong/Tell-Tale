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
with open("static/data/words.txt", "r") as f:
    all_words = [line.strip() for line in f]

openai.api_key = os.environ.get("OPENAI_KEY")


# routes
@app.route("/")
def index():
    return render_template("index.html")


# functions wrapped by routes
@app.route("/get_words", methods=["GET"])
def get_words():
    """return: {<word1>: <def1>, ...}"""
    selected_words = random.sample(
        all_words, 5
    )  # list of strings ['word1', 'word2', ...]
    defs = [get_def(word) for word in selected_words]  # list of jsons

    word_and_def = dict(zip(selected_words, defs))  # dict of {word: def}
    return jsonify(word_and_def)


def get_def(word, use_vocabulary=True):
    word = word.replace(" ", "_")

    if not use_vocabulary:
        # get definition of word from static/data/definitions/<word>.json
        with open(f"static/data/definitions/{word}.json", "r") as f:
            data = json.load(f)
        return data

    else:
        # get definition of word from static/data/definitions_vocabulary/<word>.json
        with open(f"static/data/definitions_vocabulary/{word}.json", "r") as f:
            data = json.load(f)
        return data


@app.route("/generate_tale/<words>", methods=["GET"])
def generate_tale(words):
    prompt = f"Given the following five words: {words}, please create a interesting and well-organized short story set in the world of Harry Potter, incorporating the given setting and character using all of the five words. Use simple words other than those five words. Only reply with the story itself, with a maximum of 150 words."
    prompt += "\nPlease highlight the words in bold in your story using the following format: <strong>word</strong>."
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use gpt-3.5-turbo model
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )
    response = response.choices[0].message.content
    return jsonify({"response": response})


if __name__ == "__main__":
    # app.run(debug=True)
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
