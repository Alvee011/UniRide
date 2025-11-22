
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Car, Megaphone, Trash2, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Notification } from '../types';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useApp();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
        case 'ride_update': return <Car size={20} className="text-blue-500" />;
        case 'alert': return <AlertCircle size={20} className="text-red-500" />;
        case 'promo': return <Megaphone size={20} className="text-purple-500" />;
        case 'system': default: return <Bell size={20} className="text-slate-500" />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
        case 'ride_update': return 'bg-blue-50';
        case 'alert': return 'bg-red-50';
        case 'promo': return 'bg-purple-50';
        case 'system': default: return 'bg-gray-100';
    }
  };

  const formatTime = (isoString: string) => {
      const date = new Date(isoString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white p-6 pt-8 sticky top-0 z-30 shadow-sm mb-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} className="text-slate-800" />
                </button>
                <h1 className="text-lg font-bold text-slate-800">Notifications</h1>
            </div>
            <div className="flex gap-2">
                {notifications.length > 0 && (
                    <button 
                        onClick={markAllAsRead}
                        className="p-2 text-primary-500 hover:bg-primary-50 rounded-full"
                        title="Mark all as read"
                    >
                        <Check size={20} />
                    </button>
                )}
                {notifications.length > 0 && (
                    <button 
                        onClick={() => {
                            if(window.confirm('Clear all notifications?')) clearNotifications();
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                        title="Clear all"
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>
        </div>
      </div>

      <div className="px-6 space-y-3">
          {notifications.length === 0 ? (
              <div className="text-center py-20">
                  <div className="bg-white p-6 rounded-full inline-block mb-4 shadow-sm">
                      <Bell size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700">No Notifications</h3>
                  <p className="text-gray-400 text-sm">You're all caught up!</p>
              </div>
          ) : (
              notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    onClick={() => markAsRead(notif.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${notif.isRead ? 'bg-white border-gray-100' : 'bg-white border-primary-200 shadow-sm'}`}
                  >
                      {!notif.isRead && (
                          <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                      
                      <div className="flex gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${getBgColor(notif.type)}`}>
                              {getIcon(notif.type)}
                          </div>
                          <div className="flex-1">
                              <h4 className={`text-sm font-bold mb-1 ${notif.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                                  {notif.title}
                              </h4>
                              <p className={`text-xs mb-2 leading-relaxed ${notif.isRead ? 'text-gray-400' : 'text-slate-600'}`}>
                                  {notif.message}
                              </p>
                              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wide">
                                  {formatTime(notif.timestamp)}
                              </p>
                          </div>
                      </div>
                  </div>
              ))
          )}
      </div>
    </div>
  );
};
