import React, { useState, useEffect } from 'react';
import { fetchData, createData, updateData, deleteData, fetchDataById } from '../apiService';


function Joke() {
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedJoke, setEditedJoke] = useState({
    setup: '',
    punchline: ''
  })
  const [editedIp, setEditedIp] = useState('')

  const fetchJoke = async () => {
      setIsLoading(true);
      setError(null);
      try {
          const response = await fetch('http://localhost:3000/api/data/combined');
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setJoke(data);
      } catch (error) {
          setError(error);
      } finally {
          setIsLoading(false);
      }
  };

  const fetchDataList = async () => {
      setIsLoading(true);
      setError(null);
      try {
          const data = await fetchData();
          setDataList(data)
      } catch(error){
          setError(error)
      } finally{
          setIsLoading(false);
      }
  }

  useEffect(() => {
      fetchJoke();
      fetchDataList();
  }, []);

  const handleNewJoke = () => {
      fetchJoke();
  };
  const handleCreateData = async () => {
      setIsLoading(true);
      setError(null);
      try{
          const newJoke = {
              setup: "New Setup",
              punchline: "New Punchline"
          }
          const newIp = "127.0.0.1"
          const newData = await createData({joke: newJoke, ip:newIp});
          setDataList([...dataList, newData])
      } catch(error){
          setError(error)
      } finally{
          setIsLoading(false);
      }

  }
  const handleEditMode = async (id) => {
      setIsLoading(true);
      setError(null);
      try{
          const item = await fetchDataById(id);
          setEditedJoke(item.joke)
          setEditedIp(item.ip)
          setEditMode(true)
          setSelectedItemId(id)
        } catch (error){
          setError(error);
      } finally {
          setIsLoading(false);
      }
  }
  const handleSaveEditedItem = async () => {
      setIsLoading(true);
      setError(null)
      try {
          const updatedItem = await updateData(selectedItemId, { joke: editedJoke, ip: editedIp})
          setDataList(dataList.map(item => item.id === selectedItemId ? updatedItem : item))
          setEditMode(false);
          setSelectedItemId(null);
      } catch(error){
          setError(error);
      } finally{
          setIsLoading(false);
      }
  }
  const handleCancelEditMode = () => {
      setEditMode(false)
      setSelectedItemId(null)
  }
  const handleDeleteItem = async (id) => {
      setIsLoading(true);
      setError(null);
      try{
          await deleteData(id);
          setDataList(dataList.filter(item => item.id !== id))
      } catch(error){
          setError(error)
      } finally{
          setIsLoading(false)
      }
  }

  if (isLoading) {
    return <p className='isLoading'>Loading data...</p>
  }
  if(error){
    return <p className='error'>Error: {error.message}</p>
  }

  return (
    <div className="joke-container">
      <div className="joke-area">
        <div className='title'>RANDOM JOKES</div>
        {joke && (
          <>
            <div className="setup">Question: {joke.joke.setup}</div>
            <div className="punchline">Answer: {joke.joke.punchline}</div>
            <div className="ip">Your IP: {joke.ip}</div>
          </>
        )}
        <div className="main-buttons_container">
          <button onClick={handleNewJoke}>Get New Joke</button>
          <button onClick={handleCreateData}>Create New Joke</button>
        </div>
      </div>

      <div className="data-list-area">
        <div className='title'>MY JOKE LIST</div>
        <ul className="data-list">
          {dataList && dataList.map(item => (
            <li key={item.id} className="data-list-item">
              {editMode && selectedItemId === item.id ? (
                <div className="edit-item-container">
                    <input
                      type="text"
                      value={editedJoke.setup}
                      onChange={(e) => setEditedJoke({...editedJoke, setup: e.target.value})}
                    />
                    <input
                      type="text"
                      value={editedJoke.punchline}
                      onChange={(e) => setEditedJoke({...editedJoke, punchline: e.target.value})}
                    />
                    <div className="edit-buttons-container">
                        <button onClick={handleSaveEditedItem}>Save</button>
                        <button onClick={handleCancelEditMode}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="item-container">
                    <span className="item-text">Question: {item.joke.setup} Answer: {item.joke.punchline}</span>
                    <div className="item-buttons-container">
                        <button onClick={() => handleEditMode(item.id)}>Edit</button>
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Joke;