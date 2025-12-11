import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api/api';
import SeatGrid from '../components/SeatGrid';

export default function BookingPage() {
  const { id } = useParams();
  const [show, setShow] = useState<any>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/shows/${id}`);
        setShow(res.data);
        setSelected([]);
      } catch (e: any) {
        if (e.code === 'ERR_NETWORK' || e.message === 'Network Error') {
          setError('Backend server is not running. Please start the API server at http://localhost:4000');
        } else {
          setError('Failed to load show. ' + (e.response?.data?.message || e.message));
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const confirmBooking = async () => {
    if (selected.length === 0) return alert('Select seats');
    try {
      const resp = await API.post(`/shows/${id}/book`, { seats: selected, userName: 'Guest' });
      alert('Booking confirmed! ' + JSON.stringify(resp.data));
      const updated = await API.get(`/shows/${id}`);
      setShow(updated.data);
      setSelected([]);
    } catch (e:any) {
      if (e.code === 'ERR_NETWORK' || e.message === 'Network Error') {
        alert('Backend server is not running. Please start the API server at http://localhost:4000');
      } else {
        alert(e.response?.data?.message || e.message || 'Failed to book seats');
      }
    }
  };

  if(loading) return <div>Loading...</div>;
  if(error) {
    return (
      <div style={{padding:16}}>
        <div style={{padding:16,background:'#ffebee',border:'1px solid #f44336',borderRadius:4,color:'#c62828'}}>
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }
  if(!show) return <div>Show not found</div>;

  const seats = Array.from({length: show.totalSeats || 0}, (_,i)=>i+1);
  const booked = show.bookedSeats || [];

  return (
    <div style={{padding:16}}>
      <h2>{show.name}</h2>
      <div>Start: {show.startTime}</div>
      <div style={{marginTop:12}}>
        <SeatGrid seats={seats} booked={booked} selected={selected} onSelect={setSelected} />
      </div>
      <div style={{marginTop:12}}>
        <button onClick={confirmBooking}>Confirm Booking ({selected.length})</button>
      </div>
    </div>
  );
}
