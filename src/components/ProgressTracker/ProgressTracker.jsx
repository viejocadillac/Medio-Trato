import React from 'react'
import './progress-tracker.scss'

import Segment from '../Segment/Segment'

const ProgressTracker = ({stepsPerSegment, completedSteps, onSegmentCompleted}) => {
    let prevSum = 0;
    const segments = stepsPerSegment.map((valor)=>{ return {steps: valor, completed:onSegmentCompleted} })

    return (
        <div className="tracker">
            {
                segments.map((segment, i)=>{
                    const seg = <Segment key={`segment-${i}`} steps={segment.steps} completed={completedSteps} prevSum={prevSum} completedCallback={segment.completed}/>
                    prevSum += segment.steps
                    return seg
                })
            }
        </div>
    )

}

export default ProgressTracker;