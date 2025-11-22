
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { PostRide } from './pages/PostRide';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { MyRides } from './pages/MyRides';
import { VehicleDetails } from './pages/VehicleDetails';
import { Trips } from './pages/Trips';
import { RideRequests } from './pages/RideRequests';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="max-w-md mx-auto bg-gray-100 min-h-screen shadow-2xl relative">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post" element={<PostRide />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-rides" element={<MyRides />} />
            <Route path="/ride-requests" element={<RideRequests />} />
            <Route path="/vehicles" element={<VehicleDetails />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Navigation />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;