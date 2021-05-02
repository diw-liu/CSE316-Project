import React            from 'react';
import {  WLHeader, WButton, WLMain, WRow, WCol, WLayout, WLFooter } from 'wt-frontend';

const ViewerInfo = (props) =>{
    const data = props.data;

    const handleParent = async (e) =>{
        props.handleSetActive(data.parent);
        props.toggleViewer('');
    } 
    console.log(data)
    return(
        <WLayout WLayout="header-footer" > 
            <WLHeader>
                <div className='button-group'>
                    <WButton>
                            <i className="material-icons">undo</i>
                    </WButton>

                    <WButton >
                            <i className="material-icons">redo</i>
                    </WButton>
                </div>
            </WLHeader>
            <WLMain>
                <div style={{ width: "50%", height: "50%" }}>PlaceHolder</div>
            </WLMain>
            <WLFooter style={{backgroundColor: "#f13564"}}>
                <div className=' table-entries container-primary'>
                    <div className='table-entry'> Region Name: {data.name} </div>
                    <div className='table-entry'> Parent Region: 
                        <div onClick={handleParent}>
                            {props.viewer} 
                        </div>
                    </div>
                    <div className='table-entry'> Region Capital: {data.capital} </div>
                    <div className='table-entry'> Region Leader: {data.leader} </div>
                    <div className='table-entry'> # Of Sub Region: {data.child.length} </div>
                </div>
            </WLFooter>
        </WLayout>
    )
}

export default ViewerInfo;