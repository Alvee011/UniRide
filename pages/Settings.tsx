
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { resetApp } = useApp();

  const handleRestore = () => {
      if(window.confirm("Are you sure you want to restore default settings? This will erase all your data.")){
          resetApp();
          alert("App restored to default settings.");
          navigate('/home');
      }
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="bg-white p-6 pt-8 sticky top-0 z-30 shadow-sm mb-4">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Settings</h1>
        </div>
      </div>

      <div className="px-6">
          <div className="bg-white rounded-3xl p-4 shadow-sm mb-8">
              <button 
                onClick={handleRestore}
                className="w-full flex items-center gap-4 py-3 group"
              >
                 <div className="p-3 bg-red-50 rounded-xl text-red-500 group-hover:scale-110 transition-transform">
                    <RotateCcw size={20} />
                 </div>
                 <div className="flex-1 text-left">
                    <h3 className="font-bold text-slate-800">Restore to default</h3>
                    <p className="text-xs text-gray-400">Reset app to initial state</p>
                 </div>
              </button>
          </div>

          <div className="flex flex-col items-center justify-center mt-16 text-center">
              <p className="text-sm font-bold text-slate-700">© 2025 UniRide</p>
              <p className="text-xs font-medium text-slate-400 mt-1">Designed By Faruque Azam Alvee</p>
          </div>
      </div>
    </div>
  );
};
