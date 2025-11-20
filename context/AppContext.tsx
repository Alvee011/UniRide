
import React, { createContext, useContext, useState } from 'react';
import { Ride, Vehicle, RideRequest } from '../types';
import { MOCK_RIDES, MY_VEHICLES } from '../constants';

interface AppContextType {
  rides: Ride[];
  vehicles: Vehicle[];
  requests: RideRequest[];
  addRide: (ride: Ride) => void;
  updateRide: (ride: Ride) => void;
  deleteRide: (id: string) => void;
  addVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  sendRequest: (request: RideRequest) => void;
  handleRequestAction: (id: string, status: 'accepted' | 'rejected') => void;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with Mock Data so the app isn't empty
  const [rides, setRides] = useState<Ride[]>(MOCK_RIDES);
  const [vehicles, setVehicles] = useState<Vehicle[]>(MY_VEHICLES);
  const [isModalOpen, setModalOpen] = useState(false);
  
  // Mock initial request for demo purposes
  const [requests, setRequests] = useState<RideRequest[]>([
    {
        id: 'req_1',
        rideId: 'r1',
        passenger: {
            name: 'Tanvir Hassan',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100'
        },
        pickupLocation: 'Jamuna Future Park, Gate 1',
        dropoffLocation: 'IUB Main Gate',
        requestedDates: ['Oct 24', 'Oct 26'], // Example dates
        status: 'pending'
    }
  ]);

  const addRide = (ride: Ride) => {
    setRides(prev => [ride, ...prev]);
  };

  const updateRide = (updatedRide: Ride) => {
    setRides(prev => prev.map(r => r.id === updatedRide.id ? updatedRide : r));
  };

  const deleteRide = (id: string) => {
    setRides(prev => prev.filter(r => r.id !== id));
  };

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles(prev => [...prev, vehicle]);
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const sendRequest = (request: RideRequest) => {
    setRequests(prev => [request, ...prev]);
  };

  const handleRequestAction = (id: string, status: 'accepted' | 'rejected') => {
    // First update the request status
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));

    // If accepted, add passenger to ride
    if (status === 'accepted') {
        const request = requests.find(r => r.id === id);
        if (request) {
             setRides(prevRides => prevRides.map(ride => {
                 if (ride.id === request.rideId) {
                     const newPassenger = request.passenger;
                     const currentPassengers = ride.passengers || [];
                     // Avoid duplicates
                     if (!currentPassengers.some(p => p.name === newPassenger.name)) {
                         return {
                             ...ride,
                             passengers: [...currentPassengers, newPassenger],
                             availableSeats: Math.max(0, ride.availableSeats - 1)
                         };
                     }
                 }
                 return ride;
             }));
        }
    }
  };

  return (
    <AppContext.Provider value={{ 
      rides, 
      vehicles, 
      requests,
      addRide, 
      updateRide, 
      deleteRide, 
      addVehicle, 
      deleteVehicle,
      sendRequest,
      handleRequestAction,
      isModalOpen,
      setModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
