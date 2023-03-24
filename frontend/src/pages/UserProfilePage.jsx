import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

const UserProfilePage = () => {
	const { userId } = useParams();
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	const fetchUserData = useCallback(async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API}/users/` + userId,
		);

		if (!response.ok) {
			throw new Error('Could not fetch character.');
		} else {
			const data = await response.json();

			setUserData(data);
		}
	}, [userId]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	const goBackHandler = () => {
		navigate(-1);
	};

	return (
		<div>
			<button onClick={goBackHandler}>← Back</button>
			{userData && (
				<UserProfile user={userData} onRefreshUser={fetchUserData} />
			)}
		</div>
	);
};

export default UserProfilePage;
