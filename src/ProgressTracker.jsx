import React from 'react'
import './progress-tracker.scss'

import Segment from './Segment'

const ProgressTracker = ({segments, completed}) => {

    

    let prevSum = 0;




    return (
        <div className="tracker">
            {
                segments.map((segment, i)=>{
                    const seg = <Segment key={`segment-${i}`} steps={segment.steps} completed={completed} prevSum={prevSum} completedCallback={segment.completedCallback}/>
                    prevSum += segment.steps
                    return seg
                })
            }


        </div>
    )

}

export default ProgressTracker;