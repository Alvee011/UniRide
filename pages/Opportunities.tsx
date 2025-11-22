
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, User, DollarSign, X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Opportunity } from '../types';

export const Opportunities: React.FC = () => {
  const navigate = useNavigate();
  const { opportunities, setModalOpen } = useApp();
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  
  // Counter Offer State
  const [counterPrice, setCounterPrice] = useState(0);
  const [pickupTime, setPickupTime] = useState('');

  useEffect(() => {
    // Ensure modal state is reset when leaving the page
    return () => setModalOpen(false);
  }, []);

  const openDetails = (opp: Opportunity) => {
      setSelectedOpp(opp);
      setCounterPrice(opp.price);
      setPickupTime(opp.time);
      setModalOpen(true); // Hides the bottom navigation
  };

  const closeDetails = () => {
      setSelectedOpp(null);
      setModalOpen(false); // Shows the bottom navigation
  };

  const handleOffer = () => {
      alert(`Offer sent! \nFare: ৳${counterPrice}\nPickup: ${pickupTime}`);
      closeDetails();
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white p-6 pt-8 sticky top-0 z-30 shadow-sm mb-4">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Opportunities</h1>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {opportunities.length === 0 ? (
             <div className="text-center py-20 text-gray-400">
                <p>No opportunities available right now.</p>
             </div>
        ) : (
            opportunities.map(opp => (
                <div 
                    key={opp.id} 
                    onClick={() => openDetails(opp)}
                    className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <img src={opp.passenger.avatar} alt={opp.passenger.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm">{opp.passenger.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <StarRating rating={opp.passenger.rating} />
                                </div>
                            </div>
                        </div>
                        <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-lg">
                            ৳{opp.price}
                        </span>
                    </div>

                    <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                            <span className="font-medium">{opp.from}</span>
                        </div>
                        <div className="pl-1">
                             <div className="w-0.5 h-4 bg-gray-200 border-l border-dashed border-gray-300"></div>
                        </div>
                         <div className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 border-2 border-primary-500 rounded-full bg-white"></div>
                            <span className="font-medium">{opp.to}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-50 text-xs text-gray-500">
                         <div className="flex items-center gap-1">
                             <Calendar size={14} /> {opp.date}
                         </div>
                         <div className="flex items-center gap-1">
                             <Clock size={14} /> {opp.time}
                         </div>
                         <div className="flex items-center gap-1">
                             <User size={14} /> {opp.seats} Seat(s)
                         </div>
                    </div>
                </div>
            ))
        )}
      </div>

      {/* Detailed Modal */}
      {selectedOpp && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
               <div className="bg-white w-full max-w-md h-[90vh] sm:h-auto rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col relative animate-in slide-in-from-bottom-20 duration-300">
                   
                   <button onClick={closeDetails} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full shadow-sm">
                       <X size={20} />
                   </button>

                   {/* Map Area */}
                   <div className="h-48 bg-gray-200 w-full relative">
                        <iframe 
                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.97303530431!2d90.33728804965597!3d23.780818635444483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1763652264942!5m2!1sen!2sbd`}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            title="Map"
                        ></iframe>
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                   </div>

                   <div className="p-6 flex-1 overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{selectedOpp.passenger.name}</h2>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <StarRating rating={selectedOpp.passenger.rating} />
                                    <span>• {selectedOpp.seats} Seat(s) Needed</span>
                                </div>
                            </div>
                            <img src={selectedOpp.passenger.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex gap-4 items-start">
                                <div className="flex flex-col items-center pt-1">
                                    <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
                                    <div className="w-0.5 h-10 bg-gray-200 border-l border-dashed border-gray-300 my-1"></div>
                                    <div className="w-3 h-3 border-2 border-primary-500 bg-white rounded-full"></div>
                                </div>
                                <div className="space-y-8">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Pickup</p>
                                        <p className="text-sm font-bold text-slate-800">{selectedOpp.from}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Dropoff</p>
                                        <p className="text-sm font-bold text-slate-800">{selectedOpp.to}</p>
                                    </div>
                                </div>
                            </div>

                             <div className="flex gap-4 bg-gray-50 p-4 rounded-2xl mt-4">
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Date</p>
                                    <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                        <Calendar size={16} className="text-slate-400" /> {selectedOpp.date}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Time</p>
                                    <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                        <Clock size={16} className="text-slate-400" /> {selectedOpp.time}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-3xl mb-6">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <DollarSign size={18} className="text-blue-500" /> Make an Offer
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Your Fare (BDT)</label>
                                    <input 
                                        type="number" 
                                        value={counterPrice}
                                        onChange={(e) => setCounterPrice(parseInt(e.target.value))}
                                        className="w-full bg-white px-4 py-3 rounded-xl text-lg font-bold text-slate-800 outline-none border border-blue-100 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Preferred Pickup Time</label>
                                    <input 
                                        type="text" 
                                        value={pickupTime}
                                        onChange={(e) => setPickupTime(e.target.value)}
                                        className="w-full bg-white px-4 py-3 rounded-xl text-sm font-medium text-slate-800 outline-none border border-blue-100 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            onClick={handleOffer}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            Send Offer <CheckCircle2 size={20} />
                        </button>
                   </div>
               </div>
          </div>
      )}
    </div>
  );
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);
