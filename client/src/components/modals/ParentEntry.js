import React, { useState } 	from 'react';

const ParentEntry = (props) =>{
    const handleSelectList = async (e) =>{
        props.setlist(props.data);
    }
    return(
        <div className="table-entry" onClick={handleSelectList}>
            {props.data.name}
        </div>
    )
}
export default ParentEntry