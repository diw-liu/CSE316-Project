import React, { useState, useEffect  }           from 'react';
import { WRow, WCol, WButton, WInput } from 'wt-frontend';

const SpreadEntry = (props) =>{
    
    // console.log(props.index);

    const data = props.data;
    let timer = 0
    const [nameFlag, toggleName] = useState(false);
    const [capitalFlag, toggleCapital] = useState(false);
    const [leaderFlag, toggleLeader] = useState(false);
    
    useEffect(() => {
        if(props.index==props.editing.index){
            switch(props.editing.field){
                case "Name":
                    toggleName(true);
                    break;
                case "Capital":
                    toggleCapital(true);
                    break;
                case "Leader":
                    toggleLeader(true);
                    break;
            }
        }
    });

    const handleClick = (event) =>{
        clearTimeout(timer);
        if(event.detail === 1){
            timer = setTimeout(()=>{
                handleSpreadSheet()
            }, 200)
        }else if (event.detail === 2){
            handleNameToggle()
        }
    }

    const handleSpreadSheet = async (e) =>{
        props.handleSetActive(data._id)
    }

    const handleRegionViewer = async (e) =>{
        props.toggleViewer(props.activeList.name);
        props.handleSetActive(data._id);
    }

    const handleNameToggle = async (e) =>{
        toggleName(!nameFlag)
        props.setEditing({
            index:props.index,
            field:"Name"
        })
    }

    const handleName = async (e) =>{
        if(e.target.value == ''){
            return
        }
        props.updateMapList(props.data._id, "name", data.name, e.target.value)
        toggleName(!nameFlag);
    }

    const handleCapitalToggle = async (e) =>{
        toggleCapital(!capitalFlag)
        props.setEditing({
            index:props.index,
            field:"Capital"
        })
    }
    const handleCapital = async (e) =>{
        if(e.target.value == ''){
            return
        }
        props.updateMapList(props.data._id, "capital", data.capital, e.target.value)
        toggleCapital(!capitalFlag);
    }

    const handleLeaderToggle = async (e) =>{
        toggleLeader(!leaderFlag)
        props.setEditing({
            index:props.index,
            field:"Leader"
        })
    }
    const handleLeader = async (e) =>{
        if(e.target.value == ''){
            return
        }
        props.updateMapList(props.data._id, "leader", data.leader, e.target.value)
        toggleLeader(!leaderFlag);
    }
    
    const handleDelete = async (e) =>{
        console.log(props.data)
        props.setShowDelete(props.data._id)
    }
    
    return(
        <WRow className='table-entry'>
            <WCol size="1">
                <div className="table-text" onClick={handleDelete}>
                    <WButton> X </WButton>
                </div> 
            </WCol>
                
            
            <WCol size="2" >
                {
                    nameFlag    ? <WInput className="list-item-edit" onBlur={handleName}
                                    onKeyDown={(e) => {if(e.keyCode === 13) handleName(e)}}
                                    autoFocus={true} defaultValue={data.name} type='text'
                                    inputClass="list-item-edit-input"/>
                                : 
                                    <div className="table-text" onClick={handleClick} >
                                        {data.name}
                                    </div>              
                } 
            </WCol>

            <WCol size="2" >
                {
                    capitalFlag ? <WInput className="list-item-edit" onBlur={handleCapital}
                                    onKeyDown={(e) => {if(e.keyCode === 13) handleCapital(e)}}
                                    autoFocus={true} defaultValue={data.capital} type='text'
                                    inputClass="list-item-edit-input"/>
                                : 
                                    <div className="table-text" onClick={handleCapitalToggle}>
                                        {data.capital}
                                    </div>              
                }
            </WCol>

            <WCol size="2">
                {
                    leaderFlag  ? <WInput className="list-item-edit" onBlur={handleLeader}
                                    onKeyDown={(e) => {if(e.keyCode === 13) handleLeader(e)}}
                                    autoFocus={true} defaultValue={data.leader} type='text'
                                    inputClass="list-item-edit-input"/>
                                : 
                                    <div className="table-text" onClick={handleLeaderToggle}>
                                        {data.leader}
                                    </div>              
                }
            </WCol>

            <WCol size="2">
                <div className="table-text">
                    Flag
                </div>
            </WCol>

            <WCol size="3">
                {
                    data.landmarks.length==0 ?
                    <div className="table-text" onClick={handleRegionViewer}>
                        Sorry Nothing here
                    </div>
                    :
                    <div className="table-text" onClick={handleRegionViewer}>
                        {data.landmarks[0].name+",..."}
                    </div>
                }
            </WCol>
        </WRow>
    )
}

export default SpreadEntry;