
import { Ride, User, LocationSuggestion, Vehicle, RideRequest, Notification } from './types';

export const CURRENT_USER: User = {
    id: 'u1',
    name: 'Faruque Azam Alvee',
    avatar: 'https://res.cloudinary.com/dhkjgite9/image/upload/v1763823794/Alvee_j0tl2z.jpg',
    rating: 4.9,
    phone: '+8801727828730'
};

export const MY_VEHICLES: Vehicle[] = [
    {
        id: 'v1',
        type: 'Car',
        model: 'Toyota Axio',
        plate: 'DHK 32-6884',
        color: 'White',
        image: '/Images/Axio.jpg'
    },
    {
        id: 'v2',
        type: 'Bike',
        model: 'Yamaha R15',
        plate: 'DHK 11-2233',
        color: 'Blue',
        image: '/Images/r15.webp'
    }
];

export const MOCK_RIDES: Ride[] = [
    {
        id: 'r1',
        driver: {
            id: 'd1',
            name: 'Alvee Faruque',
            avatar: 'https://res.cloudinary.com/dhkjgite9/image/upload/v1763823794/Alvee_j0tl2z.jpg',
            rating: 4.9,
            phone: '+8801727828730'
        },
        car: {
            model: 'Toyota Axio',
            plate: 'DHK-2341',
            color: 'White',
            image: 'https://picsum.photos/seed/car1/300/200'
        },
        from: 'Banasree',
        to: 'IUB',
        departureTime: '08:15 AM',
        price: 150,
        currency: 'BDT',
        availableSeats: 2,
        totalSeats: 4,
        duration: '45 mins',
        selectedDays: ['Mon', 'Wed', 'Fri'],
        passengers: [
            {
                name: 'Avrina',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100'
            }
        ]
    },
    {
        id: 'r2',
        driver: {
            id: 'd2',
            name: 'Wasi',
            avatar: 'https://picsum.photos/seed/wasi/200',
            rating: 4.7,
            phone: '+8801711223344'
        },
        car: {
            model: 'Toyota Allion',
            plate: 'DHK-9988',
            color: 'Black'
        },
        from: 'Eskaton',
        to: 'Bashundhara',
        departureTime: '09:25 AM',
        price: 200,
        currency: 'BDT',
        availableSeats: 3,
        totalSeats: 4,
        duration: '60 mins',
        selectedDays: ['Sun', 'Tue', 'Thu'],
        passengers: []
    },
    {
        id: 'r3',
        driver: {
            id: 'd3',
            name: 'Rubi',
            avatar: 'https://picsum.photos/seed/rubi/200',
            rating: 5.0,
            phone: '+8801998877665'
        },
        car: {
            model: 'Toyota Premio',
            plate: 'DHK-4422',
            color: 'Red'
        },
        from: 'Gulshan 1',
        to: 'Uttara',
        departureTime: '08:30 AM',
        price: 250,
        currency: 'BDT',
        availableSeats: 1,
        totalSeats: 4,
        duration: '35 mins',
        selectedDays: ['Sat', 'Fri'],
        passengers: []
    }
];

export const MOCK_REQUESTS: RideRequest[] = [
    {
        id: 'req_default_1',
        rideId: 'r1',
        passenger: {
            name: 'Anirodho Roy',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150'
        },
        pickupLocation: 'Banasree G block',
        dropoffLocation: 'GP house',
        requestedDates: ['Tomorrow'],
        status: 'pending'
    }
];

export const MOCK_LOCATIONS: LocationSuggestion[] = [
    { id: 'l1', name: 'IUB', address: 'Bashundhara, Dhaka', type: 'recent' },
    { id: 'l2', name: 'Bashundhara City', address: 'Panthapath, Dhaka', type: 'recent' },
    { id: 'l3', name: 'Banasree', address: 'Rampura, Dhaka', type: 'location' },
    { id: 'l4', name: 'Gulshan 2', address: 'Dhaka', type: 'location' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'n1',
        title: 'Welcome to UniRide! 👋',
        message: 'Thanks for joining our community. Complete your profile to get started and find your first ride.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        type: 'system',
        isRead: false
    },
    {
        id: 'n2',
        title: 'Traffic Alert 🚦',
        message: 'Heavy traffic reported on Pragati Sarani. Plan your trip accordingly.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        type: 'alert',
        isRead: false
    },
    {
        id: 'n3',
        title: 'Ride Completed',
        message: 'Your ride with Alvee to Bashundhara was completed. Rate your driver now!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        type: 'ride_update',
        isRead: true
    }
];
