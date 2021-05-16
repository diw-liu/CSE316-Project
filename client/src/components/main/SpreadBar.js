import React            from 'react';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadBar = (props) =>{
    
    return(
        <WRow className="table-header" style={{ backgroundColor: "#AD0E0E" }}>
            <WCol size="1"> </WCol>
            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={() =>props.sortMapList(props.activeList._id, 'name')}> Name </WButton>
            </WCol>
            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={() =>props.sortMapList(props.activeList._id, 'capital')}> Capital </WButton>
            </WCol>
            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={() =>props.sortMapList(props.activeList._id, 'leader')}> Leader </WButton>
            </WCol>
            <WCol size="2">
                <WButton className='table-header-section' wType="texted" > Flag </WButton>
            </WCol>
            <WCol size="3">
                <WButton className='table-header-section' wType="texted" > Landmarks </WButton>
            </WCol>
        </WRow>
    )
}

export default SpreadBar;