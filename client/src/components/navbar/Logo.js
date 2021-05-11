import React from 'react';

const Logo = (props) => {
    const handleClick = () =>{
        props.handleSetActive({});
        props.toggleViewer('');
    }
    return (
        <div className='logo' onClick={handleClick}>
            The World Mapper
        </div>
    );
};

export default Logo;