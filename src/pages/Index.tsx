
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { GoogleMap } from '@/components/GoogleMap';
import { HospitalCard } from '@/components/HospitalCard';
import { AuthSection } from '@/components/AuthSection';
import { LocationPermission } from '@/components/LocationPermission';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useHospitalSearch } from '@/hooks/useHospitalSearch';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { location, error: locationError, requestPermission } = useGeolocation();
  const { hospitals, loading, searchHospitals } = useHospitalSearch();

  useEffect(() => {
    if (location && isAuthenticated) {
      searchHospitals(location.lat, location.lng);
    }
  }, [location, isAuthenticated]);

  if (!isAuthenticated) {
    return <AuthSection onSignIn={setIsAuthenticated} setUser={setUser} />;
  }

  if (!location) {
    return <LocationPermission onPermissionGranted={requestPermission} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">HospitalFinder</h1>
                <p className="text-sm text-gray-600">Find nearby hospitals instantly</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs text-gray-500">{user?.name || 'User'}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] border-blue-200 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-blue-900">
                  <Navigation className="w-5 h-5" />
                  <span>Nearby Hospitals</span>
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Showing hospitals within 10km of your location
                </p>
              </CardHeader>
              <CardContent className="p-0 h-[500px]">
                <GoogleMap 
                  location={location}
                  hospitals={hospitals}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>

          {/* Hospital List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-blue-900">
                Found {hospitals.length} hospitals
              </h2>
              <Button 
                size="sm"
                onClick={() => location && searchHospitals(location.lat, location.lng)}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Refresh
              </Button>
            </div>
            
            <div className="space-y-3 max-h-[550px] overflow-y-auto">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-32 bg-blue-100 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                hospitals.map((hospital, index) => (
                  <HospitalCard 
                    key={index} 
                    hospital={hospital}
                    userLocation={location}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
