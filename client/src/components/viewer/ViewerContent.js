import React, { useState }          from 'react';
import { WLayout, WLMain, WLSide, WLFooter, WLHeader, WButton, WCard} from 'wt-frontend';
import ViewerTable                from './ViewerTable';
import ViewerInfo                 from './ViewerInfo';
const ViewerContent = (props) =>{
    const data = props.activeList
    
    return (
        <WLayout wLayout="rside">
            <WLMain>
                <ViewerInfo data={props.activeList} viewer={props.viewer} 
                    handleSetActive={props.handleSetActive} toggleViewer={props.toggleViewer}/>
            </WLMain>
            <WLSide>
                <ViewerTable />
            </WLSide>
        </WLayout>
    );

}

export default ViewerContent