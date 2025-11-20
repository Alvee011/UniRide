
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Phone, Check, X, Navigation } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RideRequest } from '../types';

interface RequestCardProps {
    request: RideRequest;
    isProcessed?: boolean;
    onAction?: (id: string, action: 'accepted' | 'rejected') => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, isProcessed, onAction }) => (
    <div className={`bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-4 ${isProcessed ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
            <div className="relative">
                <img 
                    src={request.passenger.avatar} 
                    alt={request.passenger.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
            </div>
            <div>
                <h3 className="font-bold text-slate-800 text-sm">{request.passenger.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    {isProcessed ? (
                         <span className={`font-bold px-2 py-0.5 rounded-md ${request.status === 'accepted' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                             {request.status.toUpperCase()}
                         </span>
                    ) : (
                        <span className="text-orange-500 font-bold">Pending Approval</span>
                    )}
                </div>
            </div>
        </div>
        {!isProcessed && (
             <button className="bg-blue-50 text-blue-500 p-2 rounded-full hover:bg-blue-100 transition-colors">
                <Phone size={16} fill="currentColor" />
            </button>
        )}
      </div>

      <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
              <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup Location</p>
                  <p className="text-sm font-medium text-slate-800 leading-snug">{request.pickupLocation}</p>
              </div>
          </div>
          
          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
              <Navigation size={16} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dropoff Location</p>
                  <p className="text-sm font-medium text-slate-800 leading-snug">{request.dropoffLocation || 'Not specified'}</p>
              </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
              <Calendar size={16} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Requested Dates ({request.requestedDates.length})</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                      {request.requestedDates.map((date, idx) => (
                          <span key={idx} className="text-xs font-bold bg-white border border-gray-200 px-2 py-1 rounded-md text-slate-600 shadow-sm">
                              {date}
                          </span>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {!isProcessed && onAction && (
        <div className="flex gap-3">
             <button 
                onClick={() => onAction(request.id, 'rejected')}
                className="flex-1 py-3 rounded-xl font-bold text-red-500 bg-red-50 border border-transparent hover:border-red-200 transition-all flex items-center justify-center gap-2"
             >
                <X size={18} /> Reject
            </button>
            <button 
                onClick={() => onAction(request.id, 'accepted')}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
            >
                <Check size={18} /> Accept
            </button>
        </div>
      )}
    </div>
);

export const RideRequests: React.FC = () => {
  const navigate = useNavigate();
  const { requests, handleRequestAction } = useApp();

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white p-6 pt-8 sticky top-0 z-30 shadow-sm mb-6">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Ride Requests</h1>
        </div>
      </div>

      <div className="px-6">
        {pendingRequests.length > 0 && (
            <div className="mb-8">
                <h2 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">New Requests</h2>
                {pendingRequests.map(req => (
                    <RequestCard key={req.id} request={req} onAction={handleRequestAction} />
                ))}
            </div>
        )}

        {processedRequests.length > 0 && (
            <div>
                <h2 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">History</h2>
                {processedRequests.map(req => (
                    <RequestCard key={req.id} request={req} isProcessed />
                ))}
            </div>
        )}

        {requests.length === 0 && (
            <div className="text-center py-20 text-gray-400">
                <p>No ride requests yet.</p>
            </div>
        )}
      </div>
    </div>
  );
};
