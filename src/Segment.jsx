import React from 'react'

const Segment = ({steps, completed, prevSum, completedCallback}) => {
    const [completedBar ,setCompletedBar] = React.useState(false)

    React.useEffect(()=>{
        if(completed - prevSum >= steps && !completedBar){
            completedCallback()
            setCompletedBar(true)
        }


    }, [steps, completed, completedCallback, prevSum, completedBar, setCompletedBar])

    const widthBar = ((completed - prevSum) / steps)*100
  

    return (
        <div className="segment" style={{flexGrow: steps }}>
            <div className="bar">
                <div className="bar-completed" style={{width: widthBar>= 0 ?`${widthBar}%`: '0%'}}> </div>
            </div>
            <div className={`segment-completed ${completed - prevSum >= steps ? 'segment-completed-filled':''}`}> </div>
        </div>
    )
}

export default Segment