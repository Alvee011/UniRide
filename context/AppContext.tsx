
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Ride, RideRequest, Vehicle, Notification, Opportunity } from '../types';
import { MOCK_RIDES, MY_VEHICLES, MOCK_REQUESTS, MOCK_NOTIFICATIONS, MOCK_OPPORTUNITIES } from '../constants';

interface AppContextType {
  rides: Ride[];
  vehicles: Vehicle[];
  requests: RideRequest[];
  notifications: Notification[];
  opportunities: Opportunity[];
  unreadCount: number;
  isModalOpen: boolean;
  isNavbarHidden: boolean;
  setModalOpen: (open: boolean) => void;
  toggleNavbarHidden: () => void;
  addRide: (ride: Ride) => void;
  updateRide: (ride: Ride) => void;
  deleteRide: (id: string) => void;
  addVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  sendRequest: (req: RideRequest) => void;
  handleRequestAction: (id: string, action: 'accepted' | 'rejected') => void;
  addOpportunity: (opt: Opportunity) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
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

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem('notifications');
      return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
    } catch (e) {
      return MOCK_NOTIFICATIONS;
    }
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    try {
      const saved = localStorage.getItem('opportunities');
      return saved ? JSON.parse(saved) : MOCK_OPPORTUNITIES;
    } catch (e) {
      return MOCK_OPPORTUNITIES;
    }
  });

  const [isModalOpen, setModalOpen] = useState(false);
  
  const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(() => {
    try {
      return localStorage.getItem('isNavbarHidden') === 'true';
    } catch (e) {
      return false;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

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

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  const toggleNavbarHidden = () => {
    setIsNavbarHidden(prev => {
      const newState = !prev;
      localStorage.setItem('isNavbarHidden', String(newState));
      return newState;
    });
  };

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
    
    // Simulate a system notification for the request sent
    const notif: Notification = {
        id: `notif_${Date.now()}`,
        title: 'Request Sent',
        message: `Your request to ${req.passenger.name === 'Orin' ? 'the driver' : 'join the ride'} has been sent.`,
        timestamp: new Date().toISOString(),
        type: 'system',
        isRead: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleRequestAction = (id: string, action: 'accepted' | 'rejected') => {
    // Update the request status
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: action } : req
    ));

    const req = requests.find(r => r.id === id);

    // If accepted, we need to add the passenger to the ride and update seats
    if (action === 'accepted') {
        if (req) {
            setRides(prevRides => prevRides.map(ride => {
                if (ride.id === req.rideId) {
                    const currentPassengers = ride.passengers || [];
                    // Check if passenger already exists to avoid duplicates
                    if (currentPassengers.some(p => p.name === req.passenger.name)) {
                        return ride;
                    }
                    
                    return {
                        ...ride,
                        availableSeats: Math.max(0, ride.availableSeats - 1),
                        passengers: [...currentPassengers, req.passenger]
                    };
                }
                return ride;
            }));
        }
    }

    // Add Notification
    if (req) {
        const notif: Notification = {
            id: `notif_${Date.now()}`,
            title: `Ride Request ${action === 'accepted' ? 'Accepted' : 'Rejected'}`,
            message: `${req.passenger.name}'s request has been ${action}.`,
            timestamp: new Date().toISOString(),
            type: 'ride_update',
            isRead: false
        };

        setNotifications(prev => [notif, ...prev]);
    }
  };

  const addOpportunity = (opt: Opportunity) => {
    setOpportunities(prev => [opt, ...prev]);
  };

  const markAsRead = (id: string) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearNotifications = () => {
      setNotifications([]);
  };

  const resetApp = () => {
    setRides(MOCK_RIDES);
    setVehicles(MY_VEHICLES);
    setRequests(MOCK_REQUESTS);
    setNotifications(MOCK_NOTIFICATIONS);
    setOpportunities(MOCK_OPPORTUNITIES);
    setIsNavbarHidden(false);
    localStorage.removeItem('isNavbarHidden');
  };

  return (
    <AppContext.Provider value={{
      rides,
      vehicles,
      requests,
      notifications,
      opportunities,
      unreadCount,
      isModalOpen,
      isNavbarHidden,
      setModalOpen,
      toggleNavbarHidden,
      addRide,
      updateRide,
      deleteRide,
      addVehicle,
      deleteVehicle,
      sendRequest,
      handleRequestAction,
      addOpportunity,
      markAsRead,
      markAllAsRead,
      clearNotifications,
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
