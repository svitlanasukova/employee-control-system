import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './styles.module.scss';
import { deleteUserSession } from '../../store/users-actions';
import { EditSession } from '../editSession';
import Modal from '../Modal';

const UserSessions = ({ sessions, userId }) => {
	const dispatch = useDispatch();
	const [editUserSessionModalIsVisible, setEditUserSessionModalIsVisible] =
		useState(false);
	const [userSessionInfo, setuserSessionInfo] = useState({});
	const deleteSessionHandler = async sessionId => {
		dispatch(deleteUserSession(userId, sessionId));
	};
	const editSessionHandler = session => {
		setuserSessionInfo(session);
		setEditUserSessionModalIsVisible(true);
	};
	const sessionsList = [...sessions].reverse();

	const hideEditUserSessionModalHandler = () => {
		setEditUserSessionModalIsVisible(false);
	};

	return (
		<div>
			{editUserSessionModalIsVisible && (
				<Modal onClose={hideEditUserSessionModalHandler}>
					<h2>Edit session</h2>
					<EditSession
						onHideModal={hideEditUserSessionModalHandler}
						userId={userId}
						session={userSessionInfo}
					/>
				</Modal>
			)}
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
								<button onClick={editSessionHandler.bind(null, session)}>
									Edit
								</button>
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
