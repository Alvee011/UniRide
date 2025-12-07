import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Car } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

      <div className="flex-1 flex flex-col justify-center items-center px-8 z-10">
        
        {/* Illustration */}
        <div className="w-full max-w-xs aspect-square relative mb-12 flex items-center justify-center">
            <img 
                src="https://res.cloudinary.com/dhkjgite9/image/upload/v1763823811/homescreenlogo_brw9xc.png" 
                alt="Car Sharing Illustration"
                className="w-full h-auto object-contain drop-shadow-xl mix-blend-multiply" 
            />
        </div>

        <div className="text-center max-w-xs mx-auto">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Car className="text-primary-500" size={28} />
            <h1 className="text-2xl font-bold text-slate-900">GoCab</h1>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
            Share rides easily with <span className="text-primary-500">GoCab</span>
          </h2>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-12">
            Share your rides daily while commuting to save money and reduce pollution.
          </p>
        </div>

        <button 
          onClick={() => navigate('/home')}
          className="bg-primary-500 hover:bg-primary-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 transition-all hover:scale-105 active:scale-95"
        >
          <ArrowRight size={28} />
        </button>
      </div>
    </div>
  );
};