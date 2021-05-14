import React            from 'react';
import {  WLHeader, WButton, WLMain, WRow, WCol, WLayout, WLFooter } from 'wt-frontend';
import unav from './unavailable_pic.png';

const ViewerInfo = (props) =>{
    const data = props.data;

    const handleParent = async (e) =>{
        props.handleSetActive(data.parent);
        props.toggleViewer('');
    } 
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
            <WLMain className=" center" >
                <div>
                    <img src={unav} alt="unavailable" style={{width:"100%",height:"100%",display:"block",backgroundColor: "#f13564"}}  />
                </div>
            </WLMain>
            <WLFooter>
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