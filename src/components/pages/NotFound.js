// Copyright (c) 2019 by zhouwh. All Rights Reserved.
import React from 'react';
import './NotFound.less';
import img from '../../assets/img/404.png';

class NotFound extends React.Component {
    state = {
        animated: ''
    };
    enter = () => {
        this.setState({animated: 'pulse'})
    };
    render() {
        return (
            <div className="center" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
                <img src={img} alt="404" className={`animated bounce ${this.state.animated}`} onMouseEnter={this.enter} />
            </div>
        )
    }
};

export default NotFound;
