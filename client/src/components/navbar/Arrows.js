import React from 'react';

const Arrows = (props) => {
    const handleBackward = async (e) =>{
        var parent;
        for(var i=0;i<props.totalMap.length;i++){
            if(props.totalMap[i]._id == props.activeList.parent){
                parent=props.totalMap[i]
            }
        }
        for(var i=0;i<parent.child.length;i++){
            if(parent.child[i+1] == props.activeList._id){
                props.handleSetActive(parent.child[i])
            }
        }
    }

    const handleForward = async (e) =>{
        var parent;
        for(var i=0;i<props.totalMap.length;i++){
            if(props.totalMap[i]._id == props.activeList.parent){
                parent=props.totalMap[i]
            }
        }
        for(var i=0;i<parent.child.length;i++){
            if(parent.child[i-1] == props.activeList._id){
                props.handleSetActive(parent.child[i])
            }
        }
    }

    return (
        props.viewer.length > 0 ? 
            <div>
                <i className="material-icons" onClick={handleBackward}>arrow_backward</i>
                <i className="material-icons" onClick={handleForward}>arrow_forward</i>
            </div> 
        :
            <div></div>
        
    );
};

export default Arrows;