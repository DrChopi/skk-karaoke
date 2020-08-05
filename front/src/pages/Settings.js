import React from 'react';

import logo from "../assets/img/logo.png"

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.render.bind(this)
        console.log(this.props.nav);
    }

    transition() {
        setTimeout(() => this.props.nav.setState({ status : 'menu' }), 1000)
    }

    render() {
        return <div className="settings">
            <button onClick={ () => this.transition.bind(this) }>Back</button>
            Setting...
        </div>
    }
}