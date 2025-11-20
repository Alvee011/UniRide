
import { Ride, User, LocationSuggestion, Vehicle } from './types';

export const CURRENT_USER: User = {
    id: 'u1',
    name: 'Faruque Azam Alvee',
    avatar: 'https://picsum.photos/seed/alvee/200',
    rating: 4.9
};

export const MY_VEHICLES: Vehicle[] = [
    {
        id: 'v1',
        type: 'Car',
        model: 'Toyota Axio',
        plate: 'DHK 32-6884',
        color: 'White',
        image: 'https://purepng.com/public/uploads/large/purepng.com-honda-city-white-carcarhondahonda-city-white-car-1701527484578r485m.png'
    },
    {
        id: 'v2',
        type: 'Bike',
        model: 'Yamaha R15',
        plate: 'DHK 11-2233',
        color: 'Blue',
        image: 'https://bd.gaadicdn.com/processedimages/yamaha/r15-v4/source/r15-v46613f8d6dc622.jpg'
    }
];

export const MOCK_RIDES: Ride[] = [
    {
        id: 'r1',
        driver: {
            id: 'd1',
            name: 'Alvee Faruque',
            avatar: 'https://picsum.photos/seed/alvee/200',
            rating: 4.9
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
            rating: 4.7
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
            rating: 5.0
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

export const MOCK_LOCATIONS: LocationSuggestion[] = [
    { id: 'l1', name: 'IUB', address: 'Bashundhara, Dhaka', type: 'recent' },
    { id: 'l2', name: 'Bashundhara City', address: 'Panthapath, Dhaka', type: 'recent' },
    { id: 'l3', name: 'Banasree', address: 'Rampura, Dhaka', type: 'location' },
    { id: 'l4', name: 'Gulshan 2', address: 'Dhaka', type: 'location' },
];
