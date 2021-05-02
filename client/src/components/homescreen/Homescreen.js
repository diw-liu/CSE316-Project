import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
// import Delete 							from '../modals/Delete';
import ViewerContent					from '../viewer/ViewerContent';
import SpreadSheet						from '../main/SpreadSheet'
import HomePage							from '../homepage/HomePage';
import MainContents 					from '../main/MainContents';
import CreateAccount 					from '../modals/CreateAccount';
import Update 							from '../modals/Update';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import SidebarContents 					from '../sidebar/SidebarContents';
import { GET_DB_MAP} 		from '../../cache/queries';
import React, { Children, useEffect, useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateListField_Transaction, 
	SortItems_Transaction,
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction } 				from '../../utils/jsTPS';

const Homescreen = (props) => {

	const keyCombination = (e, callback) => {
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
	}
	document.onkeydown = keyCombination;

	const auth = props.user === null ? false : true;
	let todolists 	= [];

	let totalMap = [];
	let homeMap = [];
	let subMap = [];

	let SidebarData = [];
	const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc

	const [activeList, setActiveList] 		= useState({});
	const [viewer, toggleViewer]			= useState('');
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);

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

			if(Object.entries(activeList).length !== 0 ){
				let tempID = activeList._id;
				let list = totalMap.find(list => list._id === tempID);

				if(list._id && list.child !== undefined) {
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
	// 	// Assign todolists 
	// 	// console.log(data.getHomeMapList)
	// 	for(let map of data.getHomeMapList) {
	// 		if(map.parent=="Home") homeMap.push(map);
	// 		totalMap.push(map)
	// 	}
		
	// 	// console.log(maplists)
	// 	// if a list is selected, shift it to front of todolists
	// 	// if(activeList._id) {
	// 	// 	let selectedListIndex = todolists.findIndex(entry => entry._id === activeList._id);
	// 	// 	let removed = todolists.splice(selectedListIndex, 1);
	// 	// 	todolists.unshift(removed[0]);
	// 	// }
	// 	// create data for sidebar links
	// 	if(activeList._id) {
	// 		if (activeList.child !== undefined){
	// 			activeList.child.forEach((region1) => {
	// 				totalMap.forEach((region2) =>{
	// 					if (region1 == region2._id)
	// 						subMap.push(region2)
	// 					})
	// 				}
	// 			)
	// 		}
	// 	}
	// 	console.log(totalMap);
	// 	console.log(subMap);
	// }


	
	// NOTE: might not need to be async
	// const reloadList = () => {
	// 	if (activeList._id) {
	// 		refetch();
	// 		console.log('heeadad');
	// 		let tempID = activeList._id;
	// 		console.log(totalMap);
	// 		let list = totalMap.find(list => list._id === tempID);
	// 		console.log(list);
	// 		setActiveList(list);
	// 		// refetch();
	// 	}
	// }

	const loadTodoList = (list) => {
		// props.tps.clearAllTransactions();
		// setCanUndo(props.tps.hasTransactionToUndo());
		// setCanRedo(props.tps.hasTransactionToRedo());
		setActiveList(list);
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAP }], 
		awaitRefetchQueries: true,
		// onCompleted: () => reloadList()
	}

	const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
	const [sortTodoItems] 		    = useMutation(mutations.SORT_ITEMS, mutationOptions);
	const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);
	const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD, mutationOptions);
	const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
	const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM, mutationOptions);
	const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);
	const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);

	const [AddMapList]				= useMutation(mutations.ADD_MAP_LIST);
	const [RemoveMapList]			= useMutation(mutations.REMOVE_MAP_LIST);
	const [UpdateMapList]			= useMutation(mutations.UPDATE_MAP_LIST, mutationOptions);
	
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

	const addItem = async () => {
		let list = activeList;
		const items = list.items;
		const newItem = {
			_id: '',
			description: 'No Description',
			due_date: 'No Date',
			assigned_to: 'No One',
			completed: false
		};
		let opcode = 1;
		let itemID = newItem._id;
		let listID = activeList._id;
		let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const deleteItem = async (item, index) => {
		let listID = activeList._id;
		let itemID = item._id;
		let opcode = 0;
		let itemToDelete = {
			_id: item._id,
			description: item.description,
			due_date: item.due_date,
			assigned_to: item.assigned_to,
			completed: item.completed
		}
		let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const editItem = async (itemID, field, value, prev) => {
		let flag = 0;
		if (field === 'completed') flag = 1;
		let listID = activeList._id;
		let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const reorderItem = async (itemID, dir) => {
		let listID = activeList._id;
		let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const addMapList = async (name, parent, sub) =>{
		let region = {
			_id: '',
			owner: props.user._id,
			parent: parent,
			name: name,
			capital: 'Unknown',
			leader: 'Unknown',
			landmarks: [],
			child: []
		}
		const { data } = await AddMapList({ variables: { region: region } , refetchQueries: [{ query: GET_DB_MAP }]});
		return data.addMapList._id
	};

	const removeMapList = async (_id) =>{
		RemoveMapList({ variables: { _id: _id } , refetchQueries: [{ query: GET_DB_MAP }]});
		setActiveList({})
	};

	const updateMapList = async (_id, field, value, keep) =>{
		const { data } = await UpdateMapList({ variables: { _id: _id, field: field, value: value }});
		// keep ? setActiveList() : setActiveList({})
	}

	const createNewList = async () => {
		let list = {
			_id: '',
			name: 'Untitled',
			owner: props.user._id,
			items: [],
			sortRule: 'task',
			sortDirection: 1
		}
		const { data } = await AddTodolist({ variables: { todolist: list } });
		if(data) {
			loadTodoList(data.addTodolist);
		} 
		
	};
	const deleteList = async (_id) => {
		console.log(_id);
		DeleteTodolist({ variables: { _id: _id } });
		loadTodoList({});
	};

	const updateListField = async (_id, field, value, prev) => {
		let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const handleSetActive = (_id) => {
		const selectedList = totalMap.find(map => map._id === _id);
		setActiveList(selectedList);
	};

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	};

	const setShowUpdate = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(!showUpdate)
		console.log(showUpdate)
	};
	
	const sort = (criteria) => {
		let prevSortRule = sortRule;
		setSortRule(criteria);
		let transaction = new SortItems_Transaction(activeList._id, criteria, prevSortRule, sortTodoItems);
		console.log(transaction)
		props.tps.addTransaction(transaction);
		tpsRedo();
		
	}
	const logoClick = () =>{
		console.log("hello");
		let selectedListIndex = homeMap.findIndex(map => map._id === activeList._id);
		console.log(selectedListIndex)
		let removed = homeMap.splice(selectedListIndex, 1);
		homeMap.unshift(removed[0]);
		setActiveList({});
	}
	
	return (
		<WLayout wLayout="header">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' logoClick={logoClick} />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch} 			setActiveList={loadTodoList}
							setShowUpdate={setShowUpdate}	user={props.user}
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			{/* <WLSide side="left">
				<WSidebar>
					{
						activeList ? 
							<SidebarContents
								listIDs={SidebarData} 				activeid={activeList._id} auth={auth}
								handleSetActive={handleSetActive} 	createNewList={createNewList}
								updateListField={updateListField} 	key={activeList._id}
							/>
							:
							<></>
					}
				</WSidebar>
			</WLSide> */}
			
			<WLMain>
				{	// If there's activelist => spreadsheet, else home page
					auth ? 
						Object.entries(activeList).length !== 0 ?
							viewer.length>0 ?
								<div className="container-secondary">
									<ViewerContent activeList={activeList} handleSetActive={handleSetActive} toggleViewer={toggleViewer}
									viewer={viewer}/>
								
								</div>
								:
								<div className="container-secondary center" style={{padding:"1% 3% 3% 3%"}}>
									<SpreadSheet addMapList={addMapList} removeMapList={removeMapList} updateMapList={updateMapList}
									setActiveList={setActiveList}	activeList={activeList} subMap={subMap}	toggleViewer={toggleViewer}  
									/>
								</div>
							:
							<div className="container-secondary">
								<div className=" center" >
									<HomePage addMapList={addMapList} maplists={homeMap}
									removeMapList={removeMapList} updateMapList={updateMapList}
									setActiveList={setActiveList} activeList={activeList}		  
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

		</WLayout>
	);
};

export default Homescreen;