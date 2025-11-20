import React from 'react';
import { MapPin, MoreVertical, Plus } from 'lucide-react';

interface LocationInputProps {
    from: string;
    to: string;
    onFromChange?: (val: string) => void;
    onToChange?: (val: string) => void;
    readOnly?: boolean;
    className?: string;
}

export const LocationInput: React.FC<LocationInputProps> = ({ from, to, onFromChange, onToChange, readOnly, className = '' }) => {
    return (
        <div className={`bg-white rounded-3xl p-4 shadow-sm ${className}`}>
            <div className="flex gap-3">
                {/* Visual Connector Column */}
                <div className="flex flex-col items-center pt-3">
                    <div className="w-2 h-2 bg-slate-900 rounded-full mb-1"></div>
                    <div className="flex-grow w-0.5 border-l-2 border-dashed border-gray-300 min-h-[30px]"></div>
                    <div className="w-2 h-2 border-2 border-slate-900 bg-white rounded-full mt-1"></div>
                </div>

                {/* Inputs Column */}
                <div className="flex-1 flex flex-col gap-4">
                    <div className="relative group">
                        <input 
                            type="text" 
                            value={from}
                            onChange={(e) => onFromChange?.(e.target.value)}
                            placeholder="Pickup location"
                            readOnly={readOnly}
                            className="w-full bg-gray-50 text-slate-800 text-sm font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 placeholder-gray-400"
                        />
                        <div className="absolute right-3 top-3 text-slate-400">
                           <MapPin size={16} />
                        </div>
                    </div>

                    <div className="relative">
                        <input 
                            type="text" 
                            value={to}
                            onChange={(e) => onToChange?.(e.target.value)}
                            placeholder="Where to?"
                            readOnly={readOnly}
                            className="w-full bg-gray-50 text-slate-800 text-sm font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 placeholder-gray-400"
                        />
                         <div className="absolute right-2 top-2 bg-white rounded-lg p-1 shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50">
                           <Plus size={16} className="text-slate-800" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};