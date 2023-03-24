import React, { useCallback, useEffect, useState } from 'react';

import Modal from './components/Modal';
import { CreateUser } from './components/createUser';
import { AddSession } from './components/addSession';
import UsersList from './components/UsersList';

import styles from './App.module.scss';
import TeamHealth from './components/TeamHealth';

function App() {
	const [users, setUsers] = useState([]);
	const [addUserModalIsVisible, setAddUserModalIsVisible] = useState(false);
	const [addSessionModalIsVisible, setSessionUserModalIsVisible] =
		useState(false);

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

	const showAddSessionModalHandler = () => {
		setSessionUserModalIsVisible(true);
	};
	const hideAddSessionModalHandler = () => {
		setSessionUserModalIsVisible(false);
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
				{addSessionModalIsVisible && (
					<Modal onClose={hideAddSessionModalHandler}>
						<h2>Create session</h2>
						<AddSession
							onHideModal={hideAddSessionModalHandler}
							onReshreshUserList={fetchUsers}
						/>
					</Modal>
				)}
				<button onClick={showAddSessionModalHandler}>Add session</button>
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
}

export default App;
