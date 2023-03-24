import React from 'react';
import saveData from '../../api/saveData';

import styles from './styles.module.scss';

// Component for creating a new user

// Component for adding a session for an existing user
export const AddSession = function ({ onHideModal, userId, onRefresh }) {
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
		// Send PUT request to server to add new session for user
		const response = await fetch(
			`${process.env.REACT_APP_API}/users/${userId}/sessions`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newSession),
			},
		);

		if (response.ok) {
			// Clear form fields on successful submission
			e.target.reset();
			saveData();
			onHideModal();
			onRefresh();
		}
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
