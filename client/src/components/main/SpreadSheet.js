import React            from 'react';
import SpreadHead       from './SpreadHead'
import SpreadContent    from './SpreadContent'

const SpreadSheet = (props) =>{
    // console.log(props.subMap)
    return(
        <div className='table' >
            <SpreadHead activeList={props.activeList}  disabled={!props.activeList._id} 
                addMapList={props.addMapList} updateMapList={props.updateMapList} />
            <SpreadContent child={props.subMap} handleSetActive={props.handleSetActive} 
                toggleViewer={props.toggleViewer} activeList={props.activeList} setShowDelete={props.setShowDelete}
                updateMapList={props.updateMapList} removeMapList={props.removeMapList} sortMapList={props.sortMapList}/>
        </div>
    )
}

export default SpreadSheet;