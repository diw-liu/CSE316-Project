import React, { useEffect, useState }   from 'react';
import { GET_LANDMARK} 					from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WLayout, WLHeader, WLMain, WLFooter, WInput, WButton, WRow, WCol } from 'wt-frontend';
import ViewerEntry                      from './ViewerEntry'
import {UpdateLandmark_Transaction,
    EditLandmark_Transaction} 			from '../../utils/jsTPS';
// const useFetch = (id) =>{
//     console.log(id)
//     const [entries, setEntries] = useState(null);

//     const { loading, error, data, refetch } = useQuery(GET_LANDMARK, { variables: { _id : id } } );
//     if(loading) { console.log(loading, 'loading');  }
//     if(error) { console.log(error, 'error'); }
//     if(data) { 
//         console.log(data.getLandmark)
//         setEntries(data.getLandmark);
//     }
//     useEffect(async ()=>{
//         refetch()
//     }, [])

//     return { entries };
// }
const ViewerTable = (props) =>{
    // console.log(props.data)
    let entries
    // console.log(entries);
    const [landmark, changeLandmark] = useState("Enter Landmark Here");
    // console.log(props.data._id)
    // onst  entries  = useFetch(props.data._id)c
    // console.log(useFetch(props.data._id));
    const { loading, error, data, refetch } = useQuery(GET_LANDMARK, { variables: { _id : props.data._id } } );
    
    if(loading) { console.log(loading, 'loading');  }
	if(error) { console.log(error, 'error'); }
	if(data) { 
        entries = data.getLandmark;
    }

    useEffect(()=>{
        refetch();
    },[props.viewer])


    const landMarkmutationOptions = {
		refetchQueries: [{ query: GET_LANDMARK, variables: { _id: props.data._id }}], 
		awaitRefetchQueries: true,
	}

    const [AddLandmark]             = useMutation(mutations.ADD_LANDMARK, landMarkmutationOptions);
    const [RemoveLandmark]          = useMutation(mutations.REMOVE_LANDMARK, landMarkmutationOptions);
    const [EditLandmark]            = useMutation(mutations.EDIT_LANDMARK, landMarkmutationOptions);

    const addLandmark = async (_id, text) =>{
		let transaction = new UpdateLandmark_Transaction(_id, text, AddLandmark, RemoveLandmark, 1)
		props.tps.addTransaction(transaction);
		props.tpsRedo();
	}
	const removeLandmark = async (_id, text) =>{
        let transaction = new UpdateLandmark_Transaction(_id, text, AddLandmark, RemoveLandmark, 0)
		props.tps.addTransaction(transaction);
		props.tpsRedo();
    }
	const editLandmark = async (_id, prevText, targetText) =>{
		let transaction = new EditLandmark_Transaction(_id, prevText, targetText, EditLandmark)
		props.tps.addTransaction(transaction);
		props.tpsRedo();
	}

    const handleChange = async (e) =>{
        changeLandmark(e.target.value);
    }

    const handleAddLandmark = async (e) =>{
        e.preventDefault();
        addLandmark(props.data._id, landmark)
        changeLandmark("Enter Landmark Here");
    }

    return(
        <WLayout wLayout="header-footer">
            <WLHeader className="table-header-section">
                Region Landmarks
            </WLHeader>
            
            <WLMain className="table-entries" style={{ height: "75vh" }}>
            {   
                entries !== undefined && entries.length > 0 ?
                <div>
                    {
                        entries.map((entry,index) =>(
                            <ViewerEntry 
                                data={entry} index={index} _id={props.data._id }
                                delete={entry.region == props.data._id ? true : false}
                                removeLandmark={removeLandmark} editLandmark={editLandmark}
                            />
                        ))
                    }
                </div>
                :<div className="table-entry">Nothing here</div>  
            }
            </WLMain>
        
            <WLFooter>
                <form onSubmit={handleAddLandmark}  >
                    <WRow>
                        <WCol size="1">
                            <WButton 
                                className='home-button' style={{width:"100%",height:"100%",display:"block",backgroundColor: "#f13564"}} 
                                type='submit' value="Submit"> + </WButton>
                        </WCol>
                        <WCol size="11">
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