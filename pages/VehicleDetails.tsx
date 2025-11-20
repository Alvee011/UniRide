
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Car, Bike, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Vehicle } from '../types';

export const VehicleDetails: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, addVehicle, deleteVehicle } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New Vehicle Form State
  const [type, setType] = useState<'Car' | 'Bike'>('Car');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');

  const handleDelete = (id: string) => {
      if (window.confirm('Delete this vehicle?')) {
          deleteVehicle(id);
      }
  };

  const handleAddVehicle = () => {
      if (!model || !plate) return;
      const newVehicle: Vehicle = {
          id: `v${Date.now()}`,
          type,
          model,
          plate,
          color
      };
      addVehicle(newVehicle);
      setShowAddForm(false);
      // Reset form
      setModel('');
      setPlate('');
      setColor('');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="bg-white p-6 pt-8 sticky top-0 z-30 shadow-sm mb-4">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Vehicle Details</h1>
        </div>
      </div>

      <div className="px-6 space-y-6">
        
        {/* List Vehicles */}
        <div className="space-y-4">
            {vehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                     <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                        {vehicle.image ? (
                             <img src={vehicle.image} alt={vehicle.model} className="w-full h-full object-cover" />
                        ) : (
                            vehicle.type === 'Car' ? <Car size={24} className="text-slate-400" /> : <Bike size={24} className="text-slate-400" />
                        )}
                     </div>
                     <div className="flex-1">
                         <h3 className="font-bold text-slate-800">{vehicle.model}</h3>
                         <p className="text-xs text-gray-500">{vehicle.plate} • {vehicle.color}</p>
                         <span className="inline-block mt-1 text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{vehicle.type}</span>
                     </div>
                     <button 
                        onClick={() => handleDelete(vehicle.id)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                     >
                        <Trash2 size={18} />
                     </button>
                </div>
            ))}
        </div>

        {/* Add Button */}
        {!showAddForm && (
            <button 
                onClick={() => setShowAddForm(true)}
                className="w-full py-4 border-2 border-dashed border-primary-200 rounded-3xl text-primary-500 font-bold flex items-center justify-center gap-2 hover:bg-primary-50 transition-colors"
            >
                <Plus size={20} />
                Add New Vehicle
            </button>
        )}

        {/* Add Form */}
        {showAddForm && (
            <div className="bg-white p-6 rounded-3xl shadow-soft animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="font-bold text-slate-800 mb-4">Add New Vehicle</h3>
                
                <div className="flex gap-4 mb-4">
                    <button 
                        onClick={() => setType('Car')}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${type === 'Car' ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                        <Car size={16} /> Car
                    </button>
                    <button 
                        onClick={() => setType('Bike')}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${type === 'Bike' ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                        <Bike size={16} /> Bike
                    </button>
                </div>

                <div className="space-y-3 mb-6">
                    <input 
                        type="text" 
                        placeholder="Model (e.g. Toyota Axio)" 
                        value={model}
                        onChange={e => setModel(e.target.value)}
                        className="w-full bg-gray-50 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-100"
                    />
                    <input 
                        type="text" 
                        placeholder="License Plate (e.g. DHK 32-1122)" 
                        value={plate}
                        onChange={e => setPlate(e.target.value)}
                        className="w-full bg-gray-50 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-100"
                    />
                    <input 
                        type="text" 
                        placeholder="Color (Optional)" 
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        className="w-full bg-gray-50 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-100"
                    />
                </div>

                <div className="flex gap-3">
                    <button 
                        onClick={() => setShowAddForm(false)}
                        className="flex-1 py-3 rounded-xl font-bold text-slate-500 bg-gray-100 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleAddVehicle}
                        className="flex-1 py-3 rounded-xl font-bold text-white bg-primary-500 hover:bg-primary-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
