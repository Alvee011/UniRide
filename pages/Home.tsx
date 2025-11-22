
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, MapPin, Clock, ArrowRight, Car, PlusCircle, Bike, Star, GraduationCap, Calendar, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CURRENT_USER } from '../constants';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { unreadCount } = useApp();
  
  // Sheet state: percentage of screen height
  // Default to 83% as requested (Top 17% Map)
  const [sheetHeight, setSheetHeight] = useState(83); 
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  
  // Drag tracking refs
  const dragStartY = useRef(0);
  const startHeight = useRef(0);

  // Dynamic Greeting State
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };
    
    updateGreeting();
    // Update periodically in case app stays open across time boundaries
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartY.current = e.touches[0].clientY;
    startHeight.current = sheetHeight;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - dragStartY.current; // Positive = moving down
    const windowHeight = window.innerHeight;
    
    // Convert delta pixel to percentage
    // Moving down (positive delta) decreases height
    const deltaPercentage = (deltaY / windowHeight) * 100;
    
    let newHeight = startHeight.current - deltaPercentage;
    
    // Constraints
    if (newHeight > 92) newHeight = 92; // Max height (leave a sliver of map)
    if (newHeight < 30) newHeight = 30; // Min height (collapsed view)
    
    setSheetHeight(newHeight);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Snap logic
    if (sheetHeight > 60) {
        setSheetHeight(83); // Snap to expanded (17% map visible)
    } else {
        setSheetHeight(40); // Snap to collapsed
    }
  };

  // Dynamic style for the sheet
  const sheetStyle = {
    height: `${sheetHeight}%`,
    transition: isDragging ? 'none' : 'height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
  };

  return (
    <div className="h-screen w-full bg-white relative overflow-hidden">
      
      {/* 1. Full Screen Map Background */}
      {/* It stays fixed at the back. When sheet moves down, more map is revealed. */}
      <div className="absolute inset-0 z-0 bg-slate-100">
        <div className="w-full h-full relative opacity-90">
            <img 
                src="https://static-maps.yandex.ru/1.x/?lang=en-US&ll=90.4125,23.8103&z=14&l=map&size=600,800"
                alt="Map Background" 
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dhaka_City_Map.jpg/600px-Dhaka_City_Map.jpg"; 
                }}
            />
            {/* Gradient overlay for text readability at top */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* 2. Floating Header (Always visible on top of map) */}
      <div className="absolute top-0 left-0 right-0 pt-12 px-6 flex justify-between items-start z-10 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
            <div className="bg-white p-0.5 rounded-full shadow-md active:scale-95 transition-transform cursor-pointer" onClick={() => navigate('/profile')}>
                <img 
                    src={CURRENT_USER.avatar} 
                    alt="User" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white" 
                />
            </div>
            <div className="bg-white/80 backdrop-blur-md py-1.5 px-4 rounded-full shadow-sm">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{greeting}</p>
                <h1 className="text-sm font-bold text-slate-800">Alvee</h1>
            </div>
        </div>
        
        <button 
            onClick={() => navigate('/notifications')}
            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-700 relative active:scale-95 transition-transform pointer-events-auto"
        >
            <Bell size={20} />
            {unreadCount > 0 && (
                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
            )}
        </button>
      </div>

      {/* 3. Draggable Bottom Sheet */}
      <div 
        ref={sheetRef}
        style={sheetStyle}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.15)] z-20 flex flex-col"
      >
        {/* Drag Handle Area */}
        <div 
            className="w-full flex items-center justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing touch-none shrink-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => {
                // Tap toggle functionality
                if (sheetHeight < 60) setSheetHeight(83);
            }}
        >
            {/* The Handle Indicator */}
            <div className="w-14 h-1.5 bg-gray-200 rounded-full"></div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-28 pt-2">
            
            {/* Hero Search Trigger */}
            <button 
                onClick={() => navigate('/search')}
                className="w-full bg-gray-50 hover:bg-gray-100 transition-colors rounded-3xl p-4 flex items-center gap-4 mb-8 group border border-gray-100 shadow-sm"
            >
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0">
                    <Search size={24} strokeWidth={3} />
                </div>
                <div className="flex-1 text-left">
                    <h2 className="text-xl font-bold text-slate-800">Where to?</h2>
                    <p className="text-sm text-slate-500 font-medium">Find a ride nearby</p>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 shadow-sm border border-gray-100">
                    Now
                </div>
            </button>

            {/* Saved Places / Suggestions */}
            <div className="mb-8">
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
                    <button onClick={() => navigate('/search')} className="flex flex-col items-center gap-2 min-w-[4.5rem] group">
                        <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 group-active:scale-95 transition-all border border-blue-100 shadow-sm">
                            <MapPin size={28} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Home</span>
                    </button>

                    <button onClick={() => navigate('/search')} className="flex flex-col items-center gap-2 min-w-[4.5rem] group">
                        <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 group-active:scale-95 transition-all border border-emerald-100 shadow-sm">
                            <Star size={28} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Work</span>
                    </button>
                    
                    <button onClick={() => navigate('/search')} className="flex flex-col items-center gap-2 min-w-[4.5rem] group">
                        <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 group-active:scale-95 transition-all border border-indigo-100 shadow-sm">
                            <GraduationCap size={28} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">University</span>
                    </button>

                    <button onClick={() => navigate('/search')} className="flex flex-col items-center gap-2 min-w-[4.5rem] group">
                        <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-slate-600 group-active:scale-95 transition-all border border-gray-100 shadow-sm">
                            <Clock size={28} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Recent</span>
                    </button>
                </div>
            </div>

            {/* Services Grid */}
            <h3 className="text-lg font-bold text-slate-900 mb-4">Services</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
                {/* Find Ride */}
                <div 
                    onClick={() => navigate('/search')}
                    className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm relative overflow-hidden group cursor-pointer min-h-[140px] flex flex-col justify-between"
                >
                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-primary-50 rounded-full transition-transform group-hover:scale-150"></div>
                    <div className="relative z-10">
                         <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-3">
                            <Car size={20} className="absolute" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h4 className="font-bold text-slate-800 text-lg leading-tight">Get a<br/>Ride</h4>
                    </div>
                    <div className="absolute bottom-5 right-5 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight size={20} />
                    </div>
                </div>

                {/* Offer Ride */}
                <div 
                    onClick={() => navigate('/post')}
                    className="bg-slate-900 p-5 rounded-3xl shadow-lg shadow-slate-200 relative overflow-hidden group cursor-pointer min-h-[140px] flex flex-col justify-between"
                >
                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-slate-800 rounded-full transition-transform group-hover:scale-150 opacity-50"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center mb-3 border border-slate-700">
                            <PlusCircle size={20} />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h4 className="font-bold text-white text-lg leading-tight">Offer<br/>Ride</h4>
                    </div>
                </div>

                {/* Nearby Trips (Formerly Activity) */}
                <div 
                    onClick={() => navigate('/my-rides')}
                    className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
                >
                    <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                        <Bike size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Nearby Trips</h4>
                    </div>
                </div>

                {/* Vehicles */}
                <div 
                    onClick={() => navigate('/vehicles')}
                    className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
                >
                    <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center shrink-0">
                        <Car size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">My Car</h4>
                    </div>
                </div>

                {/* Schedule Trip */}
                <div 
                    onClick={() => navigate('/schedule-trip')}
                    className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
                >
                    <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center shrink-0">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Schedule Trip</h4>
                    </div>
                </div>

                {/* Opportunities */}
                <div 
                    onClick={() => navigate('/opportunities')}
                    className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
                >
                    <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Opportunities</h4>
                    </div>
                </div>
            </div>

            {/* Promo Banner */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
                <div className="relative z-10 w-3/4">
                    <h3 className="font-bold text-xl mb-2">Invite Friends</h3>
                    <p className="text-sm text-indigo-100 mb-4 leading-relaxed">Get 50% off your next ride by inviting friends to UniRide.</p>
                    <button className="bg-white text-indigo-600 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md active:scale-95 transition-transform">
                        Invite Now
                    </button>
                </div>
                {/* Decor */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute top-6 right-6 text-white/20 rotate-12">
                    <Star size={64} fill="currentColor" />
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
