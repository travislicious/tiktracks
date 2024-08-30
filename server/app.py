import io
import time, os
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import requests
import bs4
import renderer
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
CORS(app)

def delete_file(filename, delay):
    """
    Deletes the specified file after the given delay.
    """
    time.sleep(delay)
    file_path = os.path.join('temp/', filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f'{filename} deleted.')


def extract_from_embed(url):
    renderer.init()
    embed_url = f'https://www.tiktok.com/oembed?url={url}'
    data = requests.get(embed_url, timeout=60)
    data = data.json()
    music_url, song_name, music_author = extract_sound(url)
    song_data = {
        'music_url': music_url,
        'author_name': data['author_name'],
        'song_name': song_name,
        'audio_filename': f'{music_author} - {song_name} (Audio).mp3',
        'video_filename': f'{music_author} - {song_name} (Video).mp4',
        'cover_url': data['thumbnail_url'],
        'music_author': music_author
    }

    return song_data

@app.route("/create-video", methods=['POST'])
def create_video():
    data = request.json
    image_url = data['image_url']
    music_url = data['music_url']
    video_path = renderer.create_video(music_url, image_url)


    return jsonify({'path': video_path})

def extract_sound(link):
    url = "https://ttsave.app/download"

    data = {"query": link,"language_id":"1"}

    resp = requests.post(url, json=data, timeout=60)
    html = bs4.BeautifulSoup(resp.content, 'html.parser')
    url_list = [elem["href"] for elem in html.find_all('a')]
    span_list = [elem.string for elem in html.find_all('span')]

    return url_list[4], span_list[4].split('-')[1], span_list[4].split('-')[0]




def extract_from_slideshow(link):
    url = "https://ttsave.app/download"

    data = {"query": link,"language_id":"1"}

    resp = requests.post(url, json=data, timeout=60)
    html = bs4.BeautifulSoup(resp.content, 'html.parser')
    url_list = [elem["href"] for elem in html.find_all('a')]
    span_list = [elem.string for elem in html.find_all('span')]
    h2_list = [elem.string for elem in html.find_all('h2')]
    audio_url = html.find("a", {"type": "audio"}).get("href")

    return url_list[2], audio_url, span_list[4].split('-')[1], span_list[4].split('-')[0], h2_list[0]

def get_from_slideshow(url):
    renderer.init()
    thumb_url, music_url, song_name, music_author, author_name = extract_from_slideshow(url)
    song_data = {
        'music_url': music_url,
        'author_name': author_name,
        'song_name': song_name,
        'audio_filename': f'{music_author} - {song_name} (Audio).mp3',
        'video_filename': f'{music_author} - {song_name} (Video).mp4',
        'cover_url': thumb_url,
        'music_author': music_author
    }

    return song_data


        


@app.route("/", methods=["GET"])
def scrape():
    url = request.args.get("url")
    if url:
        if "https://www.tiktok.com/" in url and "video" in url:
            res = extract_from_embed(url)
            result = res
        elif "https://www.tiktok.com/" in url and "photo" in url:
            res = get_from_slideshow(url)
            result = res
        else:
            result = {"error": "130"}
    else:
        result = {"error": "100"}

    return jsonify(result)

@app.route("/download-song", methods=["GET"])
def download():
    data = request.args
    response = requests.get(data['url'], timeout=60)
    file_stream = io.BytesIO(response.content)
    content_type = response.headers.get('Content-Type', 'application/octet-stream')

    return send_file(file_stream, mimetype=content_type, as_attachment=True, download_name=data['name'])


@app.route("/download-video", methods=["GET"])
def download_video():
    data = request.args

    return send_file(data['path'], mimetype='video/mp4', as_attachment=True, download_name=data['name'])

def delete_old_files():
    """
    Deletes files that were created more than 1 minute ago.
    """
    current_time = time.time()
    for filename in os.listdir("temp/"):
        file_path = os.path.join("temp/", filename)
        if os.path.isfile(file_path):
            # Get the file's creation/modification time
            file_age = current_time - os.path.getmtime(file_path)
            if file_age > 300:  # 60 seconds = 1 minute
                os.remove(file_path)
                print(f'{filename} deleted (older than 1 minute).')

# Set up the scheduler to delete old files periodically
scheduler = BackgroundScheduler()
scheduler.add_job(delete_old_files, 'interval', seconds=10)  # Check every 10 seconds
scheduler.start()


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
