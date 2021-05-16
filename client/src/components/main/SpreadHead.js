import React            from 'react';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadHead = (props) =>{
    const name = props.activeList.name;
    const disabledClick = () => {};

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
    
    const handleCreateList =  async (e) =>{
        props.addMapList("Untitled", props.activeList._id)
    }
   


    return(
        <WRow className="table-header">
            <WCol size="1">
                <div className='button-group'>
                    <WButton className={`${buttonStyle} sidebar-buttons`} onClick={props.activeid ? disabledClick : handleCreateList} {...buttonOptions}>
                        <i className="material-icons">add</i>
                    </WButton>

                    <WButton  className={`${buttonStyle} sidebar-buttons`}  {...undoOptions}>
                            <i className="material-icons">undo</i>
                    </WButton>

                    <WButton  className={`${buttonStyle} sidebar-buttons`}  {...redoOptions}>
                            <i className="material-icons">redo</i>
                    </WButton>
                </div>
            </WCol>
            <WCol size="10">
                <div className='table-header-section'>
                    <div>Region Name: </div>
                    <div>{name}</div> 
                </div>
            </WCol>
        </WRow>
    )
}

export default SpreadHead;