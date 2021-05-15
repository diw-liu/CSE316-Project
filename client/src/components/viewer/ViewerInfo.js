import React            from 'react';
import {  WLHeader, WButton, WLMain, WRow, WCol, WLayout, WLFooter } from 'wt-frontend';
import unav from './unavailable_pic.png';

const ViewerInfo = (props) =>{
    const disabledClick = () => {};
    console.log(props.disabled);
    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const buttonOptions = props.activeid ? {shape:"rounded" } : {clickAnimation:"ripple-light" , shape:"rounded", color:"primary"};

    const undoOptions = {
        className: props.disabled || !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: props.disabled || !props.canUndo  ? disabledClick : props.undo,
        wType: "texted", 
        clickAnimation: props.disabled || !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: props.disabled || !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: props.disabled || !props.canRedo   ? disabledClick : props.redo, 
        wType: "texted", 
        clickAnimation: props.disabled || !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    const data = props.data;

    const handleParent = async (e) =>{
        props.handleSetActive(data.parent, -2);
        props.toggleViewer('');
    } 
    return(
        <WLayout WLayout="header-footer" > 
             <WLHeader className="table-header">
                <WRow>
                    <WCol size="1">
                        <div className='button-group'>
                            <WButton  className={`${buttonStyle} sidebar-buttons`}  {...undoOptions}>
                                    <i className="material-icons">undo</i>
                            </WButton>

                            <WButton  className={`${buttonStyle} sidebar-buttons`}  {...redoOptions}>
                                    <i className="material-icons">redo</i>
                            </WButton>
                        </div>
                    </WCol>
                </WRow>  
            </WLHeader>
            {/* //style={{padding:"6% 6%"}} */}
            <WLMain className=" center" >
                <div>
                    <img src={unav} alt="unavailable" style={{width:"80%",height:"20%",display:"block",backgroundColor: "#f13564"}}  />
                </div>
            </WLMain>
            <WLFooter>
                <div className='container-primary'>
                    <div className='table-entry'> Region Name: {data.name} </div>
                    <WRow className='table-entry'>
                        <WCol>
                            Parent Region: 
                        </WCol>
                        <WCol onClick={handleParent} style={{color:"#8ed4f8"}}>
                            {props.viewer} 
                        </WCol>
                        <WCol className="table-entry-buttons">
                            <WButton className="table-entry-buttons" onClick={props.setShowParent} wType="texted">
                                <i className="material-icons">drive_file_rename_outline</i>
                            </WButton>
                        </WCol>
                    </WRow>
                    <div className='table-entry'> Region Capital: {data.capital} </div>
                    <div className='table-entry'> Region Leader: {data.leader} </div>
                    <div className='table-entry'> # Of Sub Region: {data.child.length} </div>
                </div>
            </WLFooter>
        </WLayout>
    )
}

export default ViewerInfo;