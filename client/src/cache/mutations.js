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
    mutation AddMapList($region: RegionInput!) {
        addMapList(region: $region) {
			_id
			owner
			parent
			name
			capital
			leader
			sortDirection
			landmarks{
				_id
				region
				name
			}
			child
        }
    }
`;
export const REMOVE_MAP_LIST = gql`
	mutation RemoveMapList($_id: String!) {
		removeMapList(_id: $_id){
			_id
			owner
			parent
			name
			capital
			leader
			sortDirection
			landmarks{
				_id
				region
				name
			}
			child
        }
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
export const REMOVE_LANDMARK = gql`
	mutation RemoveLandmark($_id:String!, $text:String!){
		removeLandmark(_id:$_id, text:$text)
	}
`;
export const EDIT_LANDMARK = gql`
	mutation EditLandmark($_id:String!, $prevText:String!, $targetText:String!){
		editLandmark(_id:$_id, prevText:$prevText, targetText:$targetText)
	}
`;
export const CHANGE_PARENT = gql`
	mutation ChangeParent($parentID:String!, $childID:String!){
		changeParent(parentID:$parentID, childID:$childID)
	}
`;

