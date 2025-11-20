
import React, { useState, useEffect } from 'react';
import { Ride, RideRequest } from '../types';
import { Phone, User as UserIcon, MoreHorizontal, X, Calendar, Clock, MapPin, Navigation as NavigationIcon, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface RideCardProps {
  ride: Ride;
  compact?: boolean;
}

export const RideCard: React.FC<RideCardProps> = ({ ride, compact = false }) => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  // Store array of selected Full Date strings
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const { setModalOpen, sendRequest } = useApp();
  const navigate = useNavigate();

  // Reset modal state on unmount
  useEffect(() => {
    return () => setModalOpen(false);
  }, []);

  const handleOpenModal = () => {
    setShowRequestModal(true);
    setModalOpen(true);
    // Reset selections when opening
    setSelectedDates([]);
    setPickupLocation('');
    setDropoffLocation('');
  };

  const handleCloseModal = () => {
    setShowRequestModal(false);
    setModalOpen(false);
  };

  const toggleDateSelection = (fullDate: string, isAvailable: boolean) => {
    if (!isAvailable) return; // Cannot select unavailable dates

    if (selectedDates.includes(fullDate)) {
        setSelectedDates(selectedDates.filter(d => d !== fullDate));
    } else {
        setSelectedDates([...selectedDates, fullDate]);
    }
  };

  // Generate next 14 days for selection
  const availableDates = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Check if day is in the ride's selected days (if specific days are set)
      const isAvailable = ride.selectedDays && ride.selectedDays.length > 0 
          ? ride.selectedDays.includes(dayName) 
          : true;

      return {
          dateObj: d,
          day: dayName,
          date: d.getDate(),
          fullDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          fullDay: d.toLocaleDateString('en-US', { weekday: 'long' }),
          isAvailable: isAvailable
      };
  });

  const handleConfirmRequest = () => {
    if (selectedDates.length === 0) {
        alert("Please select at least one available date (Green).");
        return;
    }

    if (!pickupLocation.trim()) {
        alert("Please enter a pickup location.");
        return;
    }

    if (!dropoffLocation.trim()) {
        alert("Please enter a dropoff location.");
        return;
    }

    const newRequest: RideRequest = {
        id: `req_${Date.now()}`,
        rideId: ride.id,
        passenger: {
            name: 'Orin', 
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100'
        },
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
        requestedDates: selectedDates,
        status: 'pending'
    };

    sendRequest(newRequest);
    alert('Requests sent successfully! The driver will be notified.');
    handleCloseModal();
  };

  return (
    <>
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-4">
        {/* Header: Driver Info & Action */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                  src={ride.driver.avatar} 
                  alt={ride.driver.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {/* Online indicator could go here */}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{ride.driver.name}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>{ride.car.model}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center">
                      {/* Star Icon could go here */}
                      {ride.driver.rating} ★
                  </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
              <button 
                onClick={handleOpenModal}
                className="bg-dark-900 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                  Request
              </button>
              <a 
                href={`tel:${ride.driver.phone || '+8801727828730'}`}
                className="bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors flex items-center justify-center"
              >
                  <Phone size={16} fill="currentColor" />
              </a>
          </div>
        </div>

        {/* Route Visual */}
        <div className="relative pl-2 mb-4">
          {/* Vertical Line */}
          <div className="absolute left-[11px] top-2 bottom-6 w-0.5 border-l-2 border-dashed border-gray-300"></div>

          {/* From */}
          <div className="flex items-start gap-4 mb-4 relative z-10">
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-dark-900 shrink-0"></div>
              <div className="flex-1 flex justify-between">
                  <span className="text-sm font-medium text-slate-800">{ride.from}</span>
                  <span className="text-xs text-gray-500">{ride.departureTime}</span>
              </div>
          </div>

          {/* To */}
          <div className="flex items-start gap-4 relative z-10">
              <div className="mt-1 w-2.5 h-2.5 rounded-full border-2 border-primary-500 bg-white shrink-0"></div>
              <div className="flex-1 flex justify-between">
                  <span className="text-sm font-medium text-slate-800">{ride.to}</span>
                  <span className="text-xs text-gray-500">{parseInt(ride.departureTime) + 1}:00 {ride.departureTime.slice(-2)}</span>
              </div>
          </div>
        </div>

        {/* Footer: Price & Seats */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-50">
          <div>
              <span className="block text-lg font-bold text-slate-800">৳{ride.price}</span>
              <span className="text-xs text-gray-400">Price</span>
          </div>
          
          <div className="flex items-center gap-4">
              <div className="text-right">
                  <span className="block text-sm font-bold text-slate-800">{ride.availableSeats} Seats</span>
                  <span className="text-xs text-gray-400">Available</span>
              </div>
              <div className="text-right">
                  <span className="block text-sm font-bold text-slate-800">{ride.duration}</span>
                  <span className="text-xs text-gray-400">Est. Time</span>
              </div>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={handleCloseModal}></div>
            
            <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 relative z-10 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300 shadow-2xl no-scrollbar">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Request Ride</h2>
                    <button onClick={handleCloseModal} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <X size={20} className="text-slate-600" />
                    </button>
                </div>

                {/* Date & Time Info Summary */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-primary-500">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Selected</p>
                            <p className="text-sm font-bold text-slate-800">
                                {selectedDates.length > 0 ? `${selectedDates.length} Days` : 'None'}
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-orange-500">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Time</p>
                            <p className="text-sm font-bold text-slate-800">{ride.departureTime}</p>
                        </div>
                    </div>
                </div>

                {/* Day Selection */}
                <div className="mb-6">
                    <div className="flex justify-between items-baseline mb-3">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Select Dates</label>
                        <span className="text-[10px] text-primary-500 font-medium">You can select multiple</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2">
                        {availableDates.map((item, idx) => {
                            const isSelected = selectedDates.includes(item.fullDate);
                            const isAvailable = item.isAvailable;

                            let baseClasses = "flex flex-col items-center justify-center min-w-[4.5rem] h-16 rounded-2xl border transition-all";
                            let colorClasses = "";

                            if (isSelected) {
                                colorClasses = "bg-emerald-500 border-emerald-500 text-white shadow-md transform scale-105";
                            } else {
                                if (isAvailable) {
                                    colorClasses = "bg-emerald-50 border-emerald-100 text-emerald-600 hover:border-emerald-300";
                                } else {
                                    colorClasses = "bg-white border-gray-200 text-slate-300 hover:bg-gray-50";
                                }
                            }
                            
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if(!isAvailable) return;
                                        toggleDateSelection(item.fullDate, isAvailable);
                                    }}
                                    className={`${baseClasses} ${colorClasses}`}
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{item.day}</span>
                                    <span className="text-lg font-bold">{item.date}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Passengers Info */}
                <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">Passengers</label>
                    <div className="flex items-start gap-4 overflow-x-auto no-scrollbar pb-2">
                        {ride.passengers && ride.passengers.length > 0 ? (
                            ride.passengers.map((p, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1 shrink-0">
                                    <div className="relative">
                                        <img 
                                            src={p.avatar} 
                                            alt={p.name} 
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                        />
                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-700">{p.name}</span>
                                </div>
                            ))
                        ) : (
                             <span className="text-xs text-gray-400 italic py-2">No passengers yet</span>
                        )}

                        {/* Invite Button */}
                        <button className="flex flex-col items-center gap-1 group shrink-0">
                            <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50 group-hover:border-primary-400 group-hover:text-primary-500 group-hover:bg-primary-50 transition-all">
                                <UserPlus size={20} />
                            </div>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-primary-500">Invite</span>
                        </button>
                    </div>
                </div>

                {/* Location Inputs */}
                <div className="mb-6 space-y-3">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 ml-1 uppercase tracking-wide">My Pickup Location</label>
                        <div className="relative group">
                            <input 
                                type="text" 
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                placeholder="Enter pickup point..." 
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-medium text-slate-800 placeholder-gray-400"
                            />
                            <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                <MapPin size={20} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 ml-1 uppercase tracking-wide">My Dropoff Location</label>
                        <div className="relative group">
                            <input 
                                type="text" 
                                value={dropoffLocation}
                                onChange={(e) => setDropoffLocation(e.target.value)}
                                placeholder="Enter dropoff point..." 
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-medium text-slate-800 placeholder-gray-400"
                            />
                            <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                <NavigationIcon size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="mb-6 rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-40 relative bg-gray-100">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d29206.021030337146!2d90.39443516739212!3d23.791821633073297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d23.761293!2d90.43187999999999!4m5!1s0x3755c64be6744a57%3A0xeacead51ebe2bf60!2sIndependent%20University%2C%20Bangladesh%2C%20Plot%2016%20Aftab%20Uddin%20Ahmed%20Rd%2C%20Dhaka%201229!3m2!1d23.8155044!2d90.4275435!5e0!3m2!1sen!2sbd!4v1763658376802!5m2!1sen!2sbd"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Route Map"
                    ></iframe>
                </div>

                {/* Confirm Button */}
                <button 
                    onClick={handleConfirmRequest}
                    className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                        selectedDates.length === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                        : 'bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800'
                    }`}
                >
                    Confirm Request <NavigationIcon size={18} />
                </button>
            </div>
        </div>
      )}
    </>
  );
};
