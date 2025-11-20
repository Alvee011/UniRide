
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Banknote, CreditCard, Send, ChevronRight, Car, Bike } from 'lucide-react';
import { LocationInput } from '../components/LocationInput';
import { useApp } from '../context/AppContext';
import { Vehicle, Ride, PaymentMethod } from '../types';
import { CURRENT_USER } from '../constants';

export const PostRide: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicles, addRide, updateRide } = useApp();
  
  // Form State
  const [from, setFrom] = useState('Banasree');
  const [to, setTo] = useState('IUB');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('17:00');
  const [seats, setSeats] = useState(3);
  const [price, setPrice] = useState(150);
  // Default none selected as requested
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);
  
  // Vehicle State - Default to first vehicle if available
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleSelector, setShowVehicleSelector] = useState(false);

  // Refs for programmatically opening pickers
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  // Initialize vehicle
  useEffect(() => {
    if (vehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(vehicles[0]);
    }
  }, [vehicles]);

  // Check for Edit Mode (Data passed via navigation)
  useEffect(() => {
    if (location.state && location.state.ride) {
        const { ride } = location.state;
        setFrom(ride.from);
        setTo(ride.to);
        setPrice(ride.price);
        setSeats(ride.availableSeats);
        if (ride.selectedDays) setSelectedDays(ride.selectedDays);
        
        // Attempt to parse time for the input
        // Assuming ride.departureTime is like "08:15 AM"
        try {
          const timeParts = ride.departureTime.split(' '); // ["08:15", "AM"]
          if(timeParts.length === 2) {
             let [hours, minutes] = timeParts[0].split(':');
             let h = parseInt(hours);
             if (timeParts[1] === 'PM' && h !== 12) h += 12;
             if (timeParts[1] === 'AM' && h === 12) h = 0;
             setTime(`${h.toString().padStart(2, '0')}:${minutes}`);
          } else {
             // If format is just HH:mm without AM/PM or different
             setTime(ride.departureTime); 
          }
        } catch (e) {
          // Fallback
          setTime('08:00');
        }
    }
  }, [location.state]);

  // Updated days array to start with Sunday
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
        setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
        setSelectedDays([...selectedDays, day]);
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

  const handlePostRide = () => {
    if (!selectedVehicle) {
        alert("Please add a vehicle in settings first!");
        navigate('/vehicles');
        return;
    }

    const newRide: Ride = {
      id: location.state?.ride?.id || `ride_${Date.now()}`,
      driver: CURRENT_USER,
      car: {
        model: selectedVehicle.model,
        plate: selectedVehicle.plate,
        color: selectedVehicle.color,
        image: selectedVehicle.image
      },
      from,
      to,
      departureTime: formatTimeDisplay(time),
      price,
      currency: 'BDT',
      availableSeats: seats,
      totalSeats: 4, // assuming standard car
      duration: '45 mins', // calculated
      selectedDays: selectedDays // Save selected days
    };

    if (location.state?.ride) {
      updateRide(newRide);
      alert("Ride Updated Successfully!");
    } else {
      addRide(newRide);
      alert("Ride Posted Successfully!");
    }
    
    navigate('/home');
  };

  // Helper to trigger native pickers safely
  const openPicker = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current && 'showPicker' in ref.current) {
        try {
            (ref.current as any).showPicker();
        } catch (e) {
            // fallback is standard click, which happens via label/input stack
        }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      {/* Header */}
      <div className="bg-white p-6 pt-8 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-lg font-bold text-slate-800">
                {location.state?.ride ? 'Edit Ride' : 'Post Ride'}
            </h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Location */}
        <LocationInput 
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
            readOnly={false}
        />

        {/* Date & Time */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
            <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Departure</p>
            <div className="flex gap-4">
                {/* DATE INPUT */}
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

                {/* TIME INPUT */}
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

        {/* Seats Slider */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Seats Available</p>
                 <span className="text-lg font-bold text-slate-800">{seats}</span>
            </div>
            <input 
                type="range" 
                min="1" 
                max="6" 
                value={seats} 
                onChange={(e) => setSeats(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
            </div>
        </div>

        {/* Price & Vehicle Selection */}
        <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-3xl shadow-sm flex flex-col justify-between">
                <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Price per Seat</p>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                    <span className="font-bold text-slate-800 pl-1 text-lg">৳</span>
                    <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                        className="bg-transparent w-full text-right font-bold text-slate-800 text-lg outline-none mx-2 no-scrollbar appearance-none"
                    />
                    <span className="text-xs font-bold bg-white px-2 py-1 rounded shadow-sm text-slate-600">BDT</span>
                </div>
            </div>

            <div className="bg-white p-4 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle</p>
                     <button 
                        onClick={() => navigate('/vehicles')}
                        className="text-[10px] text-primary-500 font-bold hover:underline bg-primary-50 rounded px-2 py-1"
                     >
                        Manage Vehicles
                     </button>
                </div>
                
                {selectedVehicle ? (
                    <div 
                        onClick={() => setShowVehicleSelector(!showVehicleSelector)}
                        className="bg-gray-50 p-3 rounded-xl flex items-center gap-3 cursor-pointer border border-transparent hover:border-primary-200 transition-all"
                    >
                        <div className="w-12 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm overflow-hidden">
                             {selectedVehicle.image ? (
                                 <img src={selectedVehicle.image} className="w-full h-full object-cover" alt="vehicle" />
                             ) : (
                                 selectedVehicle.type === 'Car' ? <Car size={16} /> : <Bike size={16} />
                             )}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-800 text-sm">{selectedVehicle.model}</p>
                            <p className="text-[10px] text-gray-500">{selectedVehicle.plate}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                    </div>
                ) : (
                    <div onClick={() => navigate('/vehicles')} className="bg-red-50 p-4 rounded-xl border border-red-100 text-center cursor-pointer">
                        <p className="text-sm text-red-500 font-medium">No vehicles found.</p>
                        <p className="text-xs text-red-400">Click to add a vehicle</p>
                    </div>
                )}

                {/* Dropdown for switching vehicles */}
                {showVehicleSelector && vehicles.length > 0 && (
                    <div className="mt-2 space-y-2 border-t border-gray-100 pt-2">
                        {vehicles.map(v => (
                            <div 
                                key={v.id}
                                onClick={() => {
                                    setSelectedVehicle(v);
                                    setShowVehicleSelector(false);
                                }}
                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selectedVehicle?.id === v.id ? 'bg-primary-50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="text-xs font-bold flex-1">{v.model}</div>
                                {selectedVehicle?.id === v.id && <div className="w-2 h-2 rounded-full bg-primary-500"></div>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Repeat Days */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" checked readOnly className="accent-primary-500 w-4 h-4" />
                <span className="text-sm font-bold text-slate-800">Repeat</span>
            </div>
            <div className="flex justify-between gap-1">
                {days.map(day => {
                    const isSelected = selectedDays.includes(day);
                    return (
                        <button 
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`w-8 h-8 rounded-full text-[10px] font-bold transition-all ${isSelected ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                        >
                            {day.charAt(0)}
                        </button>
                    )
                })}
            </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
            <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Preferred Payment Method</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                <button 
                    onClick={() => setPaymentMethod(PaymentMethod.CASH)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${paymentMethod === PaymentMethod.CASH ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                    <Banknote size={14} /> Cash
                </button>
                <button 
                    onClick={() => setPaymentMethod(PaymentMethod.CARD)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${paymentMethod === PaymentMethod.CARD ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                    <CreditCard size={14} /> Cards
                </button>
                <button 
                    onClick={() => setPaymentMethod(PaymentMethod.BKASH)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${paymentMethod === PaymentMethod.BKASH ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-600 border border-pink-100 hover:bg-pink-100'}`}
                >
                    <Send size={14} /> Bkash
                </button>
            </div>
        </div>

        {/* Submit Button */}
        <button 
            onClick={handlePostRide}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-slate-300 hover:bg-slate-800 transition-all active:scale-95"
        >
            {location.state?.ride ? 'Update Ride' : 'Post Ride'}
        </button>

      </div>
    </div>
  );
};