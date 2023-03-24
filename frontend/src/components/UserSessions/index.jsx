import React from 'react';
import saveData from '../../api/saveData';

import styles from './styles.module.scss';

const UserSessions = ({ sessions, onRefresh, userId }) => {
	const deleteSessionHandler = async id => {
		const response = await fetch(
			`${process.env.REACT_APP_API}/users/${userId}/sessions/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			throw new Error('Error! Failed to delete user!');
		} else {
			saveData();
			onRefresh();
		}
	};

	return (
		<div>
			<h2>Sessions:</h2>
			<div className={styles.sessions}>
				<div className={styles.header}>
					<div>Date</div>
					<div>Feedback</div>
					<div>Comment</div>
					<div>Actions</div>
				</div>
				<div className={styles.list}>
					{sessions.reverse().map(session => (
						<div className={styles.item} key={session.id}>
							<div>{session.date}</div>
							<div>{session.feedback}</div>
							<div>{session.comment}</div>
							<div>
								<button onClick={deleteSessionHandler.bind(null, session.id)}>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserSessions;
