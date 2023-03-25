import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

const UserProfilePage = () => {
	const { userId } = useParams();
	const users = useSelector(state => state.users.items);
	const userData = users.find(user => user.id === Number(userId));
	const navigate = useNavigate();

	const goBackHandler = () => {
		navigate(-1);
	};

	return (
		<div>
			<button onClick={goBackHandler}>← Back</button>
			{userData && <UserProfile user={userData} />}
		</div>
	);
};

export default UserProfilePage;
