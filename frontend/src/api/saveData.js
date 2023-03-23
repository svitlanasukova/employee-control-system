const saveData = async () => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API}/save`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Data saving failed!');
		}
	} catch (error) {
		console.log(error);
	}
};

export default saveData;
