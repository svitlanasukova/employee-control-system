import React from 'react';
import styles from './styles.module.scss';

export const UpdateUser = function () {
	const handleSubmit = async e => {
		e.preventDefault();
		const form = new FormData(e.target);

		const {
			userId,
			name,
			surname,
			sessionDate,
			sessionFeedback,
			sessionComment,
		} = form.getAll();

		// Create object with updated user data
		const updatedUser = {};

		if (name) {
			updatedUser.name = name;
		}

		if (surname) {
			updatedUser.surname = surname;
		}

		if (sessionDate || sessionFeedback || sessionComment) {
			updatedUser.sessionData = {};

			if (sessionDate) {
				updatedUser.sessionData.time = sessionDate;
			}

			if (sessionFeedback) {
				updatedUser.sessionData.feedback = sessionFeedback;
			}

			if (sessionComment) {
				updatedUser.sessionData.comment = sessionComment;
			}
		}

		// Send PATCH request to server to update existing user
		const response = await fetch(
			`${process.env.REACT_APP_API}/users/${userId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedUser),
			},
		);

		if (response.ok) {
			// Clear form fields on successful submission
			form.reset();
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.updateUser}>
			<label>
				User ID:
				<input name='id' type='text' />
			</label>
			<label>
				Name:
				<input name='name' type='text' />
			</label>
			<label>
				Surname:
				<input name='Surname' type='text' />
			</label>
			<label>
				Session Date:
				<input name='date' type='date' />
			</label>
			<label>
				Session Feedback:
				<input name='feedback' type='text' />
			</label>
			<label>
				Session Comment:
				<input name='comment' type='text' />
			</label>
			<button type='submit'>Update User</button>
		</form>
	);
};
