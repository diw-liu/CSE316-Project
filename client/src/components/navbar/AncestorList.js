import React from 'react';

import { WRow, WCol, WNavItem } 			from 'wt-frontend';
const AncestorList = (props) => {
    const clickedList = props.status.clickedMap;

    const handleClickAn = async (e) =>{
        // Get elements till target index
        props.toggleViewer("");
        props.handleSetActive(clickedList[e.target.getAttribute("value")]._id, e.target.getAttribute("value"))
    }

    return(
        <>
            <WRow>
                <WCol size="4">
                    <WNavItem hoverAnimation="lighten">
                        {
                            clickedList.length > 2 
                            ?<div className="navbar-options" onClick={handleClickAn} value={clickedList.length-3}>{clickedList[clickedList.length-3].name+">"}</div>
                            :<div></div>
                        }  
                    </WNavItem>
                </WCol>
                <WCol size="4">
                    <WNavItem hoverAnimation="lighten">
                        {
                            clickedList.length > 1 
                            ?<div className="navbar-options" onClick={handleClickAn} value={clickedList.length-2}>{clickedList[clickedList.length-2].name+">"}</div>
                            :<div></div>
                        }    
                    </WNavItem>  
                </WCol>
                <WCol size="4">
                    <WNavItem hoverAnimation="lighten">
                        {
                            clickedList.length > 0 
                            ?<div className="navbar-options" onClick={handleClickAn} value={clickedList.length-1}>{clickedList[clickedList.length-1].name}</div>
                            :<div></div>
                        }
                    </WNavItem>
                </WCol>
            </WRow>
           
                     
           
        </> 
    )
};

export default AncestorList;