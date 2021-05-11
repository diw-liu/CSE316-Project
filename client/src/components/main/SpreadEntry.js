import React, { useState }           from 'react';
import { WRow, WCol, WButton, WInput } from 'wt-frontend';

const SpreadEntry = (props) =>{
    const data = props.data;
    let timer = 0
    const [nameFlag, toggleName] = useState(false);
    const [capitalFlag, toggleCapital] = useState(false);
    const [leaderFlag, toggleLeader] = useState(false);

    const handleClick = (event) =>{
        clearTimeout(timer);
        if(event.detail === 1){
            timer = setTimeout(()=>{
                handleSpreadSheet()
            }, 200)
        }else if (event.detail === 2){
           toggleName(!nameFlag)
        }
    }

    const handleSpreadSheet = async (e) =>{
        props.handleSetActive(data._id)
    }

    const handleRegionViewer = async (e) =>{
        props.toggleViewer(props.activeList.name);
        props.handleSetActive(data._id);
    }
    
    const handleName = async (e) =>{
        if(e.target.value == ''){
            return
        }
        props.updateMapList(props.data._id, "name", e.target.value, false)
        toggleName(!nameFlag);
    }

    const handleCapital = async (e) =>{
        if(e.target.value == ''){
            return
        }
        props.updateMapList(props.data._id, "capital", e.target.value, false)
        toggleCapital(!capitalFlag);
    }

    const handleLeader = async (e) =>{
        if(e.target.value == ''){
            return
        }
        props.updateMapList(props.data._id, "leader", e.target.value, false)
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
                                    autoFocus={true} defaultValue={data.capital} type='text'
                                    inputClass="list-item-edit-input"/>
                                : 
                                    <div className="table-text" onClick={()=>toggleCapital(!capitalFlag)}>
                                        {data.capital}
                                    </div>              
                }
            </WCol>

            <WCol size="2">
                {
                    leaderFlag  ? <WInput className="list-item-edit" onBlur={handleLeader}
                                    autoFocus={true} defaultValue={data.leader} type='text'
                                    inputClass="list-item-edit-input"/>
                                : 
                                    <div className="table-text" onClick={()=>toggleLeader(!leaderFlag)}>
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
                        {data.landmarks[0]+",..."}
                    </div>
                }
            </WCol>
        </WRow>
    )
}

export default SpreadEntry;