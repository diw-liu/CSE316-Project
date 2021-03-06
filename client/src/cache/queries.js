import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
		}
	}
`;

export const GET_DB_MAP = gql`
	query GetDBMap {
		getHomeMapList{
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
export const GET_LANDMARK = gql`
	query GetLandmark($_id: String!){
		getLandmark(_id: $_id){
			_id
			region
			name
		}
	}
`;

