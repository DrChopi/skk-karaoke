import b64 from 'base64url'
import axios from 'axios'

export default {
    tkgen : (size, alpha) => {
        let tmp = ""
        alpha = alpha ? alpha : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
        for (let i = 0; i < size; i++)
          tmp += alpha[Math.floor(Math.pow(10, 8) * Math.random())%alpha.length]
    
        //console.log(tmp);
    
        return tmp
    },
    parseCookie : () => {
        let str = document.cookie.split(/; /),
            cookies = {}
        // console.log(str);
        for (let i = 0; i < str.length; i++) {
            let tmp = str[i].match(/^([^=]+)=(.+)$/)
            // console.log(tmp);
            cookies[tmp[1]] = tmp[2]
        }
        return cookies
    },
    parseJWT : (jwt) => {
        // console.log(jwt);
        jwt = jwt.split('.')
        // console.log(b64.decode(jwt[1]));
        // console.log(JSON.parse(b64.decode(jwt[1])));
        return JSON.parse(b64.decode(jwt[1]))
    },
    setCookie : (name, value, exp) => {
        var d = new Date();
        d.setTime(d.getTime() + (exp * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },
    rmCookie : (name) => {
        var d = new Date();
        d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=value;" + expires + ";path=/";
    },
    validator : (val, type) => {
        let schemes = {
            //eslint-disable-next-line
            "String" : "^[A-Za-z0-9Ç-Ñ\-\_\ ]+$",
            //eslint-disable-next-line
            "Mail"   : "^(([^<>()[]\.,;:\s@\"]+(\.[^<>()[]\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$"
        } ; return val.match(schemes[type]) !== null
    },
    shake : () => {
        let target = window.document.body,
            limit = 5
        for (let i = 0; i < limit; i++)    
            setTimeout(() => { target.style.transform = "translateX(" + 2 * (i%2 - 1) + "%)" }, 100 * i)
        setTimeout(() => { target.style.transform = "" }, 100 * limit)
    },
    checkSess : async (target) => {
        return new Promise ((resolve, reject) => {
        })
    },
    get : async (url) => {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => resolve(res))
                .catch(e => reject(e))
        })
    },
    post : async (url, data) => {
        return new Promise((resolve, reject) => {
            axios.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
                .then(res => resolve(res))
                .catch(e => reject(e))
        })
    }
}
