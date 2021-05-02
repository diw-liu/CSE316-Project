import React from 'react';

const Logo = (props) => {
    return (
        <div className='logo' onClick={()=>props.logoClick()}>
            The World Mapper
        </div>
    );
};

export default Logo;