#%%
import requests
from bs4 import BeautifulSoup
import os
from tqdm import tqdm
import json

#%%
def get_desc(word):
    """
    Scrap definition of word from vocabulary.com
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    }
    r  = requests.get('https://www.vocabulary.com/dictionary/' + word, headers=headers)

    # check status 200
    if r.status_code != 200:
        raise Exception(f'Error: {r.status_code}')
    
    soup = BeautifulSoup(r.content, features="lxml")
    
    short_desc = soup.select_one('.short').text
    long_desc = soup.select_one('.long').text
    return {'short': short_desc, 'long': long_desc}
    

#%%
def get_all_desc(word_list_file, output_path):
    with open(word_list_file, 'r') as f:
        word_list = [line.strip() for line in f]
        print(f"Processing {len(word_list)} words...")

    for word in tqdm(word_list):
        try:
            desc = get_desc(word)
        except:
            print(f'Error: {word}')
            continue
        
        output_file = os.path.join(output_path, word + '.json')
        # check if file already exists
        if os.path.exists(output_file):
            continue

        # write to file
        with open(output_file, 'a') as f:
            json.dump(desc, f)

if __name__ == '__main__':
    # set directory
    word_list_file = 'static/data/words.txt'
    output_path = 'static/data/definitions_vocabulary'
    get_all_desc(word_list_file, output_path)
