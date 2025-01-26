const API_URL = 'http://localhost:3000/api/data';

async function fetchData() {
try {
    const response = await fetch(API_URL);
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
      throw error
  }
}

async function createData(data) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
          headers: {
              'Content-Type': 'application/json',
        },
          body: JSON.stringify(data),
        });
      if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    return await response.json();
    } catch (error) {
        console.error('Error creating data:', error);
      throw error
    }
}

async function updateData(id, data) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
          },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating data:', error);
        throw error
    }
}

async function deleteData(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
}

async function fetchDataById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
      return await response.json();
    } catch (error) {
        console.error('Error fetching data by id:', error);
        throw error;
    }
}

export { fetchData, createData, updateData, deleteData, fetchDataById };
