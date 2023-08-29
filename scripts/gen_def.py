import os
import json
from PyDictionary import PyDictionary
dictionary=PyDictionary()

with open("words.txt") as f:
    words = f.readlines()
words = [word.strip() for word in words]

def_dir = "definitions/"
                                              
# for word in words:
#     file = def_dir + word + ".json"
#     if os.path.exists(file):
#         continue
#     else:
#         with open("error.txt", "a") as f:
#             f.write(word + "\n")
    # if os.path.exists(file):
    #     continue
    # if " " in word:
    #     continue
    # try:
    #     meaning = dictionary.meaning(word)
    # except:
    #     print("Error with word: " + word)
    #     with open("error.txt", "a") as f:
    #         f.write(word + "\n")
    #     continue

    # with open(file, 'w') as f:
    #     json.dump(meaning, f)
