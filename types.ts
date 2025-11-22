
export interface User {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    phone?: string;
}

export interface CarDetails {
    model: string;
    plate: string;
    color: string;
    image?: string;
}

export interface Vehicle {
    id: string;
    type: 'Car' | 'Bike';
    model: string;
    plate: string;
    color: string;
    image?: string;
}

export interface Passenger {
    name: string;
    avatar: string;
}

export interface Ride {
    id: string;
    driver: User;
    car: CarDetails;
    from: string;
    to: string;
    departureTime: string; // ISO string or formatted time like "06:15 AM"
    price: number;
    currency: string;
    availableSeats: number;
    totalSeats: number;
    duration: string;
    selectedDays?: string[]; // Array of short day names e.g. ['Mon', 'Wed']
    passengers?: Passenger[];
}

export interface RideRequest {
    id: string;
    rideId: string;
    passenger: Passenger;
    pickupLocation: string;
    dropoffLocation: string;
    requestedDates: string[]; // Array of fullDate strings
    status: 'pending' | 'accepted' | 'rejected';
}

export interface Opportunity {
    id: string;
    passenger: User;
    from: string;
    to: string;
    date: string;
    time: string;
    seats: number;
    price: number;
    status: 'open' | 'offered';
}

export enum PaymentMethod {
    CASH = 'Cash',
    CARD = 'Cards',
    BKASH = 'Bkash'
}

export interface LocationSuggestion {
    id: string;
    name: string;
    address: string;
    type: 'home' | 'work' | 'recent' | 'location';
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string; // ISO string
    type: 'system' | 'ride_update' | 'promo' | 'alert';
    isRead: boolean;
}
