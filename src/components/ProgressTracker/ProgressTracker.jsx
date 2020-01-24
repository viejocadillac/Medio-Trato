import React from 'react';
import PropTypes from 'prop-types';
import './progress-tracker.scss';

import Segment from '../Segment/Segment';

const ProgressTracker = ({ stepsPerSegment, completedSteps, onSegmentCompleted }) => {
  let prevSum = 0;
  const segments = stepsPerSegment.map((val) => ({ steps: val, completed: onSegmentCompleted }));

  return (
    <div className="tracker">
      {
        segments.map((segment, i) => {
          const seg = (
            <Segment
              key={`segment-${i + 1}`}
              steps={segment.steps}
              completed={completedSteps}
              prevSum={prevSum}
              completedCallback={segment.completed}
            />
          );
          prevSum += segment.steps;
          return seg;
        })
      }
    </div>
  );
};

ProgressTracker.propTypes = {
  stepsPerSegment: PropTypes.arrayOf(PropTypes.number).isRequired,
  completedSteps: PropTypes.number.isRequired,
  onSegmentCompleted: PropTypes.func,
};

ProgressTracker.defaultProps = {
  onSegmentCompleted: () => {},
};

export default ProgressTracker;
