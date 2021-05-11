import React, { useState }                       from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const HomeEntry = (props) =>{

    const [renamingMap, toggleMap] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    
    const handleDeleteMap = async (e) =>{
        console.log(props.data)
        props.setShowDelete(props.data._id)
    } 

    const handleEditing = async (e) =>{
        e.stopPropagation();
        setPreEdit(props.name);
        toggleMap(!renamingMap);
    }
    
    const handleRename = async (e) =>{
        handleEditing(e);
        props.updateMapList(props.data._id, "name", e.target.value, false)
    }

    const handleSpreadSheet = async (e) =>{
        console.log(props.data);
        props.handleSetActive(props.data._id);
    }

    return(
        <WRow className="table-entry">
            <WCol size="11" >
                {
                    renamingMap ? <WInput className="list-item-edit" onBlur={handleRename}
                                    autoFocus={true} defaultValue={props.data.name} type='text'
                                    inputClass="list-item-edit-input"/>
                                : <div className='list-text' onClick={handleSpreadSheet}>
                                     {props.data.name} 
                                  </div>
                }
        
            </WCol>
            <WCol size="1" className="table-entry-buttons">
                <div className='button-group'>
                    <WButton className="table-entry-buttons" onClick={handleDeleteMap} wType="texted">
                        X 
                    </WButton>

                    <WButton className="table-entry-buttons" onClick={handleEditing} wType="texted">
                        <i className="material-icons">drive_file_rename_outline</i>
                    </WButton>
                </div>
            </WCol>
        </WRow>
    )
}
export default HomeEntry;