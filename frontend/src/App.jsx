import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';

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
	return <RouterProvider router={router} />;
}

export default App;
