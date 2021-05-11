import React from 'react';

import { WRow, WCol, WNavItem } 			from 'wt-frontend';
const AncestorList = (props) => {
    const clickedList = props.clickedMap;

    const handleClickAn = async (e) =>{
        // Get elements till target index
        props.handleSetActive(clickedList[e.target.value]._id, e.target.value);
    }

    return(
        <div>
             {
                clickedList.length > 2 
                ?<WNavItem onClick={handleClickAn} value={clickedList.length-3}>{clickedList[clickedList.length-3].name+">"}</WNavItem>
                :<div></div>
            }   

            {
                clickedList.length > 1 
                ?<WNavItem onClick={handleClickAn} value={clickedList.length-2}>{clickedList[clickedList.length-2].name+">"}</WNavItem>
                :<div></div>
            }    

            {
                clickedList.length > 0 
                ?<WNavItem onClick={handleClickAn} value={clickedList.length-1}>{clickedList[clickedList.length-1].name}</WNavItem>
                :<div></div>
            }
        </div>
    )
};

export default AncestorList;