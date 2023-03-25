import saveData from '../api/saveData';
import { usersActions } from './users-slice';

export const fetchUsersData = () => {
	return async dispatch => {
		const fetchData = async () => {
			const response = await fetch(`${process.env.REACT_APP_API}/users`);

			if (!response.ok) {
				throw new Error('Could not fetch users data!');
			}

			const data = await response.json();

			return data;
		};

		try {
			const usersData = await fetchData();

			dispatch(
				usersActions.replaceUsers({
					items: usersData || [],
				}),
			);
		} catch (error) {
			throw new Error('Could not fetch users data!');
		}
	};
};

export const deleteUser = id => {
	return async dispatch => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/users/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Error! Failed to delete user!');
			}

			dispatch(usersActions.deleteUser(id));
			saveData();
		} catch (error) {
			throw new Error('Error! Failed to delete user!');
		}
	};
};

export const addUser = newUser => {
	return async dispatch => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser),
			});

			if (!response.ok) {
				throw new Error('Error! Failed to add user!');
			}

			dispatch(usersActions.addUser(newUser));
			saveData();
		} catch (error) {
			throw new Error('Error! Failed to add user!');
		}
	};
};

export const deleteUserSession = (userId, sessionId) => {
	return async dispatch => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API}/users/${userId}/sessions/${sessionId}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			if (!response.ok) {
				throw new Error('Error! Failed to delete user session!');
			}

			dispatch(usersActions.deleteUserSession({ userId, sessionId }));
			saveData();
		} catch (error) {
			throw new Error('Error! Failed to delete user session!');
		}
	};
};

export const addUserSession = (userId, session) => {
	return async dispatch => {
		try {
			// Send PUT request to server to add new session for user
			const response = await fetch(
				`${process.env.REACT_APP_API}/users/${userId}/sessions`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(session),
				},
			);

			if (response.ok) {
				dispatch(usersActions.addUserSession({ userId, session }));
				saveData();
			}
		} catch (error) {
			throw new Error('Error! Failed to add user session!');
		}
	};
};
