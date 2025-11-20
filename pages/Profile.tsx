
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, History, Bell, Settings, LogOut, Star, ChevronRight, Shield, CircleUser, Car, MapPin, Users } from 'lucide-react';
import { CURRENT_USER } from '../constants';

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: MapPin, label: 'My Rides', color: 'text-primary-500', bg: 'bg-primary-50', path: '/my-rides' },
    { icon: Users, label: 'Ride Requests', color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/ride-requests' },
    { icon: Car, label: 'Vehicle Details', color: 'text-blue-500', bg: 'bg-blue-50', path: '/vehicles' },
    { icon: History, label: 'Ride History', color: 'text-purple-500', bg: 'bg-purple-50', path: '/history' },
    { icon: Bell, label: 'Notifications', color: 'text-orange-500', bg: 'bg-orange-50', path: '/notifications' },
    { icon: Shield, label: 'Safety & Privacy', color: 'text-green-500', bg: 'bg-green-50', path: '/privacy' },
    { icon: Settings, label: 'Settings', color: 'text-gray-500', bg: 'bg-gray-100', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header Background */}
      <div className="bg-slate-900 pb-20 pt-8 px-6 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50"></div>
        
        <div className="flex items-center justify-between relative z-10 text-white mb-6">
          <button onClick={() => navigate('/home')} className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">My Profile</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        <div className="flex flex-col items-center relative z-10">
          <div className="relative mb-4">
             <img 
                src={CURRENT_USER.avatar} 
                alt={CURRENT_USER.name} 
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
             />
             <div className="absolute bottom-0 right-0 bg-primary-500 text-white p-1.5 rounded-full border-4 border-slate-900">
                <Star size={16} fill="currentColor" />
             </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{CURRENT_USER.name}</h2>
          <p className="text-slate-400 text-sm">user.alvee@gmail.com</p>
          
          <div className="flex gap-6 mt-6 w-full max-w-xs justify-center">
              <div className="text-center">
                  <span className="block text-xl font-bold text-white">4.9</span>
                  <span className="text-xs text-slate-400">Rating</span>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center">
                  <span className="block text-xl font-bold text-white">124</span>
                  <span className="text-xs text-slate-400">Trips</span>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center">
                  <span className="block text-xl font-bold text-white">2.5</span>
                  <span className="text-xs text-slate-400">Years</span>
              </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-6 -mt-8 relative z-10 space-y-4">
         <div className="bg-white p-4 rounded-3xl shadow-soft">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-full text-gray-600">
                    <CircleUser size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-slate-800">Personal Info</h3>
                    <p className="text-xs text-gray-400">Edit your name and details</p>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
            </div>
            
            <hr className="border-gray-100 mb-2" />

            {menuItems.map((item, idx) => (
                <button 
                    key={idx} 
                    onClick={() => item.path && navigate(item.path)}
                    className="w-full flex items-center gap-4 py-3.5 group"
                >
                    <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} transition-transform group-hover:scale-110`}>
                        <item.icon size={20} />
                    </div>
                    <span className="flex-1 text-left font-semibold text-slate-700 text-sm">{item.label}</span>
                    <ChevronRight size={18} className="text-gray-300" />
                </button>
            ))}
         </div>

         <button 
            onClick={() => navigate('/login')}
            className="w-full bg-white p-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 transition-colors"
         >
            <LogOut size={20} />
            Log Out
         </button>
      </div>
    </div>
  );
};