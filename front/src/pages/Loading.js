import React from 'react';

import logo from "../assets/img/logo.png"

export default class Loading extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
       // await this.props.prm
        
        // setTimeout(() => window.$('.loading').animate({
        //     top : '-100vw'
        // }, 2000), 500)
    }

    render() {
        return <div className="loading">
            <img className="lcenter" alt="logo" src={ logo } />
            {/* <span>Press any key to continue ...</span> */}
        </div>
    }
}