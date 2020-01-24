import React from 'react';
import PropTypes from 'prop-types';


const Segment = ({
  steps, completed, prevSum, completedCallback,
}) => {
  const [completedBar, setCompletedBar] = React.useState(false);

  React.useEffect(() => {
    if (completed - prevSum >= steps && !completedBar) {
      completedCallback();
      setCompletedBar(true);
    }
  }, [steps, completed, completedCallback, prevSum, completedBar, setCompletedBar]);

  const widthBar = ((completed - prevSum) / steps) * 100;


  return (
    <div className="segment" style={{ flexGrow: steps }}>
      <div className="bar">
        <div className="bar-completed" style={{ width: widthBar >= 0 ? `${widthBar}%` : '0%' }}> </div>
      </div>
      <div className={`segment-completed ${completed - prevSum >= steps ? 'segment-completed-filled' : ''}`}> </div>
    </div>
  );
};

Segment.propTypes = {
  steps: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  prevSum: PropTypes.number.isRequired,
  completedCallback: PropTypes.func,
};

Segment.defaultProps = {
  completedCallback: () => {},
};

export default Segment;
