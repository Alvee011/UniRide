
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { LocationInput } from '../components/LocationInput';
import { RideCard } from '../components/RideCard';
import { useApp } from '../context/AppContext';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const { rides } = useApp();
  const [from, setFrom] = useState('Banasree');
  const [to, setTo] = useState('IUB');

  // Basic filtering (in a real app this would be an API call)
  // For now we just show all rides in context to prove persistence
  const filteredRides = rides; 

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      
      {/* Header */}
      <div className="bg-white p-6 pt-8 rounded-b-3xl shadow-sm z-20 relative">
        <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Search</h1>
        </div>

        <LocationInput 
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
            className="shadow-none border border-gray-100"
        />
      </div>

      {/* Results */}
      <div className="px-6 pt-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">Available Rides</h2>
            <button className="flex items-center gap-2 text-slate-600 text-sm font-medium bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
                <SlidersHorizontal size={16} />
                Filter
            </button>
        </div>

        <div className="space-y-4">
            {filteredRides.map(ride => (
                <RideCard key={ride.id} ride={ride} />
            ))}
             {/* Empty State Check */}
             {filteredRides.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <p>No rides found for this route.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
