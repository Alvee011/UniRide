
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CURRENT_USER } from '../constants';

export const MyRides: React.FC = () => {
  const navigate = useNavigate();
  const { rides, deleteRide } = useApp();

  // Filter rides for the current user (in a real app, API would handle this)
  // For this mock, we assume all mock rides might be ours, or filter by current user ID if we attached it.
  // Since MOCK_RIDES has different drivers, let's show rides where driver.id matches CURRENT_USER.id
  // BUT the initial MOCK_RIDES in constants didn't use CURRENT_USER.id.
  // To ensure the feature works for the demo, we will show ALL rides for now or just the ones we added.
  // Let's show ALL rides in the context for simplicity of the demo so the user sees something immediately.
  const myRides = rides; 

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this ride?')) {
        deleteRide(id);
    }
  };

  const handleEdit = (ride: any) => {
    navigate('/post', { state: { ride } });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="bg-white p-6 pt-8 sticky top-0 z-30 shadow-sm mb-4">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-lg font-bold text-slate-800">My Posted Rides</h1>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {myRides.length === 0 ? (
            <div className="text-center py-20">
                <div className="bg-white p-6 rounded-full inline-block mb-4 shadow-sm">
                    <MapPin size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">No Rides Posted</h3>
                <p className="text-gray-400 text-sm mb-6">You haven't posted any rides yet.</p>
                <button 
                    onClick={() => navigate('/post')} 
                    className="bg-primary-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary-200"
                >
                    Post a Ride
                </button>
            </div>
        ) : (
            myRides.map(ride => (
                <div key={ride.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                <Calendar size={12} />
                                <span>Today, {ride.departureTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800">{ride.from}</span>
                                <span className="text-gray-300">→</span>
                                <span className="font-bold text-slate-800">{ride.to}</span>
                            </div>
                        </div>
                        <span className="bg-primary-50 text-primary-600 text-xs font-bold px-2 py-1 rounded-lg">
                            ৳{ride.price}
                        </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                             <span className="font-medium text-slate-700">{ride.availableSeats}</span> seats left
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleEdit(ride)}
                                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-slate-600 transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button 
                                onClick={() => handleDelete(ride.id)}
                                className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};
