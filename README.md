# GoCab 🚗

**GoCab** is a modern, community-sharing application concept designed specifically for university students and daily commuters. It facilitates carpooling by connecting drivers with empty seats to passengers going the same way, helping to save travel costs and reduce traffic congestion.

![GoCab Banner](https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80)
*(Replace with actual application screenshots)*

## 📖 About The Project

GoCab is built to solve the chaos of daily commuting in busy metropolitan areas (specifically modeled after Dhaka, Bangladesh). It offers a clean, intuitive interface where users can seamlessly switch between being a passenger or a driver.

This repository contains the **Frontend Prototype** built with React and TypeScript. It uses local state management and mock data to demonstrate the full user flow without requiring a backend connection.

## ✨ Key Features

### For Passengers
*   **Smart Search:** Easily find rides by entering pickup and drop-off locations.
*   **Ride Details:** View driver ratings, car models, price per seat, and estimated duration.
*   **Booking System:** Request seats for specific dates and get notified upon acceptance.
*   **Interactive Maps:** Visual route previews using embedded map integrations.
*   **Schedule Trip:** Request a ride for a specific time and date.

### For Drivers
*   **Post a Ride:** Quickly list a ride with departure time, seat capacity, price, and recurring days.
*   **Request Management:** specific "Ride Requests" screen to Approve or Reject incoming passenger requests.
*   **Opportunities:** View and bid on scheduled trip requests from passengers.
*   **Vehicle Management:** Add and manage multiple vehicles (Cars or Bikes) with details and photos.
*   **Earnings & History:** Track ride history and passenger details (UI concepts).

### General
*   **Mobile-First UI:** A highly responsive design optimized for mobile screens with bottom navigation.
*   **Modern Aesthetics:** Built with Tailwind CSS for a sleek, consistent, and accessible look.
*   **Mock Authentication:** Login and Signup flows with profile management.

## 🛠️ Tech Stack

*   **Framework:** [React](https://react.dev/) (v18+)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/gocab.git
    ```
2.  **Navigate to the project folder**
    ```sh
    cd gocab
    ```
3.  **Install dependencies**
    ```sh
    npm install
    ```
4.  **Start the development server**
    ```sh
    npm run dev
    ```

The application should now be running at `http://localhost:5173`.

## 📱 Screens Overview

1.  **Onboarding:** Welcoming illustrations and value proposition.
2.  **Home:** Dashboard showing active map background, quick actions, and nearby rides.
3.  **Search:** Specific inputs for "From" and "To" with a list of available rides.
4.  **Ride Card:** Detailed view of a specific ride with "Request" functionality.
5.  **Ride Requests:** A dedicated inbox for drivers to manage incoming bookings.
6.  **Profile:** User stats, settings, and vehicle management.
7.  **Opportunities:** Marketplace for drivers to find passenger trip requests.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Note: This is a frontend demonstration. Data persistence is handled via React Context and will reset upon page reload.*