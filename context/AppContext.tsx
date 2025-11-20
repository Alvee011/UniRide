
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Ride, RideRequest, Vehicle } from '../types';
import { MOCK_RIDES, MY_VEHICLES, MOCK_REQUESTS } from '../constants';

interface AppContextType {
  rides: Ride[];
  vehicles: Vehicle[];
  requests: RideRequest[];
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  addRide: (ride: Ride) => void;
  updateRide: (ride: Ride) => void;
  deleteRide: (id: string) => void;
  addVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  sendRequest: (req: RideRequest) => void;
  handleRequestAction: (id: string, action: 'accepted' | 'rejected') => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or fall back to constants
  const [rides, setRides] = useState<Ride[]>(() => {
    try {
      const saved = localStorage.getItem('rides');
      return saved ? JSON.parse(saved) : MOCK_RIDES;
    } catch (e) {
      return MOCK_RIDES;
    }
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem('vehicles');
      return saved ? JSON.parse(saved) : MY_VEHICLES;
    } catch (e) {
      return MY_VEHICLES;
    }
  });

  const [requests, setRequests] = useState<RideRequest[]>(() => {
    try {
      const saved = localStorage.getItem('requests');
      return saved ? JSON.parse(saved) : MOCK_REQUESTS;
    } catch (e) {
      return MOCK_REQUESTS;
    }
  });

  const [isModalOpen, setModalOpen] = useState(false);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('rides', JSON.stringify(rides));
  }, [rides]);

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests));
  }, [requests]);

  // Actions
  const addRide = (ride: Ride) => {
    // Prepend the new ride so it appears first in the list
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

  const sendRequest = (req: RideRequest) => {
    setRequests(prev => [...prev, req]);
  };

  const handleRequestAction = (id: string, action: 'accepted' | 'rejected') => {
    // Update the request status
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: action } : req
    ));

    // If accepted, we need to add the passenger to the ride and update seats
    if (action === 'accepted') {
        const request = requests.find(r => r.id === id);
        if (request) {
            setRides(prevRides => prevRides.map(ride => {
                if (ride.id === request.rideId) {
                    const currentPassengers = ride.passengers || [];
                    // Check if passenger already exists to avoid duplicates
                    if (currentPassengers.some(p => p.name === request.passenger.name)) {
                        return ride;
                    }
                    
                    return {
                        ...ride,
                        availableSeats: Math.max(0, ride.availableSeats - 1),
                        passengers: [...currentPassengers, request.passenger]
                    };
                }
                return ride;
            }));
        }
    }
  };

  const resetApp = () => {
    setRides(MOCK_RIDES);
    setVehicles(MY_VEHICLES);
    setRequests(MOCK_REQUESTS);
  };

  return (
    <AppContext.Provider value={{
      rides,
      vehicles,
      requests,
      isModalOpen,
      setModalOpen,
      addRide,
      updateRide,
      deleteRide,
      addVehicle,
      deleteVehicle,
      sendRequest,
      handleRequestAction,
      resetApp
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
