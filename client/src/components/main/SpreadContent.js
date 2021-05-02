import React            from 'react';
import SpreadBar        from './SpreadBar'
import SpreadEntry      from './SpreadEntry'

const SpreadContent = (props) =>{
    let entries = props.child;
    
    return(
        <div className='table '> 
            <SpreadBar/>
            {   
                entries !== undefined && entries.length > 0 ?
                <div className=' table-entries container-primary'>
                    {
                        entries.map((entry,index) =>(
                            <SpreadEntry
                                data={entry} index={index} setActiveList={props.setActiveList}
                                toggleViewer={props.toggleViewer} activeList={props.activeList}
                                updateMapList={props.updateMapList}
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