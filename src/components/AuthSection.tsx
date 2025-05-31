
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Shield, Navigation, Heart } from 'lucide-react';

interface AuthSectionProps {
  onSignIn: (authenticated: boolean) => void;
  setUser: (user: any) => void;
}

export const AuthSection: React.FC<AuthSectionProps> = ({ onSignIn, setUser }) => {
  const handleGoogleSignIn = () => {
    // Simulate Google Sign In
    // In a real app, you'd integrate with Google OAuth
    setTimeout(() => {
      setUser({ name: 'John Doe', email: 'john@example.com' });
      onSignIn(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <MapPin className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">HospitalFinder</h1>
          <p className="text-blue-100 text-lg">Find nearby hospitals instantly</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-900 mb-2">Welcome</CardTitle>
            <p className="text-gray-600">Sign in to find hospitals near you</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={handleGoogleSignIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">G</span>
                </div>
                <span>Continue with Google</span>
              </div>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Trusted by thousands</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Secure and private</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Navigation className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Real-time directions</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Heart className="w-5 h-5 text-red-600" />
                <span className="text-gray-700">Emergency ready</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-100 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
