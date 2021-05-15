import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import Arrows							from '../navbar/Arrows'
import AncestorList						from '../navbar/AncestorList'

import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import Update 							from '../modals/Update';
import CreateAccount 					from '../modals/CreateAccount';
import Parent							from '../modals/Parent';

import ViewerContent					from '../viewer/ViewerContent';
import HomePage							from '../homepage/HomePage';
import MainContents 					from '../main/MainContents';
import SpreadSheet						from '../main/SpreadSheet'
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAP} 		from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WNavItem } 			from 'wt-frontend';
import { WLayout, WLHeader, WLMain }	from 'wt-frontend';
import { UpdateRegions_Transaction,
	UpdateField_Transaction,
	SortRegion_Transaction,
	ChangeParent_Transaction} 		from '../../utils/jsTPS';

const Homescreen = (props) => {

	const keyCombination = (e, callback) => {
		console.log(e.code);
		console.log(editing)
		if(e.key === 'z' && e.ctrlKey) {
			if(props.tps.hasTransactionToUndo()) {
				tpsUndo();
			}
		}
		else if (e.key === 'y' && e.ctrlKey) { 
			if(props.tps.hasTransactionToRedo()) {
				tpsRedo();
			}
		}
		else if (editing.index!=-1||editing.field!=""){
			console.log("Yes")
			if(e.code === "ArrowDown"){
				setEditing({
					index:editing.index+1,
					field:editing.field,
				});
			}else if(e.code === "ArrowUp"){
				setEditing({
					index:editing.index-1,
					field:editing.field,
				})
			}else if(e.code === "ArrowLeft"){
				if(editing.field=="Capital"){
					setEditing({
						index:editing.index,
						field:"Name",
					})
				}else if(editing.field=="Leader"){
					setEditing({
						index:editing.index,
						field:"Capital",
					})
				}
			}else if(e.code === "ArrowRight"){
				if(editing.field=="Name"){
					setEditing({
						index:editing.index,
						field:"Capital",
					})
				}else if(editing.field=="Capital"){
					setEditing({
						index:editing.index,
						field:"Leader",
					})
				}
			}else if(e.code === "Enter"){
				setEditing({
					index:-1,
					field:""
				})
			}
		}
	}

	const mouseCheck = (e, callback) =>{
		if(e.target.getAttribute("class")!="table-text"){
			setEditing({
				index:-1,
				field:""
			})
		}
	}
	
	document.onkeydown = keyCombination;
	document.onmousedown = mouseCheck;
	const auth = props.user === null ? false : true;

	let totalMap = [];
	let homeMap = [];
	let subMap = [];

	const [editing, setEditing]				= useState({ index:-1, field:''});
	const [status, setStatus] 				= useState({ activeList:{}, clickedMap:[]});
	const [viewer, toggleViewer]			= useState('');
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);
	const [showDelete, toggleShowDelete]	= useState("");
	const [showParent, toggleParent]		= useState(false);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_MAP);
	
	if(loading) { console.log(loading, 'loading');  }
	if(error) { console.log(error, 'error'); }
	if(data) { 
			for(let map of data.getHomeMapList) {
				if(map.parent=="Home") homeMap.push(map);
				totalMap.push(map)
			}
			if(Object.entries(status.activeList).length !== 0 ){
				let tempID = status.activeList._id;
				let list = totalMap.find(list => list._id === tempID);
				if(list !== undefined && list.child !== undefined) {
					list.child.forEach((region1) => {
						totalMap.forEach((region2) =>{
							if (region1 == region2._id){
								subMap.push(region2)
							}})
						}
					)
				} 
			}
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAP }], 
		awaitRefetchQueries: true,
	}

	const [AddMapList]				= useMutation(mutations.ADD_MAP_LIST, mutationOptions);
	const [RemoveMapList]			= useMutation(mutations.REMOVE_MAP_LIST, mutationOptions);
	const [UpdateMapList]			= useMutation(mutations.UPDATE_MAP_LIST, mutationOptions);
	
	const [SortMapList]				= useMutation(mutations.SORT_MAP_LIST, mutationOptions);
	const [ChangeParent]			= useMutation(mutations.CHANGE_PARENT, mutationOptions)

	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}
	const addMapList = async (name, parent) =>{
		let region = {
			_id: '',
			owner: props.user._id,
			parent: parent,
			name: name,
			capital: 'Unknown',
			leader: 'Unknown',
			sortDirection: 1,
			landmarks: [],
			child: []
		}
		const regionID = region._id;
		const opcode = 1
		let transaction = new UpdateRegions_Transaction(regionID, opcode, AddMapList, RemoveMapList, region)
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const removeMapList = async (_id) =>{
		const regionID = _id;
		const opcode = 0
		let transaction = new UpdateRegions_Transaction(regionID, opcode, AddMapList, RemoveMapList)
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const updateMapList = async (_id, field, prevValue, curValue) =>{
		let transaction = new UpdateField_Transaction(_id, field, prevValue, curValue, UpdateMapList)
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const sortMapList = async (_id, field) =>{
		let transaction = new SortRegion_Transaction(_id, field, SortMapList)
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const changeParent = async (updateParent) =>{
		console.log(status.activeList);
		console.log(updateParent);
		const prevParent = status.activeList.parent;
		const updaParent =  Object.entries(updateParent).length !== 0 ? updateParent._id : "Home"
		const childID = status.activeList._id;
		console.log(prevParent)
		console.log(updaParent)
		console.log(childID)
		let transaction = new ChangeParent_Transaction(childID, prevParent, updaParent, ChangeParent)
		props.tps.addTransaction(transaction);
		tpsRedo();
	}
	const setShowLogin = () => {
		toggleShowDelete("");
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleParent(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete("");
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleParent(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = (_id) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleParent(false);
		toggleShowDelete(_id)
	};

	const setShowUpdate = () => {
		toggleShowDelete("");
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleParent(false);
		toggleShowUpdate(!showUpdate)
	};

	const setShowParent = () =>{
		toggleShowDelete("");
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false)
		toggleParent(!showParent);
	}
	const handleSetActive = (id, index) =>{
		props.tps.clearAllTransactions()
		if(Object.entries(id).length == 0){
			setStatus({
				activeList:{}, 
				clickedMap:[],
			})
		}else{
			const data = totalMap.find(list => list._id === id);
			console.log("bf"+id)

			let temp=status.clickedMap
			if(index >= 0 ) temp=temp.slice(0,index);
			
			if(index == -1) temp=temp.slice(0,-1);

			if(index == -2) temp=temp.slice(0,temp.length-2)
			temp.push(data);

			setStatus({
				activeList:data,
				clickedMap:temp,
			})

			refetch();		
		}
	}
	
	return (
		<WLayout wLayout="header">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' handleSetActive={handleSetActive} toggleViewer={toggleViewer}/>
						</WNavItem>
						<AncestorList  status={status}  handleSetActive={handleSetActive}
							toggleViewer={toggleViewer} />
					</ul>
					<ul>
						<Arrows viewer={viewer} status={status} totalMap={totalMap}
							handleSetActive={handleSetActive} setStatus={setStatus}/>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch} 			handleSetActive={handleSetActive}
							setShowUpdate={setShowUpdate}	user={props.user}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
			
			<WLMain>
				{	// If there's activelist => spreadsheet, else home page
					auth ? 
						Object.entries(status.activeList).length !== 0 ?
							viewer.length>0 ?
								<div className="container-secondary" style={{padding:"1% 3% 3% 3%"}}>
									<ViewerContent activeList={status.activeList} viewer={viewer}
										handleSetActive={handleSetActive} toggleViewer={toggleViewer}
										setShowParent={setShowParent} tps={props.tps}
										canUndo={canUndo} canRedo={canRedo} 
										tpsUndo={tpsUndo} tpsRedo={tpsRedo}
										disabled={props.tps.getSize()==0 ? true : false}
									/>
								
								</div>
								:
								<div className="container-secondary center" style={{padding:"1% 3% 3% 3%"}}>
									<SpreadSheet activeList={status.activeList} subMap={subMap} editing={editing} setEditing={setEditing}
										canUndo={canUndo} canRedo={canRedo} tpsUndo={tpsUndo} tpsRedo={tpsRedo}
										toggleViewer={toggleViewer}  setShowDelete={setShowDelete} handleSetActive={handleSetActive} 
										addMapList={addMapList} updateMapList={updateMapList} sortMapList={sortMapList} 	
										disabled={props.tps.getSize()==0 ? true : false}
									/>
								</div>
							:
							<div className="container-secondary">
								<div className=" center" >
									<HomePage  maplists={homeMap} activeList={status.activeList} setShowDelete={setShowDelete} handleSetActive={handleSetActive} 	  
										removeMapList={removeMapList} updateMapList={updateMapList} addMapList={addMapList}
									/>
								</div>	
							</div>
						:
						<div className="container-secondary" >
							<div className="center" >
								<h1>Welcome to the World Mapper</h1>
							</div>		
						</div>	
				}

			</WLMain> 

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser}  reloadMap={refetch} setShowLogin={setShowLogin} />)
			}
			{
				showUpdate && (<Update fetchUser={props.fetchUser}  setShowUpdate={setShowUpdate} user={props.user} />)
			}
			{
				showDelete && (<Delete showDelete={showDelete} setShowDelete={setShowDelete} removeMapList={removeMapList}/>)
			}
			{
				showParent && (<Parent showDelete={showDelete} setShowParent={setShowParent} changeParent={changeParent} totalMap={totalMap}/>)
			}

		</WLayout>
	);
};

export default Homescreen;