import React from 'react';

export default class Screen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="screen">
            <div style={{ backgroundImage : "url(" + this.props.img + ")" }}>{ this.props.txt }</div>
            <div style={{ backgroundImage : "url(" + this.props.img + ")" }}></div>
        </div>
   }
}