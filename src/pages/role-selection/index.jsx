import React from 'react';
import './index.css';
import '../../App.css';

const RoleSelector = () => {
  const handleRoleSelection = (role) => {
    alert(`Selected ${role}`);
  };

  return (
    <div className="role-selector container">
      <div className="card" onClick={() => handleRoleSelection('Customer')}>
        <div className="icon">&#128100;</div>
        <h2>Customer</h2>
        <p className="description">View and book badminton courts.</p>
      </div>
      <div className="card" onClick={() => handleRoleSelection('Court Owner')}>
        <div className="icon">&#128104;&#8205;&#127979;</div>
        <h2>Court Owner</h2>
        <p className="description">Create and manage courts for customers to book.</p>
      </div>
    </div>
  );
};

export default RoleSelector;
