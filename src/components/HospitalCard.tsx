
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';

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
  openNow?: boolean;
  distance?: string;
}

interface HospitalCardProps {
  hospital: Hospital;
  userLocation: Location;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, userLocation }) => {
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(1);
  };

  const distance = calculateDistance(
    userLocation.lat, 
    userLocation.lng, 
    hospital.location.lat, 
    hospital.location.lng
  );

  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${hospital.location.lat},${hospital.location.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCall = () => {
    if (hospital.phone) {
      window.location.href = `tel:${hospital.phone}`;
    }
  };

  return (
    <Card className="border-blue-200 hover:shadow-lg transition-shadow duration-200 bg-white">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                {hospital.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                {hospital.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {hospital.rating}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Clock className={`w-4 h-4 ${hospital.openNow ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={`text-sm font-medium ${hospital.openNow ? 'text-green-600' : 'text-red-600'}`}>
                    {hospital.openNow ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                {distance} km
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 leading-relaxed">
              {hospital.address}
            </p>
          </div>

          {/* Phone */}
          {hospital.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-blue-600 font-medium">
                {hospital.phone}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button 
              size="sm" 
              onClick={handleGetDirections}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Directions
            </Button>
            {hospital.phone && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleCall}
                className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
