import React from 'react';

export default class Error extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.render.bind(this)
    }

    render() {
        return <div className="error">
            Error { this.props.err }
        </div>
    }
}