# skk-karaoke
## Requirements
- [nodejs + npm](https://nodejs.org/en/)
- [python + pip](https://www.python.org/)
- [ffmpeg](https://ffmpeg.org/download.html)
- [mongodb](https://www.mongodb.com/)

## Install
- Clone repository
- In the folder app : 
 - `npm i`
 - `npm start`
- In the folder api : 
 - `export FLASK_APP=app.py` or `set $env:FLASK_APP=app.py`
 - `pip install`
 - `flask run`

## Notes
- You can modify API config via the environments variables :
 - `DB_HOST` : Default => `localhost`
 - `DB_PORT` : Default => `27017`
 - `DB_USER` : Default => `admin`
 - `DB_PASS` : Default => `admin`
 - `DB_NAME` : Default => `skk`
 - `DB_POOL` : Default => `20`
 - `API_SECRET` : Default => `awVYjjzt7ssPDRxwmrIY`
- You can put the `.mp4` files in `/aud` folder, the files need to have in metadata : `title`, `artist`
- It's better if your `.mp4` files have substitles
- Default port are `front : 80` and `api : 5000`
- To better experience provide minimum 12 videos
