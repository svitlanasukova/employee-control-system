import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './styles.module.scss';
import { deleteUserSession } from '../../store/users-actions';

const UserSessions = ({ sessions, onRefresh, userId }) => {
	const dispatch = useDispatch();
	const deleteSessionHandler = async sessionId => {
		dispatch(deleteUserSession(userId, sessionId));
	};
	const sessionsList = [...sessions].reverse();

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
					{sessionsList.map(session => (
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
