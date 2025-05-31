
import { useState } from 'react';

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
}

export const useHospitalSearch = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchHospitals = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call with mock data
      // In a real app, you'd call Google Places API here
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockHospitals: Hospital[] = [
        {
          name: "City General Hospital",
          address: "123 Main Street, Downtown",
          location: { lat: lat + 0.01, lng: lng + 0.01 },
          rating: 4.2,
          phone: "+1 (555) 123-4567",
          openNow: true,
        },
        {
          name: "St. Mary's Medical Center",
          address: "456 Oak Avenue, Medical District",
          location: { lat: lat - 0.015, lng: lng + 0.02 },
          rating: 4.5,
          phone: "+1 (555) 234-5678",
          openNow: true,
        },
        {
          name: "Regional Emergency Hospital",
          address: "789 Pine Road, North Side",
          location: { lat: lat + 0.02, lng: lng - 0.01 },
          rating: 4.0,
          phone: "+1 (555) 345-6789",
          openNow: false,
        },
        {
          name: "Community Health Clinic",
          address: "321 Cedar Lane, Westside",
          location: { lat: lat - 0.01, lng: lng - 0.015 },
          rating: 3.8,
          phone: "+1 (555) 456-7890",
          openNow: true,
        },
        {
          name: "Metropolitan Medical Complex",
          address: "654 Elm Street, Financial District",
          location: { lat: lat + 0.005, lng: lng + 0.025 },
          rating: 4.7,
          phone: "+1 (555) 567-8901",
          openNow: true,
        },
      ];

      setHospitals(mockHospitals);
    } catch (err) {
      setError('Failed to fetch nearby hospitals. Please try again.');
      console.error('Hospital search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    hospitals,
    loading,
    error,
    searchHospitals,
  };
};
