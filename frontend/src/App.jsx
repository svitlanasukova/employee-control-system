import React from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchUsersData } from './store/users-actions';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/:userId',
		element: <UserProfilePage />,
	},
]);

function App() {
	const dispatch = useDispatch();
	dispatch(fetchUsersData());
	return <RouterProvider router={router} />;
}

export default App;
