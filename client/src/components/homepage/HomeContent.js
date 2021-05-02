import React            from 'react';
import HomeEntry        from './HomeEntry'
const HomeContent = (props) =>{
    let entries = props.maplists;
    return(
        entries !== undefined && entries.length > 0 ?
        <div >
            {
                entries.map((entry,index) =>(
                    <HomeEntry
                        data={entry} index={index} removeMapList={props.removeMapList}
                        updateMapList={props.updateMapList} setActiveList={props.setActiveList}
                    />
                ))
            }
        </div>
        :<div>Nothing here</div>
    )
}
export default HomeContent;