import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            // props.handleSetActive({})
            let reset = await client.resetStore();
            if (reset) props.handleSetActive({});
        }
    };

    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowUpdate} wType="texted" hoverAnimation="text-primary">
                    {props.user.name}
                </WButton>
            </WNavItem >
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                    Logout
                </WButton>
            </WNavItem >
        </>
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
                    Sign Up 
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate}  />
                : <LoggedIn fetchUser={props.fetchUser} logout={props.logout} setShowUpdate={props.setShowUpdate} 
                    user={props.user} handleSetActive={props.handleSetActive}/>
            }
        </>

    );
};

export default NavbarOptions;