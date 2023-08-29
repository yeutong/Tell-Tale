from gtts import gTTS
from tqdm import tqdm
import os

TEXT_PATH = './words.txt' # input
AUDIO_PATH = './audio' # output

def generate_single_audio(word, audio_path=AUDIO_PATH):
    output_file = f'{audio_path}/{word}.mp3'

    # check if the audio already generated
    if os.path.exists(output_file):
        return
    
    tts = gTTS(word)
    tts.save(output_file)

def generate_audio(text_path=TEXT_PATH, audio_path=AUDIO_PATH):
    with open(text_path, 'r') as f:
        word_list = f.read().splitlines()

    print(f'Generating {len(word_list)} audio files...')
    for word in tqdm(word_list):
        generate_single_audio(word, audio_path)

if __name__ == "__main__":
    generate_audio()
