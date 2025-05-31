
import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
}

interface Hospital {
  name: string;
  address: string;
  location: Location;
  rating?: number;
  phone?: string;
}

interface GoogleMapProps {
  location: Location;
  hospitals: Hospital[];
  loading: boolean;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ location, hospitals, loading }) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  // For demo purposes, we'll show a placeholder map
  // In a real app, you'd integrate with Google Maps API
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-blue-600 font-medium">Loading hospitals...</span>
          </div>
        </div>
      )}
      
      {/* User Location Marker */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-600 bg-opacity-30 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Hospital Markers */}
      {hospitals.map((hospital, index) => (
        <div
          key={index}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${50 + (Math.random() - 0.5) * 40}%`,
            top: `${50 + (Math.random() - 0.5) * 40}%`,
          }}
          onClick={() => setSelectedHospital(hospital)}
        >
          <div className="relative group">
            <MapPin className="w-8 h-8 text-red-600 drop-shadow-lg hover:scale-110 transition-transform" />
            <div className="absolute -top-2 -left-2 w-12 h-12 bg-red-600 bg-opacity-20 rounded-full animate-ping group-hover:animate-none"></div>
          </div>
        </div>
      ))}

      {/* Hospital Info Popup */}
      {selectedHospital && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-30">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{selectedHospital.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedHospital.address}</p>
              {selectedHospital.phone && (
                <p className="text-sm text-blue-600 mt-1">{selectedHospital.phone}</p>
              )}
            </div>
            <button
              onClick={() => setSelectedHospital(null)}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2 z-20">
        <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold text-gray-600">+</span>
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold text-gray-600">−</span>
        </button>
      </div>

      {/* Demo Map Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-10 grid-rows-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border border-blue-300"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
