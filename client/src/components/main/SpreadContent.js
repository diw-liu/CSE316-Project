import React            from 'react';
import SpreadBar        from './SpreadBar'
import SpreadEntry      from './SpreadEntry'

const SpreadContent = (props) =>{
    let entries = props.child;

    if(props.editing.field!=""&&props.editing.index<=-1){
        props.setEditing({
            index:0,
            field:props.editing.field
        })
    }
    if(props.editing.field!=""&&props.editing.index>=entries.length){
        props.setEditing({
            index:entries.length-1,
            field:props.editing.field,
        })
    }

    return(
        <div className='table '> 
            <SpreadBar activeList={props.activeList} sortMapList={props.sortMapList}/>
            {   
                entries !== undefined && entries.length > 0 ?
                <div className=' table-entries container-primary'>
                    {
                        entries.map((entry,index) =>(
                            <SpreadEntry
                                data={entry} index={index} handleSetActive={props.handleSetActive}
                                toggleViewer={props.toggleViewer} activeList={props.activeList} setShowDelete={props.setShowDelete}
                                updateMapList={props.updateMapList} removeMapList={props.removeMapList}
                                editing={props.editing} setEditing={props.setEditing}
                            />
                        ))
                    }
                </div>
                :<div>Nothing here</div>  
            }
        </div>
    )
}

export default SpreadContent;