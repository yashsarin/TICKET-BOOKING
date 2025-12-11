import React, { useState } from 'react';
import { API } from '../api/api';
import { useShows } from '../context/ShowContext';

export default function AdminForm() {
  const { fetchShows } = useShows();
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [totalSeats, setTotalSeats] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    if (!name || !startTime) {
      setError('Please fill in all required fields');
      return;
    }
    setError(null);
    setSuccess(false);
    try {
      await API.post('/shows', { name, startTime, totalSeats: totalSeats === '' ? undefined : totalSeats });
      setName(''); 
      setStartTime(''); 
      setTotalSeats('');
      setSuccess(true);
      fetchShows();
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) {
      if (e.code === 'ERR_NETWORK' || e.message === 'Network Error') {
        setError('Backend server is not running. Please start the API server at http://localhost:4000');
      } else {
        setError(e.response?.data?.message || e.message || 'Failed to create show');
      }
    }
  };

  return (
    <div style={{padding:12,border:'1px solid #ddd',marginBottom:12}}>
      <h3>Create Show / Trip</h3>
      {error && (
        <div style={{padding:8,marginBottom:8,background:'#ffebee',border:'1px solid #f44336',borderRadius:4,color:'#c62828'}}>
          {error}
        </div>
      )}
      {success && (
        <div style={{padding:8,marginBottom:8,background:'#e8f5e9',border:'1px solid #4caf50',borderRadius:4,color:'#2e7d32'}}>
          Show created successfully!
        </div>
      )}
      <input placeholder="Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} style={{width:'100%',padding:8,marginBottom:8}} />
      <br/>
      <input type="datetime-local" value={startTime} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setStartTime(e.target.value)} style={{width:'100%',padding:8,marginBottom:8}} />
      <br/>
      <input type="number" placeholder="Total seats" value={totalSeats as any} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setTotalSeats(e.target.value ? Number(e.target.value) : '')} style={{width:'100%',padding:8,marginBottom:8}} />
      <br/>
      <button onClick={submit} style={{padding:8,minWidth:100}}>Create</button>
    </div>
  );
}
