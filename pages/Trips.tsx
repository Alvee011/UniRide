
import React from 'react';

export const Trips: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 pb-20 relative">
       <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.97303530431!2d90.33728804965597!3d23.780818635444483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1763652264942!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Dhaka Map"
        ></iframe>
        
        {/* Floating header to match app style */}
        <div className="absolute top-0 left-0 right-0 p-6 pointer-events-none">
             <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 pointer-events-auto">
                <h2 className="font-bold text-slate-800 text-lg">Live Map</h2>
                <p className="text-xs text-slate-500">View traffic and routes in Dhaka</p>
             </div>
        </div>
    </div>
  );
};
