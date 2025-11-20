
import React from 'react';
import { Home, Search, PlusCircle, User, MapPin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isModalOpen } = useApp();
  const path = location.pathname;

  // Hide navigation on onboarding, auth pages, or when a modal is open
  if (path === '/' || path === '/login' || path === '/signup' || isModalOpen) return null;

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: PlusCircle, label: 'Post', path: '/post', primary: true },
    { icon: MapPin, label: 'Map', path: '/trips' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-900 text-white px-6 py-4 rounded-t-3xl shadow-up z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
            // Check if path starts with item.path to keep active state for nested routes if any
            const isActive = path === item.path;
            
            if (item.primary) {
                return (
                    <button 
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="bg-primary-500 hover:bg-primary-400 text-white p-3 rounded-full -mt-8 shadow-lg border-4 border-gray-100 transition-transform hover:scale-105"
                    >
                        <item.icon size={28} />
                    </button>
                )
            }

            return (
                <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary-500' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    {/* <span className="text-[10px] font-medium">{item.label}</span> Optional label */}
                </button>
            );
        })}
      </div>
    </div>
  );
};
