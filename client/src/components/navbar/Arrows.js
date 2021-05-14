import React from 'react';
import { WNavItem, WRow, WCol }                from 'wt-frontend';

const Arrows = (props) => {
    const activeList = props.status.activeList
    const clickedMap = props.status.clickedMap

    const parent = props.totalMap.filter(map => map._id == activeList.parent)[0]

    const flag   = parent!=null && parent.child.length == 0 ? true : false ;
    
    const clickDisabled = () => { };
    const buttonStyle = flag ? ' table-header-button-disabled ' : 'table-header-button ';
    
    const handleBackward = async (e) =>{
        for(var i=0;i<parent.child.length;i++){
            if(parent.child[i+1] == activeList._id){
                props.handleSetActive(parent.child[i], -1)
            }
        }
    }

    const handleForward = async (e) =>{
        for(var i=0;i<parent.child.length;i++){
            if(parent.child[i-1] == activeList._id){
                props.handleSetActive(parent.child[i], -1)
            }
        }
    }

    return (
        props.viewer.length > 0 ? 
            <>
                <WRow>
                    <WCol size="6">
                        <WNavItem >
                            <i className="material-icons " onClick={flag ? clickDisabled : handleBackward} >arrow_backward</i>
                        </WNavItem>
                    </WCol>
                    <WCol size="6">
                        <WNavItem >
                            <i className="material-icons " onClick={flag ? clickDisabled : handleForward} >arrow_forward</i>
                        </WNavItem>
                    </WCol>         
                </WRow>
                
            </> 
        :
            <div></div>
        
    );
};

export default Arrows;