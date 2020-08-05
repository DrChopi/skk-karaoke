from PIL import Image, ImageFilter
from ffmpy import FFmpeg, FFprobe
import os, pprint, subprocess, json

class Img :
    def prepare(connector) :
        videos = next(os.walk('./aud/'))[2]
        if not os.path.exists('./img/') :
            os.makedirs('./img/')
        if not os.path.exists('./img/lazy/') :
            os.makedirs('./img/lazy/')

        for i in videos :
            pprint.pprint('Creating thumbnail for : ' + i)
            FFmpeg(inputs={ './aud/' + i : None }, outputs={ './img/' + i.replace('.mp4', '.png') : ['-y', '-ss', '00:00:5', '-vframes', '1']}).run()
            mta = FFprobe(inputs={ './aud/' + i : None }, global_options=[ '-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams']).run(stdout=subprocess.PIPE)
            mta = json.loads(mta[0].decode('utf-8'))
            #pprint.pprint(mta)
            if connector.find_one('song', { 'file' : mta['format']['filename'] }) == None :
                connector.insert('song', {
                    'name' : mta['format']['tags']['title'],
                    'artist' : mta['format']['tags']['artist'],
                    'duration' : mta['format']['duration'],
                    'icon' : i.replace('.mp4', '.png'),
                    'file' : mta['format']['filename'],
                    'difficulty' : 2
                })

        images = next(os.walk('./img/'))[2]
        for i in images :
            pprint.pprint('Compressing image : ' + i)
            # if (connector.find_one('song', {  }))
            Image.open('./img/' + i).filter(ImageFilter.BoxBlur(30)).save('./img/lazy/' +  i, dpi=(600, 600))
        return 'ok'
