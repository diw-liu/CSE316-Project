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

export const GET_DB_TODOS = gql`
	query GetDBTodos {
		getAllTodos {
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

export const GET_DB_MAP = gql`
	query GetDBMap {
		getHomeMapList{
			_id
			owner
			parent
			name
			capital
			leader
			landmarks
			child
		}
	}
`;

