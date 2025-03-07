
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';

interface MapProps {
  center?: [number, number];
  zoom?: number;
  address?: string;
}

const InteractiveMap = ({ 
  center = [-122.4194, 37.7749], // Default to San Francisco
  zoom = 15,
  address = "123 Dental Way, Suite 100, San Francisco, CA 94110"
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState<string>('');
  const [showMap, setShowMap] = useState<boolean>(false);

  // Function to initialize the map
  const initializeMap = () => {
    if (!mapContainer.current || !mapToken) return;
    
    // Initialize map with the token provided by user
    mapboxgl.accessToken = mapToken;
    
    if (map.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
      interactive: true,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add marker at the center
    new mapboxgl.Marker({ color: '#3b82f6' })
      .setLngLat(center)
      .setPopup(new mapboxgl.Popup().setHTML(`<p class="font-semibold">${address}</p>`))
      .addTo(map.current);
  };

  useEffect(() => {
    // Initialize map if token is available
    if (mapToken && showMap) {
      initializeMap();
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapToken, showMap, center, zoom, address]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowMap(true);
  };

  if (!showMap) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col justify-center items-center">
        <p className="mb-4 text-center text-gray-700">
          To display the interactive map, please enter your Mapbox public token:
        </p>
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md">
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              value={mapToken}
              onChange={(e) => setMapToken(e.target.value)}
              placeholder="Enter your Mapbox public token"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Button type="submit" className="w-full">Show Map</Button>
          </div>
        </form>
        <p className="mt-4 text-xs text-gray-500 text-center">
          You can get a Mapbox public token by creating an account at{" "}
          <a 
            href="https://mapbox.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            mapbox.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveMap;
