import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		items: [],
	},
	reducers: {
		replaceUsers(state, action) {
			state.items = action.payload.items;
		},
		deleteUser(state, action) {
			state.items = state.items.filter(user => user.id !== action.payload);
		},
		addUser(state, action) {
			state.items.push({ ...action.payload, id: state.items.length + 1 });
		},
		deleteUserSession(state, action) {
			const user = state.items.find(user => user.id === action.payload.userId);
			user.sessions = user.sessions.filter(
				session => session.id !== action.payload.sessionId,
			);
		},
		addUserSession(state, action) {
			const user = state.items.find(user => user.id === action.payload.userId);
			user.sessions.push({
				...action.payload.session,
				id: user.sessions.length + 1,
			});
		},
	},
});

export const usersActions = usersSlice.actions;

export default usersSlice;