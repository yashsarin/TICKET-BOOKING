import React from 'react';
import AdminForm from '../components/AdminForm';
import ShowList from '../components/ShowList';

export default function AdminPage() {
  return (
    <div style={{padding:16}}>
      <h1>Admin Dashboard</h1>
      <AdminForm />
      <h2>All Shows</h2>
      <ShowList />
    </div>
  );
}
