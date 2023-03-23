import React from 'react';
import styles from './styles.module.scss';

// Component for creating a new user

// Component for adding a session for an existing user
export const AddSession = function ({ onHideModal, onReshreshUserList }) {
	const handleSubmit = async e => {
		e.preventDefault();
		const form = new FormData(e.target);
		const userId = form.get('userId');
		const time = form.get('time');
		const feedback = form.get('feedback');
		const comment = form.get('comment');

		// Create new session object
		const newSession = {
			time,
			feedback,
			comment,
		};
		// Send PUT request to server to add new session for user
		console.log(userId);
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
			onHideModal();
			onReshreshUserList();
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.addSession}>
			<label>
				User ID:
				<input type='text' name='userId' required />
			</label>
			<label>
				Time:
				<input type='datetime-local' name='time' />
			</label>
			<label>
				Feedback:
				<input type='number' name='feedback' required />
			</label>
			<label>
				Comment:
				<textarea name='comment' />
			</label>
			<button type='submit'>Add Session</button>
		</form>
	);
};
