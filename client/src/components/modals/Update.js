import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
;

const Update = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name:''});
	const [loading, toggleLoading] = useState(false);
    const [Update] = useMutation(UPDATE);
	const user = props.user

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Update({ variables: { ...input, _id: props.user._id } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.update.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.setShowUpdate(false);

		};
	};

	return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowUpdate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Update Account
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
                            <div className="modal-spacer">&nbsp;</div>
							<WRow>
								<WCol size="3">
									<div className="table_header-section cancel-button">Name :</div>
								</WCol>
								<WCol size="9">
									<WInput 
										className="modal-input inline " onBlur={updateInput} name="name"
										barAnimation="solid" placeholderText={user.name} wType="outlined" inputType="text" 
									/>
								</WCol>
							</WRow>
								
								
	
							<div className="modal-spacer">&nbsp;</div>
							<WRow>
								<WCol size="3">
									<div className="table_header-section cancel-button">Email :</div>
								</WCol>
								<WCol size="9">
									<WInput 
										className="modal-input inline" onBlur={updateInput} name="email"  
										barAnimation="solid" placeholderText={user.email} wType="outlined" inputType="text" 
									/>
								</WCol>
							</WRow>


							<div className="modal-spacer">&nbsp;</div>
							<WRow>
								<WCol size="3">
									<div className="table_header-section cancel-button">Password :</div>
								</WCol>
								<WCol size="9">
									<WInput 
										className="modal-input " onBlur={updateInput} name="password" 
										barAnimation="solid" placeholderText="***********s" wType="outlined" inputType="password" 
									/>
								</WCol>
							</WRow>	
							
								

						</WMMain>
			}
			<WMFooter>
				<WRow>
					<WCol size='4'> 
						<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
							Update
						</WButton>
					</WCol>
					<WCol size="4"></WCol>
					<WCol size='4'> 
						<WButton className="modal-button" onClick={() => props.setShowUpdate(false)} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
							Cancel
						</WButton>
					</WCol>
				</WRow>
			</WMFooter>
			
		</WModal>
	);
}

export default Update;
