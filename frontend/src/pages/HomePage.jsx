import React, { useState } from 'react';

import Modal from '../components/Modal';
import { CreateUser } from '../components/createUser';
import UsersList from '../components/UsersList';
import TeamHealth from '../components/TeamHealth';

import styles from '../App.module.scss';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../store/users-actions';
import { useSelector } from 'react-redux';

const HomePage = () => {
	const dispatch = useDispatch();
	const users = useSelector(state => state.users.items);
	const [addUserModalIsVisible, setAddUserModalIsVisible] = useState(false);

	const showAddUserModalHandler = () => {
		setAddUserModalIsVisible(true);
	};

	const hideAddUserModalHandler = () => {
		setAddUserModalIsVisible(false);
	};

	const deleteUserHandler = async id => {
		dispatch(deleteUser(id));
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
						<CreateUser onHideModal={hideAddUserModalHandler} />
					</Modal>
				)}
				<button onClick={showAddUserModalHandler}>Add user</button>
			</div>
			<UsersList onDeleteUser={deleteUserHandler} />
		</div>
	);
};

export default HomePage;
