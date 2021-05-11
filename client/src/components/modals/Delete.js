import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
;

const Delete = (props) =>{
    console.log(props.showDelete)
    
    const [loading, toggleLoading] = useState(false);
    
    const handleDeleteSubregion = async (e) =>{   
        props.removeMapList(props.showDelete);
        props.setShowDelete("")
    }

    return(
        <WModal className="signup-modal"  cover="true" visible={props.setShowDelete}>
            <WMHeader  className="modal-header" onClose={() => props.setShowDelete("")}>
                Are you sure?
            </WMHeader>

            { loading ? <div/>
                : <WMMain>
                        <div>
                            Not only would that region
                            be deleted but all of that subregion’s descendants as well.
                        </div>
                  </WMMain>
            }

            <WMFooter>
				<WRow>
					<WCol size='4'> 
						<WButton className="modal-button" onClick={handleDeleteSubregion} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
							Confirm
						</WButton>
					</WCol>
					<WCol size="4"></WCol>
					<WCol size='4'> 
						<WButton className="modal-button" onClick={() => props.setShowDelete("")} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
							Cancel
						</WButton>
					</WCol>
				</WRow>
			</WMFooter>      
        </WModal>
    )
}
export default Delete;