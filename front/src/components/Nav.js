import React from 'react';
import Utils from '../modules/utils'

import Lazy from './Lazy'
import Creds from './Creds'
import Account from './Account'

let api = Utils.parseCookie().api_url,
    res = "Crowds.png"

export default class Loading extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return <nav className="head">
            <Lazy api={ api } ressource={ res } />
            { this.props.data.user === null ? <Creds /> : <Account data={ this.props.data } /> }
        </nav>
    }
}