import React, { useState }              from 'react';
import { GET_LANDMARK} 					from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WLayout, WLHeader, WLMain, WLFooter, WInput, WButton, WRow, WCol } from 'wt-frontend';
import ViewerEntry                      from './ViewerEntry'

const ViewerTable = (props) =>{
    // console.log(props.data)
    let entries

    const [landmark, changeLandmark] = useState("Enter Landmark Here");
    
    const { loading, error, data, refetch } = useQuery(GET_LANDMARK, { variables: { _id : props.data._id } } );
    
    if(loading) { console.log(loading, 'loading');  }
	if(error) { console.log(error, 'error'); }
	if(data) { 
        // console.log(data);
        entries = data.getLandmark;
    }

    // console.log(entries);


    const landMarkmutationOptions = {
		refetchQueries: [{ query: GET_LANDMARK, variables: { _id: props.data._id } }], 
		awaitRefetchQueries: true,
	}

    const [AddLandmark]             = useMutation(mutations.ADD_LANDMARK, landMarkmutationOptions);
    const [RemoveLandmark]          = useMutation(mutations.REMOVE_LANDMARK, landMarkmutationOptions);
    const [EditLandmark]          = useMutation(mutations.EDIT_LANDMARK, landMarkmutationOptions);

    const addLandmark = async (e) =>{
        e.preventDefault();
        // console.log("handle alm");
        const { data } = await AddLandmark({ variables:{_id: props.data._id, text: landmark}});
        changeLandmark("Enter Landmark Here");
    }

    const handleChange = async (e) =>{
        changeLandmark(e.target.value);
    }

    const removeLandmark = async (text) =>{
        // console.log("Atleast we are here")
        // console.log(props.data._id);
        const {data} = await RemoveLandmark({ variables:{ _id: props.data._id, text: text}});
    }
    const editLandmark = async (prevText, targetText) =>{
        const {data} = await EditLandmark({variables:{_id: props.data._id, prevText: prevText, targetText:targetText}})
    }

    return(
        <WLayout wLayout="header-footer">
            <WLHeader>
                Region Landmarks
            </WLHeader>
            
            <WLMain>
            {   
                entries !== undefined && entries.length > 0 ?
                <div className=' table-entries container-primary'>
                    {
                        entries.map((entry,index) =>(
                            <ViewerEntry 
                                data={entry} index={index}
                                delete={entry.region == props.data._id ? true : false}
                                removeLandmark={removeLandmark} editLandmark={editLandmark}
                            />
                        ))
                    }
                </div>
                :<div>Nothing here</div>  
            }
            </WLMain>
        
            <WLFooter>
                <form onSubmit={addLandmark}>
                    <WRow>
                        <WCol size="1">
                            <WButton 
                                className='home-button' style={{width:"100%",height:"100%",display:"block",backgroundColor: "#f13564"}} 
                                type='submit' value="Submit"> + </WButton>
                        </WCol>
                        <WCol size="8">
                            <WInput
                                className="table-input" id="landmarkInput"
                                autoFocus={true} onChange={handleChange}
                                value={landmark} type='text'
                                inputClass="table-input-class"
                            />
                        </WCol>
                    </WRow>
                </form>
            </WLFooter>
        </WLayout>
        
    )
}
export default ViewerTable;