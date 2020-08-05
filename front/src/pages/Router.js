import React from 'react';

import Utils from '../modules/utils.js';
import Loading from './Loading'
import Error from './Error'

import '../assets/css/index.css';

let allowed_methods = [ "route", "render" ]
let routes = {

    '/.{0}$' : { component : "Home", auth : [ 0 ] },
    '/$' : { component : "Menu", auth : [ 1 ] },
    '/home$' : { component : "Home", auth : [ 1 ] },
    '/room/*' : { component : "Play", auth : [ 1 ] },
    '/settings$' : { component : "Settings", auth : [ 1 ] },
    '/.*': { component : "Error", auth : [ 0, 1, 2 ] },

}

export default class Router extends React.Component {
    constructor () {
      super()
      
      let sess = Utils.parseCookie().usr_jwt_session
      //console.log(sess);
      //console.log(Utils.parseJWT(sess));
      this.state = {
        user : sess === undefined ? null : Utils.parseJWT(sess),
        component : <span>Loading ...</span>
      }
    }

    async componentDidMount () {
      for (let i = 0; i < allowed_methods.length; i++) this[allowed_methods[i]].bind(this);
      Utils.setCookie('api_url', 'http://localhost:5000', 3)
      this.state.component = <Loading prm={ this.route() } />
    }

    async route() {
      return new Promise(resolve => {
        try {
          let rts = Object.keys(routes),
          i   = 0,
          lvl = this.state.user == null ? 0 : this.state.user.rank
          for (; i < rts.length && (window.document.location.pathname.match(rts[i]) === null || routes[rts[i]].auth.indexOf(lvl) === -1); i++) console.log(window.document.location.pathname.match(rts[i]), routes[rts[i]].auth.indexOf(lvl), lvl);

          if (i === rts.length - 1) this.setState({ component : <Error err="404" /> });
          else {
            let Cmp = require('../pages/' + routes[rts[i]].component).default

            resolve(this.setState({ component : <Cmp data={ this.state } /> }))
          }
        } catch (e) {
          resolve(this.setState({ component : <Error err="502" /> }))
        }
      })
    }

    render () {
      console.log(this.state.component);
      return this.state.component
    }
}
