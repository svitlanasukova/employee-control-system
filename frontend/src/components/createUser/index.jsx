import React, { useState } from 'react';
import saveData from '../../api/saveData';
import styles from './styles.module.scss';

// Component for creating a new user
export const CreateUser = function ({ onHideModal, onReshreshUserList }) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		// Create new user object
		const newUser = {
			name,
			surname,
			sessions: [],
		};

		// Send POST request to server to create new user
		const response = await fetch(`${process.env.REACT_APP_API}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		});

		saveData();

		if (response.ok) {
			onHideModal();
			onReshreshUserList();
			// Clear form fields on successful submission
			setName('');
			setSurname('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.createUser}>
			<label>
				Name:
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
			</label>
			<label>
				Surname:
				<input
					type='text'
					value={surname}
					onChange={e => setSurname(e.target.value)}
					required
				/>
			</label>
			<button type='submit'>Create User</button>
		</form>
	);
};
