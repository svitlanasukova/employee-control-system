import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUserSession } from '../../store/users-actions';

import styles from './styles.module.scss';

// Component for creating a new user

// Component for adding a session for an existing user
export const EditSession = function ({ onHideModal, userId, session }) {
	const dispatch = useDispatch();
	const [date, setDate] = useState(session.date);
	const [feedback, setFeedback] = useState(session.feedback);
	const [comment, setComment] = useState(session.comment);

	const handleSubmit = e => {
		e.preventDefault();

		// Create new session object
		const newSession = {
			date,
			feedback,
			comment,
		};

		dispatch(editUserSession(userId, session.id, newSession));

		setDate('');
		setFeedback('');
		setComment('');
		onHideModal();
	};

	return (
		<form onSubmit={handleSubmit} className={styles.addSession}>
			<label>
				Date:
				<input
					type='date'
					name='date'
					required
					value={date}
					onChange={e => setDate(e.target.value)}
				/>
			</label>
			<label>
				Feedback:
				<input
					type='number'
					name='feedback'
					required
					max={10}
					value={feedback}
					onChange={e => setFeedback(e.target.value)}
				/>
			</label>
			<label>
				Comment:
				<textarea
					name='comment'
					value={comment}
					onChange={e => setComment(e.target.value)}
				/>
			</label>
			<button type='submit'>Edit Session</button>
		</form>
	);
};
