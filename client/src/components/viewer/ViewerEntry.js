import React            from 'react';
import { WRow, WCol, WButton, WInput } from 'wt-frontend';


const ViewerEntry = (props) =>{
    return(
        <WRow className='table-entry'>
            <WCol size="1">
                {
                    props.data.current ? 
                    <div className='button-group'>
                        <WButton className="table-entry-buttons" wType="texted">
                            X 
                        </WButton>
                    </div>
                    :
                    <div></div>
                }
            </WCol>
            <WCol size="11">
                <div>
                    {props.data.landmark}
                </div>
            </WCol>
        </WRow>
    )
}
export default ViewerEntry;