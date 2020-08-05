import React from 'react';

import Utils from '../modules/utils'

import logo from "../assets/img/logo.png"
import Account from '../components/Account';

export default class Router extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.render.bind(this)
    }

    redirect(e) {
        window.document.location.pathname = '/' + e.target.id
    }

    render() {
        return <div className="menu">
            <Account data={ this.props.data } />
            <img className="lcenter" alt="logo" src={ logo } />
            <ul>
                <li id="room/0" onClick={ this.redirect.bind(this) }>Play</li>
                <li id="settings" onClick={ this.redirect.bind(this) }>Setting</li>
                <li id="quit" onClick={ () => { Utils.rmCookie('usr_jwt_session'); window.document.location.reload() } }>Quit</li>
            </ul>
        </div>
    }
}