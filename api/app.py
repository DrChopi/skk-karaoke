from flask import Flask, request, abort, send_file
from flask_cors import CORS
from modules import Mongo, Validator, Jwt, Img

import pprint, json, re, subprocess, os

os.environ['DB_USER'] = ( os.getenv('DB_USER'), '' ) [ os.getenv('DB_USER') == None ]
os.environ['DB_PASS'] = ( os.getenv('DB_PASS'), '' ) [ os.getenv('DB_PASS') == None ]
os.environ['DB_HOST'] = ( os.getenv('DB_HOST'), 'localhost' ) [ os.getenv('DB_HOST') == None ]
os.environ['DB_PORT'] = ( os.getenv('DB_PORT'), '27017' ) [ os.getenv('DB_PORT') == None ]
os.environ['DB_NAME'] = ( os.getenv('DB_NAME'), 'skk' ) [ os.getenv('DB_NAME') == None ]
os.environ['DB_POOL'] = ( os.getenv('DB_POOL'), '20' ) [ os.getenv('DB_POOL') == None ]
os.environ['API_SECRET'] = ( os.getenv('API_SECRET'), "awVYjjzt7ssPDRxwmrIY" ) [ os.getenv('API_SECRET') == None ]

mng = Mongo('mongodb://' + ( os.getenv('DB_USER') + ':' + os.getenv('DB_PASS') + '@', '') [ os.getenv('DB_USER') == '' and os.getenv('DB_PASS') == '' ] + os.getenv('DB_HOST') + ':' + os.getenv('DB_PORT'), os.getenv('DB_NAME'), int(os.getenv('DB_POOL')))
Img.prepare(mng)
app = Flask(__name__)
CORS(app)
secret = os.getenv('API_SECRET')

data_model = {
    "user" : {
        "pseudo" : "string",
        "mail" : "mail",
        "password" : "string"
    },
    "room" : {
        "users" : "array:string",
        "banned" : "array:string",
        "song" : {
            "id" : "string",
            "started" : "integer"
        }
    },
    "song" : {
        "name" : "text",
        "author" : "text",
        "duration" : "integer",
        "speed" : "integer",
        "difficulty" : "integer"
    }
}

@app.route('/')
def hello_world():
    pprint.pprint(mng.find_one("users", {}))
    return 'Hello, World!'

@app.route('/login', methods=[ "POST", "HEAD" ])
def login():
    if request.method == 'POST' :
        data = json.loads(request.get_data())
        pprint.pprint({ 'mail' : data['mail'], 'password' : Jwt.sha256(data['password']) })
        if request.cookies.get('usr_jwt_session') or Validator.string(data['password']) == None or Validator.mail(data['mail']) == None :
            abort(401)
        user = mng.find_one('users', { 'mail' : data['mail'], 'password' : Jwt.sha256(data['password']) })
        return Jwt.generate({ "pseudo" : user["pseudo"], "mail" : user["mail"], "icon" : user["icon"], "rank" : user['rank'] }, user['secret'])
    return 'ok'

@app.route('/subscribe', methods=[ "POST" ])
def subscribe():
    data = json.loads(request.get_data())
    if request.cookies.get('usr_jwt_session') or Validator.string(data['pseudo']) == None or Validator.string(data['password']) == None or Validator.mail(data['mail']) == None or mng.find_one("users", { 'mail' : data['mail'] }):
        abort(401)
    key = Jwt.token(64)
    mng.insert('users', { 'pseudo' : data['pseudo'], 'password' : Jwt.sha256(data['password']), 'mail' : data['mail'], 'secret' : key, 'rank' : 1, 'icon' : '', 'type' : 'classic' })
    
    pprint.pprint(Jwt.generate({ "pseudo" : data["pseudo"], "mail" : data["mail"], "rank" : 1 }, key))
    return Jwt.generate({ "pseudo" : data["pseudo"], "mail" : data["mail"], "icon" : "", "rank" : 1 }, key)

@app.route('/settings', methods=[ "GET", "POST" ])
def settings():
    return 'ok'

@app.route('/room/<name>', methods=[ "GET", "POST" ])
def room(name=None):
    target = re.search('^[0-9]+$', name)
    if name == None or target == None:
        abort(404)
    if request.method == 'POST' :
        data = json.loads(request.get_data())
        if data['action'] == 'create' :
            return 'create'
        elif data['action'] == 'play' :
            return 'play'
        else :
            abort(404)
    return 'playing_song'

@app.route('/info', methods=[ "GET" ])
def info():
    return 'ok'

@app.route('/image/<name>', methods=[ "GET" ])
def image(name=None):
    if name == None :
        abort(404)
    target = re.search('^[A-Za-z0-9\-_]+\.[a-z]{3,4}$', name)[0]
    return send_file('./img/' + target, mimetype='image/png')

@app.route('/lazy/<name>', methods=[ "GET" ])
def lazy(name=None):
    if name == None :
        abort(404)
    target = re.search('^[A-Za-z0-9\-_]+\.[a-z]{3,4}$', name)[0]
    return send_file('./img/lazy/' + target, mimetype='image/png')

@app.route('/music/<name>', methods=[ "GET" ])
def music(name=None):
    if name == None :
        abort(404)
    target = re.search('^[A-Za-z0-9\-_]+\.[a-z0-9]{3,4}$', name)[0]
    pprint.pprint('ok')
    return send_file('./aud/' + target, mimetype='video/mp4')

@app.route('/list', methods=[ "GET" ])
def list():
    songs = mng.find("song", {})
    arr = []
    for i in songs :
        #pprint.pprint(i)
        arr.append({
            'name' : i['name'],
            'artist' : i['artist'],
            'duration' : i['duration'],
            'icon' : i['icon'],
            'difficulty' : i['difficulty']
        })
    return json.dumps(arr)