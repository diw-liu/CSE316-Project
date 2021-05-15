import React, { useState }                      from 'react';
import { WLayout, WLMain, WLSide, WCol, WRow }  from 'wt-frontend';
import ViewerTable                              from './ViewerTable';
import ViewerInfo                               from './ViewerInfo';
const ViewerContent = (props) =>{
    const data = props.activeList
    
    return (
            <WRow>
                <WCol size='6'>
                    <WLMain>
                        <ViewerInfo data={props.activeList} viewer={props.viewer} 
                            handleSetActive={props.handleSetActive} toggleViewer={props.toggleViewer}
                            setShowParent={props.setShowParent} 
                            canUndo={props.canUndo} canRedo={props.canRedo} 
                            undo={props.tpsUndo} redo={props.tpsRedo}/>
                    </WLMain>
                </WCol>
                <WCol size='6'>
                    <WLSide>
                        <ViewerTable data={props.activeList} totalMap={props.totalMap}
                            tps={props.tps} tpsUndo={props.tpsUndo} tpsRedo={props.tpsRedo}
                            viewer={props.viewer} 
                            />
                    </WLSide>
                </WCol>
            </WRow>
    );

}

export default ViewerContent