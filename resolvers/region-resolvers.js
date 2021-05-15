const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

// const Sorting = require('../utils/sorting')

// // The underscore param, "_", is a wildcard that can represent any value;
// // here it is a stand-in for the parent parameter, which can be read about in
// // the Apollo Server documentation regarding resolvers

module.exports = {
    Query: {
		/**
		 * @param {object} req - the request object containting a user id
		 * @return {array} array of region with no parent value 
		 */
		getHomeMapList: async (_, __, { req }) => {
			console.log("Hello")
			const _id = new ObjectId(req.userId);
			if(!_id) {return([])};
			const maplist = await Region.find({owner:_id});
			if(maplist){
				return (maplist);
			}
		},
        /** 
		 	@param 	 {object} args - a region id
			@returns {array} array of tuple [landmark, current (if the landmark is in the current region)]
		**/
		getLandmark: async (_, args) => {
			console.log("Hello landmark")
			
			const { _id } = args;
			// console.log(_id)
			let landmark = [];
			let region = [_id];

			while(region.length!=0){
				const objectId = new ObjectId(region[0]);
				const found = await Region.findOne({_id:objectId});
				// console.log(found);
				if(found != null && found.child.length != 0)
					region.push(...found.child);
				if(found != null && found.landmarks.length != 0)
					landmark.push(...found.landmarks)
				region.shift();
			}

			// console.log(landmark);
			return landmark
		},
	},
    Mutation: {
        /**
         *
         * @param {object} args contain subregion list
         * @return {Region} 
         */
		 addMapList: async (_, args) => {
			console.log("dadads");
			const { region } = args;
			// const objectId1 = new ObjectId();
			const { _id, owner, parent, name, capital, leader, sortDirection, landmarks, child} = region;
			const objectID = _id == "" ? new ObjectId(): new ObjectId(_id);
			const newR = new Region({
				_id: objectID,
				owner: owner,
				parent: parent,
				name: name,
				capital: capital,
				leader: leader,
				sortDirection: sortDirection,
				landmarks: landmarks,
				child: child
			});
			console.log(newR)
			if (parent != "Home" && _id==""){
				const target = await Region.findOne({_id: parent});
				var temp = [...target.child, objectID];
				const updated = await Region.updateOne({_id: parent}, {child:temp});
				if(updated) console.log("E")
			}
			// if(field=="child"){
			// 	const target = await Region.findOne({_id: objectId});
			// 	console.log(target)
			// 	temp = [...target.child,value];
			// }
			// const updated = await Region.updateOne({_id: objectId}, {[field]:temp})
			
			// If the parent is not home
			// let temp
			// if (parent!="Home"){
			// 	if(index!=-1){
			// 		const target = await Region.findOne({_id: parent});
			// 		temp = target.child.splice(index, 0, objectId1);
			// 	}else {
			// 		temp = [...target.child, objectId1];
			// 	}
			// 	const updated = await Region.updateOne({_id: objectId}, {child:temp});
			// }
			const updated = await newR.save();
			if(updated) {
				return newR;
			}
		},

		/**
         *
         * @param {object} args contain subregion list id
         * @return {boolean} 
         */
		 removeMapList: async (_, args) => {
			console.log("removew in caction")
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const result = await Region.findOne({_id: objectId});

			var deleteList = [];
			deleteList.push(_id);
			var flag;
			while(deleteList.length!=0){
				const objectId = new ObjectId(deleteList[0]);
				const found = await Region.findOne({_id: objectId});

				if(found != null && found.child.length!=0){
					deleteList.push(...found.child);
				}

				flag = await Region.deleteOne({_id: objectId});
				deleteList.shift();
				if (flag) console.log("remove yes")
			}
			if(flag) return result;
			else return false;
		},

		/**
		 * @param {object} args contain _id, field, value
		 * @return {string}
		 */
		updateMapList: async(_, args) =>{
			const {_id, field, value} = args;
			const objectId = new ObjectId(_id);
			let temp = value;
			if(field=="child"){
				const target = await Region.findOne({_id: objectId});
				console.log(target)
				temp = [...target.child,value];
			}
			const updated = await Region.updateOne({_id: objectId}, {[field]:temp})
			if(updated) return true;
			else return '';
		},

		/**
		 * @param {object} args _id
		 * @return {boolean}
		 */
		moveMapTop: async (_, args) => {
			const {_id} = args;
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});
			const removed = await Region.deleteOne({_id: listId});
			const newList = new Region({
				_id: listId,
				owner: found.owner,
				parent: found.parent,
				name: found.name,
				capital:found.capital,
				leader: found.leader,
				sortDirection: found.sortDirection,
				landmarks: found.landmarks,
				child: found.child
			}); 
			const updated = newList.save();
			console.log("movetopfinish");
			console.log(updated);
			if(updated) return true;
			return false;
		},

		/**
		 * @param {object} args _id, field
		 * @return {[Region]} array of region
		 */
		sortMapList: async (_, args) => {
			const {_id, field} = args;
			
			const regionId = new ObjectId(_id);
			const found = await Region.findOne({_id:regionId});
			let newDirection = found.sortDirection === 1 ? -1 : 1;
			console.log(newDirection, found.sortDirection);
			let temp=[];
			
			console.log(found.child)
			for(var i=0; i<found.child.length;i++){
				let sub = await Region.findOne({_id:found.child[i]});
				if(sub!=null){
					temp.push(sub);
				}
			}
			
			if(newDirection === 1) 
				temp.sort((a,b) => a[field].toUpperCase() > b[field].toUpperCase() ? 1 : -1);
			else 
				temp.sort((a,b) => a[field].toUpperCase() < b[field].toUpperCase() ? 1 : -1);
			
			let sortedString=[];
			for(var i=0; i<temp.length;i++){
				sortedString.push(temp[i]._id);
			}
			const updated = await Region.updateOne({_id: regionId}, { sortDirection: newDirection, child: sortedString })
			if(updated) return sortedString;
		},

		/**
		 * @param {object} args _id, text
		 * @return {booleab} true if added sucessfully
		 */
		addLandmark: async (_, args) =>{
			console.log("Hello addlandmark")

			const { _id, text } = args;
		
			let region = [_id];
			let flag = true;

			// Check parent
			while(region.length!=0 && region[0]!="Home"){
				const objectId = new ObjectId(region[0]);
				const found = await Region.findOne({_id:objectId});
				console.log(found)
				const contain = found.landmarks.filter(landmark => landmark.name == text);
				if(contain.length!=0) flag=false;
				region.push(found.parent)
				region.shift();
				console.log(region)
			}

			// Check child
			let landmark = [];
			region = [_id];
			console.log("Mark")
			while(region.length!=0){
				const objectId = new ObjectId(region[0]);
				const found = await Region.findOne({_id:objectId});
				console.log(found);
				if(found != null && found.child.length != 0)
					region.push(...found.child);
				if(found != null && found.landmarks.length != 0)
					landmark.push(...found.landmarks)
				region.shift();
			}
			const contain = landmark.filter(landmark => landmark.name == text);
			if(contain.length!=0) flag=false;

			// Update landmark
			const regionId  = new ObjectId(_id);
			const found 	= await Region.findOne({_id: regionId})
			const Id 	    = new ObjectId();

			console.log(flag)
			var final = [...found.landmarks]
			if(flag){
				final = [...found.landmarks, {_id: Id, region: regionId, name: text }]
			}
			const updated = await Region.updateOne({_id: regionId}, {landmarks: final})

			if(updated)	return true
			return false
		},

		/**
		 * @param {object} args _id, landmark_id
		 * @return {booleab} true if added sucessfully
		 */
		removeLandmark: async (_, args) =>{
			console.log("Hello remove");
			const { _id, text } = args;
			const regionId = new ObjectId(_id);
			const found = await Region.findOne({_id:regionId})
			console.log(found);
			let landmarkList = found.landmarks.filter(landmark => landmark.name !== text);
			const updated = await Region.updateOne({_id: regionId}, { landmarks: landmarkList })
			if(updated) return true;
			else return false;
		},

		/**
		 * @param {object} args _id, landmark_id
		 * @return {booleab} true if added sucessfully
		 */
		 editLandmark: async (_, args) =>{
			console.log("Hello edit");
			const { _id, prevText, targetText } = args;
			let region = [_id];
			let flag = true;

			// Check parent
			while(region.length!=0 && region[0]!="Home"){
				const objectId = new ObjectId(region[0]);
				const found = await Region.findOne({_id:objectId});
				// console.log(found)
				const contain = found.landmarks.filter(landmark => landmark.name == targetText);
				if(contain.length!=0) flag=false;
				region.push(found.parent)
				region.shift();
				console.log(region)
			}

			// Check child
			let landmark = [];
			region = [_id];
			console.log("Mark")
			while(region.length!=0){
				const objectId = new ObjectId(region[0]);
				const found = await Region.findOne({_id:objectId});
				console.log(found);
				if(found != null && found.child.length != 0)
					region.push(...found.child);
				if(found != null && found.landmarks.length != 0)
					landmark.push(...found.landmarks)
				region.shift();
			}
			const contain = landmark.filter(landmark => landmark.name == targetText);
			if(contain.length!=0) flag=false;

			const regionId  = new ObjectId(_id);
			found = await Region.findOne({_id: regionId})

			var final = [...found.landmarks]
			if(flag){
				final.map(landmark => {
					if(landmark.name === prevText) {	
						landmark.name = targetText;
					}
				});
			}

			const updated = await Region.updateOne({_id: regionId}, { landmarks: final })
			if(updated) return true;
			else return false;
		},
		/**
		 * @param {object} args parentID, childID
		 * @return {booleab} true if added sucessfully
		 */
		changeParent: async (_, args) =>{
			console.log("Hello change parnet")
			const {parentID, childID} = args
			// Get childID
			const childId = new ObjectId(childID);
			const child = await Region.findOne({_id:childId})
			
			if(child.parent!="Home"){
				// Get parent of ChildID
				const prevId = new ObjectId(child.parent);
				const prevPa = await Region.findOne({_id:prevId});
				console.log(prevPa)

				// Remove child childID from parent of childID
				let childPrev = prevPa.child;
				childPrev = childPrev.filter(child => child.toString() != childID);
				const updated1 = await Region.updateOne( {_id:prevId}, {child:childPrev})
				if(!updated1) return false
			}
			
			// Change the child parent to new parent
			var updated2
			if(parentID=="Home"){ 
				updated2 = await Region.updateOne( {_id:childId}, {parent:"Home"})
				if(updated2) return true
				return false
			}
			const parentId = new ObjectId(parentID);
			updated2 = await Region.updateOne( {_id:childId}, {parent:parentId})
			if(!updated2) return false

			// Get region of parentID
			const parent = await Region.findOne({_id:parentId})
			
			// Append ID of childID to region of parentID
			let childNow = parent.child;
			childNow = [...childNow, childId]
			const updated3 = await Region.updateOne( {_id:parentId}, {child:childNow})
			if(updated3) return true
			return false;
		}
			// const { _id, text } = args;
			// const regionId = new ObjectId(_id);
			// const Id 	   = new ObjectId();
			// // Get the target region
			// let found = await Region.findOne({_id: regionId})
			// console.log(found)

			// let final = [...found.landmarks, {_id: Id, region: regionId, name: text }]
			// console.log(final)
			// let updated = await Region.updateOne({_id: regionId}, {landmarks: final})

			// if(updated)	return true
			// return false
		
	}
		// addLandmark: async (_, args) => {
		// 	console.log("add landmark")
		// 	const {regionId, text} = args;
		// 	const regionId = new ObjectId(regionId);
		// 	console.log(regionId)

		// 	let found = await Region.findOne({_id: regionId});
		// 	console.log(found);

		// 	let final = [...found.landmarks, {regionId: regionId, name:text}]
		// 	let updated = await Region.updateOne({_id:regionId},{ landmarks : final})

		// 	while(found.parent!="Home"){
		// 		found = await Region.findOne({_id:found.parent});
		// 		final = [...found.landmarks, {regionId: regionId, name:text}]
		// 		updated = await Region.updateOne({_id:found._id},{landmarks:final})
		// 	}

		// 	if(updated) {
		// 		return true;
		// 	}
		// }
    
	// Query: {
	// 	/** 
	// 	 	@param 	 {object} req - the request object containing a user id
	// 		@returns {array} an array of todolist objects on success, and an empty array on failure
	// 	**/
	// 	getAllTodos: async (_, __, { req }) => {
	// 		const _id = new ObjectId(req.userId);
	// 		if(!_id) { return([])};
	// 		const todolists = await Todolist.find({owner: _id}).sort({updatedAt: 'descending'});
	// 		if(todolists) {
	// 			return (todolists);
	// 		} 

	// 	},
	// 	/** 
	// 	 	@param 	 {object} args - a todolist id
	// 		@returns {object} a todolist on success and an empty object on failure
	// 	**/
	// 	getTodoById: async (_, args) => {
	// 		const { _id } = args;
	// 		const objectId = new ObjectId(_id);
	// 		const todolist = await Todolist.findOne({_id: objectId});
	// 		if(todolist) return todolist;
	// 		else return ({});
	// 	},
	// },
	// Mutation: {
    //     addMapList: async(_, args) => {
            
    //     },
	// 	/** 
	// 	 	@param 	 {object} args - a todolist id and an empty item object
	// 		@returns {string} the objectID of the item or an error message
	// 	**/
	// 	addItem: async(_, args) => {
	// 		const { _id, item , index } = args;
	// 		const listId = new ObjectId(_id);
	// 		const objectId = new ObjectId();
	// 		const found = await Todolist.findOne({_id: listId});
	// 		if(!found) return ('Todolist not found');
	// 		if(item._id === '') item._id = objectId;
	// 		let listItems = found.items;
	// 		if(index < 0) listItems.push(item);
	// 		else listItems.splice(index, 0, item);
			
			
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: listItems });

	// 		if(updated) return (item._id)
	// 		else return ('Could not add item');
	// 	},
	// 	/** 
	// 	 	@param 	 {object} args - an empty todolist object
	// 		@returns {string} the objectID of the todolist or an error message
	// 	**/
	// 	addTodolist: async (_, args) => {
	// 		const { todolist } = args;
	// 		const objectId = new ObjectId();
	// 		const { id, name, owner, items , sortRule, sortDirection} = todolist;
	// 		const newList = new Todolist({
	// 			_id: objectId,
	// 			name: name,
	// 			owner: owner,
	// 			items: items,
	// 			sortRule: sortRule,
	// 			sortDirection: sortDirection,
	// 		});
	// 		const updated = await newList.save();
	// 		if(updated) {
	// 			console.log(newList)
	// 			return newList;
	// 		}
	// 	},
	// 	/** 
	// 	 	@param 	 {object} args - a todolist objectID and item objectID
	// 		@returns {array} the updated item array on success or the initial 
	// 						 array on failure
	// 	**/
	// 	deleteItem: async (_, args) => {
	// 		const  { _id, itemId } = args;
	// 		const listId = new ObjectId(_id);
	// 		const found = await Todolist.findOne({_id: listId});
	// 		let listItems = found.items;
	// 		listItems = listItems.filter(item => item._id.toString() !== itemId);
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
	// 		if(updated) return (listItems);
	// 		else return (found.items);

	// 	},
	// 	/** 
	// 	 	@param 	 {object} args - a todolist objectID 
	// 		@returns {boolean} true on successful delete, false on failure
	// 	**/
	// 	deleteTodolist: async (_, args) => {
	// 		const { _id } = args;
	// 		const objectId = new ObjectId(_id);
	// 		const deleted = await Todolist.deleteOne({_id: objectId});
	// 		if(deleted) return true;
	// 		else return false;
	// 	},
	// 	/** 
	// 	 	@param 	 {object} args - a todolist objectID, field, and the update value
	// 		@returns {boolean} true on successful update, false on failure
	// 	**/
	// 	updateTodolistField: async (_, args) => {
	// 		const { field, value, _id } = args;
	// 		const objectId = new ObjectId(_id);
	// 		const updated = await Todolist.updateOne({_id: objectId}, {[field]: value});
	// 		if(updated) return value;
	// 		else return "";
	// 	},
	// 	/** 
	// 		@param	 {object} args - a todolist objectID, an item objectID, field, and
	// 								 update value. Flag is used to interpret the completed 
	// 								 field,as it uses a boolean instead of a string
	// 		@returns {array} the updated item array on success, or the initial item array on failure
	// 	**/
	// 	updateItemField: async (_, args) => {
	// 		const { _id, itemId, field,  flag } = args;
	// 		let { value } = args
	// 		const listId = new ObjectId(_id);
	// 		const found = await Todolist.findOne({_id: listId});
	// 		let listItems = found.items;
	// 		if(flag === 1) {
	// 			if(value === 'complete') { value = true; }
	// 			if(value === 'incomplete') { value = false; }
	// 		}
	// 		listItems.map(item => {
	// 			if(item._id.toString() === itemId) {	
					
	// 				item[field] = value;
	// 			}
	// 		});
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
	// 		if(updated) return (listItems);
	// 		else return (found.items);
	// 	},
	// 	/**
	// 		@param 	 {object} args - contains list id, item to swap, and swap direction
	// 		@returns {array} the reordered item array on success, or initial ordering on failure
	// 	**/
	// 	reorderItems: async (_, args) => {
	// 		const { _id, itemId, direction } = args;
	// 		const listId = new ObjectId(_id);
	// 		const found = await Todolist.findOne({_id: listId});
	// 		let listItems = found.items;
	// 		const index = listItems.findIndex(item => item._id.toString() === itemId);
	// 		// move selected item visually down the list
	// 		if(direction === 1 && index < listItems.length - 1) {
	// 			let next = listItems[index + 1];
	// 			let current = listItems[index]
	// 			listItems[index + 1] = current;
	// 			listItems[index] = next;
	// 		}
	// 		// move selected item visually up the list
	// 		else if(direction === -1 && index > 0) {
	// 			let prev = listItems[index - 1];
	// 			let current = listItems[index]
	// 			listItems[index - 1] = current;
	// 			listItems[index] = prev;
	// 		}
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
	// 		if(updated) return (listItems);
	// 		// return old ordering if reorder was unsuccessful
	// 		listItems = found.items;
	// 		return (found.items);

	// 	},

	// 	sortItems: async (_, args) => {
	// 		const { _id, criteria } = args;
	// 		const listId = new ObjectId(_id);
	// 		const found = await Todolist.findOne({_id: listId});
	// 		let newDirection = found.sortDirection === 1 ? -1 : 1; 
	// 		console.log(newDirection, found.sortDirection);
	// 		let sortedItems;

	// 		switch(criteria) {
	// 			case 'task':
	// 				sortedItems = Sorting.byTask(found.items, newDirection);
	// 				break;
	// 			case 'due_date':
	// 				sortedItems = Sorting.byDueDate(found.items, newDirection);
	// 				break;
	// 			case 'status':
	// 				sortedItems = Sorting.byStatus(found.items, newDirection);
	// 				break;
	// 			case 'assigned_to':
	// 				sortedItems = Sorting.byAssignedTo(found.items, newDirection);
	// 				break;
	// 			default:
	// 				return found.items;
	// 		}
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: sortedItems, sortRule: criteria, sortDirection: newDirection })
	// 		if(updated) return (sortedItems);

	// 	}

	// }
}