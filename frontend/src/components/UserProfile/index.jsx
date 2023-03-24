import React, { useState } from 'react';
import { AddSession } from '../addSession';
import Modal from '../Modal';
import UserSessions from '../UserSessions';

import styles from './styles.module.scss';

const UserProfile = ({ user, onRefreshUser }) => {
	console.log(user);
	const [addSessionModalIsVisible, setSessionUserModalIsVisible] =
		useState(false);

	const showAddSessionModalHandler = () => {
		setSessionUserModalIsVisible(true);
	};
	const hideAddSessionModalHandler = () => {
		setSessionUserModalIsVisible(false);
	};

	const toImprove =
		user.sessions.length > 0 && user.sessions[user.sessions.length - 1].comment
			? user.sessions[user.sessions.length - 1].comment
			: '';

	return (
		<div className={styles.userProfile}>
			<h1>
				{user.name} {user.surname}
			</h1>
			<p>{toImprove}</p>
			{addSessionModalIsVisible && (
				<Modal onClose={hideAddSessionModalHandler}>
					<h2>Create session</h2>
					<AddSession
						onHideModal={hideAddSessionModalHandler}
						userId={user.id}
						onRefresh={onRefreshUser}
					/>
				</Modal>
			)}
			<button onClick={showAddSessionModalHandler}>Add session</button>
			{user.sessions.length > 0 && (
				<UserSessions
					sessions={user.sessions}
					onRefresh={onRefreshUser}
					userId={user.id}
				/>
			)}
		</div>
	);
};

export default UserProfile;
