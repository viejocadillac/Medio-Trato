import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './Notifications.scss'


const Notifications = (props)=> {

    return (
        <div className="notificaciones">
            <ReactCSSTransitionGroup transitionName="step" transitionEnterTimeout={300} transitionLeaveTimeout={300}> 
                {props.children}
            </ReactCSSTransitionGroup> 
        </div>
    )
}

export default Notifications;