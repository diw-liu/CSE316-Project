import React, { useState } 	from 'react';
import ParentEntry          from './ParentEntry'
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
const ChangeParent = (props) =>{
  
    const [list, setlist] = useState({});

    const parent = Object.entries(list).length !== 0 ? list._id : "Home"
    const displayRegion = props.totalMap.filter(map => map.parent == parent);

    const handleGoBack = async (e) =>{
        console.log("cakk");
        console.log(list)
        const temp =list.parent == "Home" ? {} : props.totalMap.filter(map => map._id == list.parent )[0]
        setlist(temp);
    }
    const handleAdd = async (e) =>{
        props.changeParent(list)
        props.setShowParent(false)
    }
    
    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    
    const disabledClick = () => {};

    const undoOptions = {
        className: parent=="Home" ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: parent=="Home"  ? disabledClick : handleGoBack,
        wType: "texted", 
        clickAnimation: parent=="Home" ? "" : "ripple-light",  
        shape: "rounded"
    }
    
    // const selectList = async (target) =>{
    //     console.log(target);
    //     setlist(target)
    // }
    return(
        <WModal className="signup-modal"  cover="true" visible={props.setShowParent}>
            <WMHeader  className="modal-header" onClose={() => props.setShowParent(false)}>
                    <WRow>
                        <WCol size="8">
                            Change Parent
                        </WCol>
                        <WCol size="4">
                            <WButton  className={`${buttonStyle} sidebar-buttons`}  {...undoOptions} >
                                <i className="material-icons">undo</i>
                            </WButton>
                        </WCol>
                    </WRow>
			</WMHeader>
            <WMMain style={{ width: "900px", height: "600px" }} className="table-entries">    
                {
                    displayRegion !== undefined && displayRegion.length > 0 ?
                    <div className="center" >
                        {
                            displayRegion.slice(0).reverse().map((region,index) =>(
                                <ParentEntry
                                    data={region} setlist={setlist}
                                /> 
                            ))
                        }
                    </div>
                    :<div>Nothing here</div>
                }
            </WMMain>
            <WMFooter>
                <WRow>
					<WCol size='4'> 
						<WButton className="modal-button" onClick={handleAdd}  span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
							Add 
						</WButton>
					</WCol>
					<WCol size="4"></WCol>
					<WCol size='4'> 
						<WButton className="modal-button" onClick={() => props.setShowParent(false)} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
							Cancel
						</WButton>
					</WCol>
				</WRow>
            </WMFooter>
        </WModal>
    )
}
export default ChangeParent;