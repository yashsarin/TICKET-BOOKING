import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { API } from '../api/api';

const ShowContext = createContext<any>(null);

export const ShowProvider = ({ children }: {children:ReactNode}) => {
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShows = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get('/shows');
      setShows(res.data);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'ERR_NETWORK' || e.message === 'Network Error') {
        setError('Backend server is not running. Please start the API server at http://localhost:4000');
      } else {
        setError('Failed to load shows. ' + (e.response?.data?.message || e.message));
      }
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchShows(); }, []);

  return (
    <ShowContext.Provider value={{ shows, fetchShows, loading, error, setShows }}>
      {children}
    </ShowContext.Provider>
  );
};

export const useShows = () => {
  const ctx = useContext(ShowContext);
  if(!ctx) throw new Error('useShows must be used inside ShowProvider');
  return ctx;
};
