import React from 'react';
import Utils from '../modules/utils'

import Lazy from './Lazy'

let api = Utils.parseCookie().api_url,
    res = "Crowds.png"

export default class Account extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.render.bind(this)
    }

    render() {
        return <a className="account" href="/setting">
            <Lazy api={ api } ressource={ res } />
            <span>{ this.props.data.user.pseudo }</span>
        </a>
    }
}