import React, { useState }             from 'react';
import { WRow, WCol, WButton, WInput } from 'wt-frontend';


const ViewerEntry = (props) =>{
    const [nameFlag,toggleName] = useState(false);

    const handleRemoveLandmark = async (e) =>{
        props.removeLandmark(props._id, props.data.name)
    }
    const handleEditName = async (e) =>{
        props.editLandmark(props._id, props.data.name,e.target.value)
        toggleName(false)
    }
    
    return(
        <WRow className="table-entry">
            <WCol size="11">
                {   
                    props.delete ?
                        nameFlag ? <WInput className="list-item-edit" onBlur={handleEditName}
                                    autoFocus={true} defaultValue={props.data.name} type='text'
                                    inputClass="list-item-edit-input"/>
                                :
                                    <div className='list-text' onClick={()=>toggleName(true)}>
                                        {props.data.name}
                                    </div> 
                        :
                        <div className='list-text'>
                            {props.data.name}
                        </div>
                }
               
            </WCol>
            <WCol size="1"  className="table-entry-buttons">
                <div className='button-group'>
                    {   props.delete ?
                        <WButton className="table-entry-buttons"  onClick={handleRemoveLandmark} wType="texted">
                            X 
                        </WButton>
                        :
                        <div></div>

                    }
                </div>
            </WCol>
        </WRow>
       
    )
}
export default ViewerEntry;