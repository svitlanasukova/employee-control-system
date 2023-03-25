import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/users-actions';
import styles from './styles.module.scss';

// Component for creating a new user
export const CreateUser = function ({ onHideModal }) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = async e => {
		e.preventDefault();

		// Create new user object
		const newUser = {
			name,
			surname,
			sessions: [],
		};

		try {
			dispatch(addUser(newUser));
			onHideModal();

			setName('');
			setSurname('');
		} catch (error) {}
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
