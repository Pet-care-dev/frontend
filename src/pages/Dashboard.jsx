import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:8001/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message?.includes('Welcome')) {
          const firstName = data.message.split(' ')[1].replace('!', '');
          setUser({
            name: firstName,
            pets: [], // replace with real pet data later if available
          });
        } else {
          navigate('/login');
        }
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  if (!user) return <div className="container">Loading user...</div>;

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="title">Dashboard</div>
        <div className="menu-icon" onClick={() => setShowSidebar(!showSidebar)}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      </header>

      {/* Sidebar */}
      {showSidebar && (
        <div className="sidebar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="User Avatar"
            className="avatar"
          />
          <h3>Name: {user.name}</h3>

          {user.pets?.length > 0 ? (
            <>
              <h4>Pets:</h4>
              <div className="pets">
                {user.pets.map((pet, index) => (
                  <div className="pet" key={index}>
                    <img src={pet.img} alt={pet.name} />
                    <p>{pet.name}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No pets added yet.</p>
          )}

          <button onClick={() => navigate('/add-pet')} className="sidebar-btn">
            Add Pet
          </button>

          <button className="sidebar-btn">Manage Profile</button>
          <button
            className="sidebar-btn logout"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Main Cards */}
      <div className="cards">
        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/3047/3047486.png" alt="Find vets" />
          <p className="label">Find vets</p>
        </div>
        <div className="card">
        <a
        href="http://localhost:5173"
        target=""
        rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046893.png" alt="Shop for pets" />
          <p className="label">Shop for pets</p>
        </a>
        </div>
        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Adopt a pet" />
          <p className="label">Adopt a pet</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">Find everything your furry friend needs!</footer>
      <div className="page-number">3</div>
    </div>
  );
};

export default Dashboard;
