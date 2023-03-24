import React, { useCallback, useEffect, useState } from 'react';

import Modal from '../components/Modal';
import { CreateUser } from '../components/createUser';
import UsersList from '../components/UsersList';
import TeamHealth from '../components/TeamHealth';

import styles from '../App.module.scss';

const HomePage = () => {
	const [users, setUsers] = useState([]);
	const [addUserModalIsVisible, setAddUserModalIsVisible] = useState(false);

	const fetchUsers = useCallback(() => {
		fetch(`${process.env.REACT_APP_API}/users`, {
			method: 'GET',
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				setUsers(data);
			});
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const showAddUserModalHandler = () => {
		setAddUserModalIsVisible(true);
	};

	const hideAddUserModalHandler = () => {
		setAddUserModalIsVisible(false);
	};

	const deleteUserHandler = async id => {
		const response = await fetch(`${process.env.REACT_APP_API}/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Error! Failed to delete user!');
		} else {
			fetchUsers();
		}
	};

	const usersHasSessions = users.reduce(
		(curr, user) => (user.sessions.length > 0 ? curr + 1 : curr),
		0,
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{usersHasSessions > 0 && <TeamHealth users={users} />}
				{addUserModalIsVisible && (
					<Modal onClose={hideAddUserModalHandler}>
						<h2>Create user</h2>
						<CreateUser
							onHideModal={hideAddUserModalHandler}
							onReshreshUserList={fetchUsers}
						/>
					</Modal>
				)}
				<button onClick={showAddUserModalHandler}>Add user</button>
			</div>
			<UsersList users={users} onDeleteUser={deleteUserHandler} />
		</div>
	);
};

export default HomePage;
