import requests
from io import BytesIO
import os
from moviepy.editor import ImageClip, AudioFileClip
from PIL import Image
import random
import string
import time

SAVE_PATH = "temp/"

def init():
    os.makedirs("temp", exist_ok=True)

def generate_random_filename(length=12):
    letters_and_digits = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(letters_and_digits) for i in range(length))
    return random_string

def delete_file(filename, delay):
    """
    Deletes the specified file after the given delay.
    """
    time.sleep(delay)
    file_path = os.path.join('temp/', filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f'{filename} deleted.')

def create_video(audio_url, thumb_url):

    video_name = generate_random_filename()
    audio_name = generate_random_filename()
    image_name = generate_random_filename()
    image = download_image(thumb_url)
    audio_path = download_audio(audio_url, audio_name)

    # Convert the image to a format suitable for MoviePy
    image.save(f'{SAVE_PATH}{image_name}.jpg')

    # Create moviepy clips
    audio_clip = AudioFileClip(audio_path)
    image_clip = ImageClip(f'{SAVE_PATH}{image_name}.jpg').set_duration(audio_clip.duration)  # Duration in seconds

    # Resize image to match the audio duration  # Resize image height to 720p

    # Combine image and audio into a video
    video_clip = image_clip.set_audio(audio_clip)

    # Export video
    video_clip.write_videofile(f'temp/{video_name}.mp4', fps=30)

    delete_old_files()


    return f'temp/{video_name}.mp4'


def clear_all():
    if os.path.exists(SAVE_PATH):
        os.rmdir(SAVE_PATH)

# Function to download an image from a URL
def download_image(url):
    response = requests.get(url, timeout=60)
    image = Image.open(BytesIO(response.content))
    return image

# Function to download an audio file from a URL
def download_audio(url, name):
    response = requests.get(url, timeout=60)
    audio_path = f'{SAVE_PATH}{name}.mp3'
    with open(audio_path, 'wb') as file:
        file.write(response.content)
    return audio_path

def delete_old_files():
    """
    Deletes files that were created more than 3 minutes ago.
    """
    current_time = time.time()
    for filename in os.listdir("temp/"):
        file_path = os.path.join("temp/", filename)
        if os.path.isfile(file_path):
            # Get the file's creation/modification time
            file_age = current_time - os.path.getmtime(file_path)
            if file_age > 180:  # 60 seconds = 1 minute
                os.remove(file_path)
                print(f'{filename} deleted (older than 3 minutes).')

