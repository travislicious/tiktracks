import requests
from io import BytesIO
import os
from moviepy.editor import ImageClip, AudioFileClip
from PIL import Image

SAVE_PATH = "temp/"
CURRENT_FILE = {
    "filename": "",
    "filepath": ""
}

def init():
    clear_all()
    os.makedirs("temp", exist_ok=True)

def create_video_from_thumb(audio_url, thumb_url):

    image = download_image(thumb_url)
    audio_path = download_audio(audio_url)

    # Convert the image to a format suitable for MoviePy
    image.save(f'{SAVE_PATH}temp_image.jpg')

    # Create moviepy clips
    audio_clip = AudioFileClip(audio_path)
    image_clip = ImageClip(f'{SAVE_PATH}temp_image.jpg').set_duration(audio_clip.duration)  # Duration in seconds

    # Resize image to match the audio duration  # Resize image height to 720p

    # Combine image and audio into a video
    video_clip = image_clip.set_audio(audio_clip)

    # Export video
    video_clip.write_videofile(f'{SAVE_PATH}{image.filename}', fps=30)
    get_file_data(image.filename, f'{SAVE_PATH}{image.filename}')


def create_video_from_cover(audio_url, thumb_url):
    pass

def clear_all():
    if os.path.exists(SAVE_PATH):
        os.rmdir(SAVE_PATH)

def get_file_data(filename, filepath):
    CURRENT_FILE["filename"] = filename
    CURRENT_FILE["filepath"] = filepath



# Function to download an image from a URL
def download_image(url):
    response = requests.get(url, timeout=60)
    image = Image.open(BytesIO(response.content))
    return image

# Function to download an audio file from a URL
def download_audio(url):
    response = requests.get(url, timeout=60)
    audio_path = f'{SAVE_PATH}temp_audio.mp3'
    with open(audio_path, 'wb') as file:
        file.write(response.content)
    return audio_path

