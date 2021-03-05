import React from "react"
import { Popover, OverlayTrigger } from 'react-bootstrap'
function generateInfo(background, message, value) {
    return <tr>
        <td>
            <span style={{background: background, width: "15px", height: "15px", float: "left"}}></span>
        </td>
        <td>{message}</td>
        <td>{value} ms</td>
    </tr>
}
let popoverHoverFocus =(timings)=> (
    <Popover id="popover-trigger-hover-focus">
        <table style={{background:'white'}}>
            <tbody>
                {timings.blocked > 0 && generateInfo("#ffffb3", "Blocking", timings.blocked)}
                {timings.connect > 0 && generateInfo("#b3ffb3", "Connecting", timings.connect)}
                {timings.dns > 0 && generateInfo("#ffc6b3", "DNS Lookup", timings.dns)}
                
                {timings.receive > 0 && generateInfo("#ffb3b3", "Receiving", timings.receive)}
                {timings.send > 0 && generateInfo("blue", "Sending", timings.send)}
                {timings.ssl>0 && generateInfo('#66ffff','SSL',timings.ssl)}
                {timings.wait > 0 && generateInfo("#d9b3ff", "Waiting", timings.wait)}
                {timings._queued>0 && generateInfo('#7575a3','Queueing',timings._queued)}

            </tbody>
        </table>
    </Popover>
)

const renderTiming =(timings) =>{
    const renderTimes = []
    const color = {blocked:'#ffffb3',connect:'#b3ffb3',dns:'#ffc6b3',receive:'#ffb3b3',send:'blue',ssl:'#66ffff',wait:'#d9b3ff',_queued:'#7575a3'}
    let startTime = 0
    let totalTime = 0
    for( const id of Object.keys(timings)){
        if(timings[id]===-1){
            continue
        }
        totalTime=totalTime+timings[id]
    }
    const fraction = 100/totalTime
    for(const id of Object.keys(timings)){
        if(timings[id]===-1){
            
            continue
        }
        const marginLeft = fraction*startTime
        const width = fraction*timings[id]
        startTime=startTime+timings[id]
        renderTimes.push(
            <div style={{position:'absolute',marginLeft:`${marginLeft}%`,width:`${width}%` , backgroundColor: color[id], height:'20px' }}> </div>
        )
    }

    return renderTimes
}

const renderUrlText = (url) =>{
    if(url.length<=30){
        return url;
    }
    else return url.slice(0,30);
}

class TableBody extends React.Component{
    constructor(props){
        super(props)
        this.har = props.har
    }

    render(){
    const table = this.har.log.entries
    const start=new Date(table[0].startedDateTime).getTime();
    let end=0;
    const length=table.length;
    for(let i=0;i<length;i++){
    if(end<new Date(table[i].startedDateTime).getTime()+table[i].time)
        {
          	end=new Date(table[i].startedDateTime).getTime()+table[i].time;
        }
    }
    console.log(table,end,start,end-start)
    const fraction = 100/(end-start);
    const renderTable = table.map(( value )=> {
        const startTime = new Date(value.startedDateTime).getTime()
        console.log(startTime)
        const endTime = startTime + value.time
        const marginLeft = (startTime-start)*fraction
        const width = (endTime - start)*fraction - marginLeft 

        return(
            <div className="har-contents">
            <div className="type" style={{border:'1px solid black'} }>{value.request.method}</div>
            <a className="url" style={{border:'1px solid black',paddingLeft:'2px' }} href={value.request.url}>{renderUrlText(value.request.url)}</a>
            <div className="rtype" style={{border:'1px solid black' } }>{value.response.status}</div>
            <div className="time" style={{border:'1px solid black'} }>{parseInt(value.time)} ms</div>
            <div className="waterfall" >
            <OverlayTrigger placement="left" overlay={popoverHoverFocus(value.timings)}>
                <div style={{ position:'relative',marginLeft:`${marginLeft}%`,width:`${width}%`, height:'20px'}}>{renderTiming(value.timings)}</div>
            </OverlayTrigger>    
            </div>
            </div>
            
    )
    })

    return (<div id='body'>{renderTable}</div>)
}
}
export default TableBody;