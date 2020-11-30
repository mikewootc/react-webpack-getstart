'use strict'

import React from 'react';
import axios from 'axios';
import Logger from 'cpclog';

const logger = Logger.createWrapper('ScreenHome', Logger.LEVEL_DEBUG);

class ScreenHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greetingBack: '',
            greetingBackName: '',
        };
    }

    async componentDidMount() {
        logger.debug('axios.post');
        const res = await axios.post(
            `/user/${this.props.username}`,
            {
                greeting: 'hello',
            },
        );
        
        if (res.status == 200 && res.data.result == 'ok') {
            this.setState((prevState, props) => ({
                greetingBack: res.data.greetingBack,
                greetingBackName: res.data.greetingBackName,
            }));
        } else {
            logger.error('res.status:', res.status, res.data);
        }
    }

    render() {
        return (
            <div style={ss.box}>
                <p>This is home screen.</p>
                <p>From Screen: { this.props.location.state.fromScreen }</p>
                <p>{ this.props.username } has logged in.</p>
                <p>  { this.state.greetingBack + ' ' + this.state.greetingBackName }.</p>
            </div>
        )
    }
}

const ss = {
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
}

export default ScreenHome;
