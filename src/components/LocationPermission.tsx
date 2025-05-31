
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Shield, Navigation, AlertTriangle } from 'lucide-react';

interface LocationPermissionProps {
  onPermissionGranted: () => void;
}

export const LocationPermission: React.FC<LocationPermissionProps> = ({ onPermissionGranted }) => {
  const [requesting, setRequesting] = useState(false);

  const handleRequestPermission = async () => {
    setRequesting(true);
    try {
      await onPermissionGranted();
    } catch (error) {
      console.error('Permission request failed:', error);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-xl border-blue-200 bg-white">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900 mb-2">Location Access Required</CardTitle>
            <p className="text-gray-600 leading-relaxed">
              To find nearby hospitals, we need access to your current location. 
              Your location data is never stored or shared.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Why we need location */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-blue-900 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Why we need your location:
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <Navigation className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  Find hospitals closest to you
                </li>
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  Provide accurate directions
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  Enable emergency features
                </li>
              </ul>
            </div>

            <Button 
              onClick={handleRequestPermission}
              disabled={requesting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium rounded-lg transition-all duration-200"
            >
              {requesting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Requesting Permission...</span>
                </div>
              ) : (
                'Allow Location Access'
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                You can change this permission anytime in your browser settings
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
