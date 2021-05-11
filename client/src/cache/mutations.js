import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			_id
			email 
			name
			password
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			email
			password
			name
		}
	}
`;

export const UPDATE = gql`
	mutation Update($email: String!, $password: String!, $name: String!, $_id: String!) {
		update(email: $email, password: $password, name: $name, _id: $_id ) {
			_id
			email
			password
			name
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const ADD_MAP_LIST = gql`
    mutation AddMapList($region: regionInput!) {
        addMapList(region: $region) {
			_id
			owner
			parent
			name
			capital
			leader
			sortDirection
			landmarks
			child
        }
    }
`;
export const REMOVE_MAP_LIST = gql`
	mutation RemoveMapList($_id: String!) {
		removeMapList(_id: $_id)
	}
`;
export const UPDATE_MAP_LIST = gql`
	mutation UpdateMapList($_id: String!, $field: String!, $value: String!) {
		updateMapList(_id: $_id, field: $field, value: $value) 
	}
`;
export const MOVE_MAP_TOP = gql`
	mutation MoveMapTop($_id: String!) {
		moveMapTop(_id: $_id) 
	}
`;
export const SORT_MAP_LIST = gql`
	mutation SortMapList($_id:String!, $field:String!){
		sortMapList(_id:$_id, field:$field)
	}
`;
export const ADD_LANDMARK = gql`
	mutation AddLandmark($_id:String!, $text:String!){
		addLandmark(_id:$_id, text:$text)
	}
`;


export const ADD_ITEM = gql`
	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
		addItem(item: $item, _id: $_id, index: $index)
	}
`;

export const DELETE_ITEM = gql`
	mutation DeleteItem($itemId: String!, $_id: String!) {
		deleteItem(itemId: $itemId, _id: $_id) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const REORDER_ITEMS = gql`
	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const SORT_ITEMS = gql`
	mutation SortItems($_id: String!, $criteria: String!) {
		sortItems(_id: $_id, criteria: $criteria) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const ADD_TODOLIST = gql`
	mutation AddTodolist($todolist: TodoInput!) {
		addTodolist(todolist: $todolist) {
			_id
			name
			owner
			items {
				_id
				description
				due_date
				assigned_to
				completed
			}
			sortRule
			sortDirection
		}
	}
`;

export const DELETE_TODOLIST = gql`
	mutation DeleteTodolist($_id: String!) {
		deleteTodolist(_id: $_id)
	}
`;

export const UPDATE_TODOLIST_FIELD = gql`
	mutation UpdateTodolistField($_id: String!, $field: String!, $value: String!) {
		updateTodolistField(_id: $_id, field: $field, value: $value)
	}
`;
