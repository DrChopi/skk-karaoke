import React from 'react';
import Utils from '../modules/utils'

export default class Lazy extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            src : this.props.api + '/lazy/' + this.props.ressource
        }
    }

    componentDidMount() {
        this.render.bind(this)

        let close = setInterval(() => {
            if (document.readyState === 'complete') {
              this.setState({ src : this.props.api + '/image/' + this.props.ressource })
              //clearInterval(close);
            }
          }, 10)
    }

    render() {
        return <img src={ this.state.src } />
    }
}