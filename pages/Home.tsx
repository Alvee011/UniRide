
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Grip, Navigation as NavIcon, Search as SearchIcon } from 'lucide-react';
import { RideCard } from '../components/RideCard';
import { useApp } from '../context/AppContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { rides } = useApp();

  return (
    <div className="h-screen flex flex-col bg-gray-100 relative overflow-hidden">
      
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-12 px-6 pb-4 bg-gradient-to-b from-white/90 to-transparent pointer-events-none">
         <div className="flex justify-between items-center pointer-events-auto">
            <button className="p-2 bg-white rounded-xl shadow-sm text-slate-700">
                <Grip size={20} />
            </button>
            <div className="flex gap-2">
                <button className="p-2 bg-white rounded-xl shadow-sm text-slate-700 relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
         </div>
      </div>

      {/* Map Background (Dhaka) */}
      <div className="absolute inset-0 z-0 bg-slate-200">
        <img 
            src="https://static-maps.yandex.ru/1.x/?lang=en-US&ll=90.4125,23.8103&z=12&l=map&size=600,900"
            alt="Dhaka Map Background" 
            className="w-full h-full object-cover opacity-60 grayscale"
            onError={(e) => {
                // Fallback to generic map if static map fails
                e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dhaka_City_Map.jpg/600px-Dhaka_City_Map.jpg"; 
                e.currentTarget.style.opacity = "0.3";
            }}
        />
        
        {/* Map Markers (Dynamic based on rides usually, but static for visual demo) */}
        {rides.length > 0 && (
            <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-slate-900 text-white p-1 rounded-full shadow-lg flex flex-col items-center">
                    <img src={rides[0].driver.avatar} className="w-8 h-8 rounded-full border-2 border-white" alt="driver" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-900 mt-1"></div>
                </div>
            </div>
        )}

        {rides.length > 1 && (
             <div className="absolute top-1/2 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white text-slate-900 p-1 rounded-full shadow-lg border border-gray-200 flex flex-col items-center">
                     <img src={rides[1].driver.avatar} className="w-8 h-8 rounded-full" alt="driver" />
                     <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white mt-1"></div>
                </div>
            </div>
        )}
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col h-full justify-end pb-24">
        
        {/* Search Bar */}
        <div className="px-6 mb-4">
            <div 
                onClick={() => navigate('/search')}
                className="bg-white rounded-2xl p-4 shadow-soft flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
            >
                <div className="text-slate-400">
                    <SearchIcon size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-700">Where are you going?</h3>
                </div>
                <div className="bg-gray-100 p-2 rounded-full text-slate-400">
                   <NavIcon size={16} />
                </div>
            </div>
        </div>

        {/* Nearby Rides Sheet */}
        <div className="bg-white rounded-t-3xl shadow-up p-6 pb-8 min-h-[40vh]">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
            
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-lg font-bold text-slate-800">Nearby Rides</h2>
                <button className="text-primary-500 text-sm font-semibold" onClick={() => navigate('/search')}>View All</button>
            </div>

            <div className="flex flex-col gap-4">
                {rides.slice(0, 2).map(ride => (
                    <RideCard key={ride.id} ride={ride} compact />
                ))}
                {rides.length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-4">No rides available right now.</p>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};
