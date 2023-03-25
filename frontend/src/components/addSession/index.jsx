import React from 'react';
import { useDispatch } from 'react-redux';
import { addUserSession } from '../../store/users-actions';

import styles from './styles.module.scss';

// Component for creating a new user

// Component for adding a session for an existing user
export const AddSession = function ({ onHideModal, userId }) {
	const dispatch = useDispatch();
	const handleSubmit = async e => {
		e.preventDefault();
		const form = new FormData(e.target);
		const date = form.get('date');
		const feedback = form.get('feedback');
		const comment = form.get('comment');

		// Create new session object
		const newSession = {
			date,
			feedback,
			comment,
		};

		dispatch(addUserSession(userId, newSession));
		e.target.reset();
		onHideModal();
	};

	return (
		<form onSubmit={handleSubmit} className={styles.addSession}>
			<label>
				Date:
				<input type='date' name='date' required />
			</label>
			<label>
				Feedback:
				<input type='number' name='feedback' required max={10} />
			</label>
			<label>
				Comment:
				<textarea name='comment' />
			</label>
			<button type='submit'>Add Session</button>
		</form>
	);
};
