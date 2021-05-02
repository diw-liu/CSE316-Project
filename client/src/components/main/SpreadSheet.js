import React            from 'react';
import SpreadHead       from './SpreadHead'
import SpreadContent    from './SpreadContent'

const SpreadSheet = (props) =>{
    // console.log(props.subMap)
    return(
        <div className='table' >
            <SpreadHead activeList={props.activeList}  disabled={!props.activeList._id} 
                addMapList={props.addMapList} updateMapList={props.updateMapList} />
            <SpreadContent child={props.subMap} setActiveList={props.setActiveList} 
                toggleViewer={props.toggleViewer} activeList={props.activeList}
                updateMapList={props.updateMapList}/>
        </div>
    )
}

export default SpreadSheet;