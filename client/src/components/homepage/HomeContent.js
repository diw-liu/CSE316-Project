import React            from 'react';
import HomeEntry        from './HomeEntry'
const HomeContent = (props) =>{
    let entries = props.maplists;
    return(
        entries !== undefined && entries.length > 0 ?
        <div >
            {
                entries.slice(0).reverse().map((entry,index) =>(
                    <HomeEntry
                        data={entry} index={index} setShowDelete={props.setShowDelete}
                        updateMapList={props.updateMapList} handleSetActive={props.handleSetActive}
                    />
                ))
            }
        </div>
        :<div>Nothing here</div>
    )
}
export default HomeContent;