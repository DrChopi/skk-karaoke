import React from 'react';

import logo from "../assets/img/logo.png"
import Utils from '../modules/utils'

import Account from '../components/Account'
import Lazy from '../components/Lazy'

let api = Utils.parseCookie().api_url

// for (let i = 0; i < 100; i++)
//     songs.push({
//         id : i,
//         "name" : "test" + i,
//         "artist" : "author" + i,
//         "difficulty" : 1 + Math.floor(Math.random() * Math.pow(10, 6))%10,
//         "duration" : "3:30",
//         "sample" : "https://picsum.photos/id/" + i + "/800/480",
//         "speed" : 40 + Math.floor(Math.random() * Math.pow(10, 6))%81,
//         "associated" : uti.tkgen(10) + ' - ' + ((Math.floor(Math.random() * Math.pow(10, 6))%2 == 0)? "Ending" : "Opening")
//     })

export default class Play extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            songs : [],
            focus : null
        }
    }

    async componentDidMount() {
        this.render.bind(this)
        this.falscroller.bind(this)

        console.log(await Utils.get(api + '/list'));
        this.setState({ songs : (await Utils.get(api + '/list')).data, focus : 0 })

        let el = window.document.querySelector('.scroller'),
            childs = el.querySelectorAll('li'),
            uni = el.scrollHeight/childs.length

        el.scrollTop = 1
        window.document.querySelector('.falscroller').style.height = el.scrollHeight * 0.075 + 'px'

        let che = [ "kenat", "very easy", "easy", "medium", "hard", "very hard", "insane", "hell", "inhuman", "godlike" ]
        let col = [ "#2601FF", "#0C9BF4", "#0DF744", "#f2ed71", "#FF8022", "#FD000E", "#E60096", "#D400FF", "#000000", "#FFFFFF" ]
        let dif = window.document.querySelectorAll('li > div > span:nth-child(3)'),
            rat = window.document.querySelectorAll('li > div > span:nth-child(4)')

        for (let i = 0; i < dif.length; i++) {
            dif[i].parentNode.parentNode.style.backgroundColor = col[(+dif[i].innerHTML) - 1]
            dif[i].parentNode.parentNode.style.borderColor = col[(+dif[i].innerHTML) - 1]
            //dif[i].parentNode.parentNode.style.backgroundImage = patern
            dif[i].innerHTML = che[(+dif[i].innerHTML) - 1]
        }
        
        for (let i = 0; i < rat.length; i++) {
            let tmp = ""
            for (let j = 0; j < 10; j++)
                tmp += (j < +rat[i].innerHTML)? "<hr class='diff' />" : "<hr class='rest' />" 
            rat[i].innerHTML = tmp 
        }

        childs[Math.floor(el.scrollTop/uni) + 1].className = "previous"
        childs[Math.floor(el.scrollTop/uni) + 2].className = "focus"
        childs[Math.floor(el.scrollTop/uni) + 3].className = "next"

        this.falscroller()
    }

    song(el, key) {
        return <li key={key}>
          <Lazy api={ api } ressource={ el.icon } />
          <div>
            <span>{ el.name }</span>
            <span>{ el.artist } . // { el.associated }</span>
            <span>{ el.difficulty }</span>
            <span>{ el.difficulty }</span>
          </div>
        </li>
    }

    falscroller () {
        let el = window.document.querySelector('.scroller'),
            childs = el.querySelectorAll('li').length,
            tar = window.document.querySelector('.falscroller :first-child')

            tar.style.height = el.scrollHeight/childs + 'px'
            el.onscroll = () => {
                let el = window.document.querySelector('.scroller'),
                childs = el.querySelectorAll('li'),
                tar = window.document.querySelector('.falscroller :first-child'),
                uni = el.scrollHeight/childs.length

                if (el.scrollTop + 110 > el.scrollHeight - (uni * 10))
                    el.scrollTop = 1
                
                if (el.scrollTop === 0)
                    el.scrollTop = (el.scrollHeight - (uni * 10)) - 121
                //console.log(el.scrollTop + 70, el.scrollHeight - (uni * 10));

                for (let i = 0; i < childs.length; i++)
                    childs[i].className = ""
                
                tar.style.top = (el.scrollTop * 0.077) + 'px'
                //console.log(Math.floor(el.scrollTop/uni), childs[Math.floor(el.scrollTop/uni)])
                
                childs[Math.floor(el.scrollTop/uni) + 1].className = "previous"
                childs[Math.floor(el.scrollTop/uni) + 2].className = "focus"
                childs[Math.floor(el.scrollTop/uni) + 3].className = "next"

                this.setState({ focus : (Math.floor(el.scrollTop/uni) + 2) })

                window.document.body.style.backgroundImage = "url(" + window.document.body.querySelector('.focus img').src + ")"
            }
    }

    details (song) {
        //console.log(song);
        let che = [ "kenat", "very easy", "easy", "medium", "hard", "very hard", "insane", "hell", "inhuman", "godlike" ]

        return <div>
            <ul>
                <Lazy api={ api } ressource={ song.icon } />
                <li><span>{song.name}</span> - <span>{song.artist}</span> [ <span>{ che[song.difficulty - 1] }</span> ]</li>
                <li><span>Puls {song.speed} - Ronde { Math.floor((60/song.speed)*10)/10 }s</span></li>
                <li><span>Durée {Math.floor(song.duration/60)}:{Math.floor(song.duration%60)}</span></li>
                <span></span>
            </ul>
        </div>
    }

    joinRoom() {

    }

    render() {
        return <div className="play">
            <Account data={ this.props.data } />
            <div className="details">
                { this.state.focus !== null &&
                    this.details(this.state.songs[this.state.focus]) }
            </div>
            <div className="ranking"></div>
            <a href="/"><button className="back">Back</button></a>
            <a onClick={ this.joinRoom.bind(this) }><button className="join">Join room</button></a>
            <a onClick={ this.joinRoom.bind(this) }><button className="go">Play</button></a>
            <ul className="scroller">
                    <div className="falscroller"><span>0</span></div>
                    { this.state.songs.map((el, key) => this.song(el, key)) }
                    { this.state.songs.slice(0, 11).map((el, key) => this.song(el, key)) }
            </ul>
            <div className="footer"></div>
        </div>
    }
}