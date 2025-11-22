
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, DollarSign } from 'lucide-react';
import { LocationInput } from '../components/LocationInput';
import { useApp } from '../context/AppContext';
import { CURRENT_USER } from '../constants';
import { Opportunity } from '../types';

export const ScheduleTrip: React.FC = () => {
  const navigate = useNavigate();
  const { addOpportunity } = useApp();
  
  const [from, setFrom] = useState('Banasree');
  const [to, setTo] = useState('IUB');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState(150);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const openPicker = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current && 'showPicker' in ref.current) {
        try {
            (ref.current as any).showPicker();
        } catch (e) {}
    }
  };

  const formatTimeDisplay = (timeStr: string) => {
    if (!timeStr) return 'Select Time';
    try {
        const [h, m] = timeStr.split(':');
        const hour = parseInt(h);
        if (isNaN(hour)) return 'Select Time';
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${m} ${ampm}`;
    } catch (e) {
        return timeStr;
    }
  };

  const handleSubmit = () => {
    const newOpportunity: Opportunity = {
        id: `opt_${Date.now()}`,
        passenger: CURRENT_USER,
        from,
        to,
        date,
        time: formatTimeDisplay(time),
        seats,
        price,
        status: 'open'
    };
    
    addOpportunity(newOpportunity);
    alert('Trip Scheduled! Drivers will see your request in Opportunities.');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white p-6 pt-8 sticky top-0 z-30 shadow-sm mb-4">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Schedule Trip</h1>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <LocationInput 
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
        />

        <div className="bg-white p-4 rounded-3xl shadow-sm">
             <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">When</p>
             <div className="flex gap-4">
                {/* DATE */}
                <div 
                    className="flex-1 bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
                    onClick={() => openPicker(dateInputRef)}
                >
                    <Calendar size={18} className="text-slate-500 shrink-0 relative z-10 pointer-events-none" />
                    <input 
                        ref={dateInputRef}
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-800 truncate relative z-10 pointer-events-none">
                        {date ? new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Select Date'}
                    </span>
                </div>

                {/* TIME */}
                <div 
                    className="flex-1 bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
                    onClick={() => openPicker(timeInputRef)}
                >
                    <Clock size={18} className="text-slate-500 shrink-0 relative z-10 pointer-events-none" />
                    <input 
                        ref={timeInputRef}
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-800 z-10 pointer-events-none">
                        {formatTimeDisplay(time)}
                    </span>
                </div>
            </div>
        </div>

        {/* Seats & Price */}
        <div className="flex gap-4">
             <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm">
                <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Seats Needed</p>
                <div className="flex items-center gap-3">
                    <User size={20} className="text-slate-400" />
                    <select 
                        value={seats} 
                        onChange={(e) => setSeats(parseInt(e.target.value))}
                        className="bg-transparent font-bold text-lg text-slate-800 outline-none w-full"
                    >
                        {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
             </div>

             <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm">
                <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Offer Price</p>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-slate-800">৳</span>
                    <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                        className="w-full bg-transparent font-bold text-lg text-slate-800 outline-none"
                    />
                </div>
             </div>
        </div>

        <button 
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-slate-300 hover:bg-slate-800 transition-all active:scale-95"
        >
            Request Ride
        </button>
      </div>
    </div>
  );
};
