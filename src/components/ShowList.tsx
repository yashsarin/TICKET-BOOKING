import React from 'react';
import { Link } from 'react-router-dom';
import { useShows } from '../context/ShowContext';

export default function ShowList() {
  const { shows, loading, error } = useShows();
  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div style={{padding:16,background:'#ffebee',border:'1px solid #f44336',borderRadius:4,color:'#c62828'}}>
        <strong>Error:</strong> {error}
      </div>
    );
  }
  if (!shows || shows.length === 0) return <div>No shows available</div>;
  return (
    <div>
      {shows.map((s:any)=>(
        <div key={s.id} style={{padding:8,borderBottom:'1px solid #eee'}}>
          <div><strong>{s.name}</strong></div>
          <div>{s.startTime}</div>
          <Link to={`/booking/${s.id}`}>Book / View</Link>
        </div>
      ))}
    </div>
  );
}
