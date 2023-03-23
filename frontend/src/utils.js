export const saveData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/save`, {
        method: 'POST',
    });
    if (response.ok) {
        alert('Data saved');
    } else {
        alert('Error saving data');
    }
};