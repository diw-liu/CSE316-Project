import React, { useState }           from 'react';
import { WRow, WCol, WButton, WInput } from 'wt-frontend';

const SpreadEntry = (props) =>{
    const data = props.data;

    
    const [renamingMap, toggleName] = useState(false);
    const [capitalFlag, toggleCapital] = useState(false);
    const [leaderFlag, toggleLeader] = useState(false);

    const [preEdit, setPreEdit] = useState(data.name);

    const handleSpreadSheet = async (e) =>{
        props.setActiveList(data)
    }

    const handleRegionViewer = async (e) =>{
        props.toggleViewer(props.activeList.name);
        props.setActiveList(data);
    }
    
    const handleCapital = async (e) =>{
        props.updateMapList(props.data._id, "capital", e.target.value, false)
        toggleCapital(!capitalFlag);
    }

    const handleLeader = async (e) =>{
        props.updateMapList(props.data._id, "leader", e.target.value, false)
        toggleLeader(!leaderFlag);
    }
 
    
    return(
        <WRow className='table-entry'>
            <WCol size="1">
                <div className="table-text">
                    <WButton> X </WButton>
                </div> 
            </WCol>
                
            
            <WCol size="2" >
                <div className="table-text" onClick={handleSpreadSheet}>
                    {data.name}
                </div>   
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
                        {data.landmark[0]+",..."}
                    </div>
                }
            </WCol>
        </WRow>
    )
}

export default SpreadEntry;