import React from 'react';

import Nav from '../components/Nav'
import Screen from '../components/Screen'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.render.bind(this)
    }

    render() {
        return <div className="home">
            <Nav data={ this.props.data } />
            <Screen txt={ "SKK" } img={ "https://artfiles.alphacoders.com/433/43310.jpg" } />
            <div className="desc">
                <a href="/room/0"><button>Play</button></a>
                <p>Et culpa Lorem laborum nulla. Nisi non sit velit ea consequat labore do anim consequat do. Officia ad esse ullamco esse nisi adipisicing labore occaecat. 
                   Deserunt culpa in voluptate duis cillum tempor excepteur enim.</p>
            </div>
        </div>
   }
}