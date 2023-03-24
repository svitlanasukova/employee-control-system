import React, { useEffect, useState } from 'react';

const TeamHealth = ({ users }) => {
	const [progress, setProgress] = useState(0);

	const usersHasSessions = users.reduce(
		(curr, user) => (user.sessions.length > 0 ? curr + 1 : curr),
		0,
	);
	const health =
		users.length === 0
			? 0
			: Math.round(
					users.reduce((currHealth, user) => {
						const userHealth =
							user.sessions.reduce(
								(currentNum, session) => currentNum + +session.feedback,
								0,
							) / user.sessions.length;

						if (userHealth) {
							return currHealth + userHealth;
						} else {
							return currHealth;
						}
					}, 0) / usersHasSessions,
			  );

	useEffect(() => {
		if (health > progress) {
			const timer = setTimeout(() => {
				setProgress(progress => progress + 1);
			}, 100);
			return () => {
				clearTimeout(timer);
			};
		} else if (health < progress && health !== progress) {
			const timer = setTimeout(() => {
				setProgress(progress => progress - 1);
			}, 100);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [health, progress]);

	const colors = {
		1: '#FF0000',
		2: '#FF4500',
		3: '#FF8C00',
		4: '#FFA500',
		5: '#FFFF00',
		6: '#ADFF2F',
		7: '#7FFF00',
		8: '#00FF00',
		9: '#008000',
		10: '#006400',
	};

	const size = 60;
	const strokeWidth = 4;
	const viewBox = `0 0 ${size} ${size}`;
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * Math.PI * 2;
	const dash = (progress * circumference) / 10;
	const color = colors[health];

	return (
		<svg width={size} height={size} viewBox={viewBox}>
			<circle
				fill='none'
				stroke={color}
				style={{ opacity: 0.3, transition: 'all 0.3s' }}
				cx={size / 2}
				cy={size / 2}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
			/>
			<circle
				fill='none'
				stroke={color}
				cx={size / 2}
				cy={size / 2}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
				transform={`rotate(-90 ${size / 2} ${size / 2})`}
				strokeDasharray={[dash, circumference - dash]}
				strokeLinecap='round'
				style={{ transition: 'all 0.3s' }}
			/>
			<text
				fill='black'
				fontSize='22px'
				x='50%'
				y='50%'
				dy='8px'
				textAnchor='middle'
			>
				{`${progress}`}
			</text>
		</svg>
	);
};

export default TeamHealth;
