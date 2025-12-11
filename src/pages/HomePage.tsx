import React from 'react';
import ShowList from '../components/ShowList';

export default function HomePage() {
  return (
    <div style={{padding:16}}>
      <h1>Available Shows / Trips</h1>
      <ShowList />
    </div>
  );
}
