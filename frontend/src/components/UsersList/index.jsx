import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

const UsersList = ({ users, onDeleteUser }) => {
	const transformUsers = useCallback(users => {
		return users.map(user => {
			const healthNum =
				user.sessions.reduce(
					(currentNum, session) => currentNum + +session.feedback,
					0,
				) / user.sessions.length;
			const health =
				user.sessions.length === 0
					? ''
					: healthNum % 1 === 0
					? healthNum
					: healthNum.toFixed(1);
			const healthStatus =
				user.sessions.length > 1 ? (
					+user.sessions[user.sessions.length - 1].feedback >=
					+user.sessions[user.sessions.length - 2].feedback ? (
						<span style={{ color: 'green' }}>↑</span>
					) : (
						<span style={{ color: 'red' }}>↓</span>
					)
				) : (
					''
				);
			const healthComment = user.sessions.length !== 0 &&
				user.sessions[user.sessions.length - 1].comment !== '' && (
					<div className={styles.comment}>
						{user.sessions[user.sessions.length - 1].comment}
					</div>
				);
			return {
				id: user.id,
				name: user.name,
				surname: user.surname,
				health,
				healthStatus,
				healthComment,
				toImprove:
					user.sessions.length > 0 &&
					user.sessions[user.sessions.length - 1].comment
						? user.sessions[user.sessions.length - 1].comment
						: '',
			};
		});
	}, []);

	const [usersList, setUsersList] = useState([]);
	const [isSorted, setIsSorted] = useState(false);
	const [sortType, setSortType] = useState('DESC');

	useEffect(() => {
		const transformedUsers = transformUsers(users).sort(
			(a, b) => b.health - a.health,
		);
		if (!isSorted) {
			setUsersList(transformedUsers);
		}
		if (users.length !== usersList.length) {
			setUsersList(transformedUsers);
			setSortType('DESC');
		}
	}, [transformUsers, users, isSorted, usersList.length]);

	const navigate = useNavigate();

	const navigateToUserProfileHandler = event => {
		const id = event.target.closest('.' + styles.item).dataset.id;
		if (id && event.target.tagName.toLowerCase() !== 'button') {
			navigate('/' + id);
		}
	};

	const sortHandler = () => {
		const newSortType = sortType === 'DESC' ? 'ASC' : 'DESC';

		switch (newSortType) {
			case 'DESC':
				setUsersList(usersList.sort((a, b) => b.health - a.health));
				break;
			case 'ASC':
				setUsersList(usersList.sort((a, b) => a.health - b.health));
				break;
			default:
				setUsersList(usersList.sort((a, b) => b.health - a.health));
				break;
		}
		setSortType(newSortType);

		setIsSorted(true);
	};

	return (
		<div className={styles.usersList}>
			<div className={styles.header}>
				<div>Name</div>
				<div>Surname</div>
				<div onClick={sortHandler} className={styles.healthTitle}>
					Health <span>{sortType === 'DESC' ? '↓' : '↑'}</span>
				</div>
				<div>To improve</div>
				<div>Actions</div>
			</div>
			<div className={styles.list} onClick={navigateToUserProfileHandler}>
				{usersList.map(user => {
					return (
						<div key={user.id} className={styles.item} data-id={user.id}>
							<div>{user.name}</div>
							<div>{user.surname}</div>
							<div className={styles.health}>
								{user.health}
								{user.healthStatus}
								{user.healthComment}
							</div>
							<div>{user.toImprove}</div>
							<div>
								<button onClick={onDeleteUser.bind(null, user.id)}>
									Delete
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default UsersList;
