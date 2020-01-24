import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'animate.css-react';
import 'animate.css/animate.css';
import './Notifications.scss';


const Notifications = ({ children }) => (
  <div className="notificaciones">
    <Animate
      appear="fadeInDown"
      durationAppear={1000}
      component="div"
    >
      {children}
    </Animate>
  </div>
);

Notifications.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.bool),
  ]).isRequired,
};


export default Notifications;
