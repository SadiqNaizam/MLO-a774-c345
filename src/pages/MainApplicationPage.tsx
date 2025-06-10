import React, { useState, useEffect } from 'react';
import InteractiveMapWrapper from '@/components/InteractiveMapWrapper';
import GeocodingSearchInput from '@/components/GeocodingSearchInput';
import RouteDisplayPanel from '@/components/RouteDisplayPanel';
import PlaceDetailsSheet, { PlaceDetails } from '@/components/PlaceDetailsSheet'; // Assuming PlaceDetails is exported
import { LocationSuggestion } from '@/components/LocationSuggestionItem'; // Assuming LocationSuggestion is exported
import { Button } from '@/components/ui/button'; // For controlling RouteDisplayPanel visibility
import { X } from 'lucide-react'; // Icon for close button

// If PlaceDetails or LocationSuggestion are not exported, define simplified versions here for state typing
// For example:
// interface PlaceDetails { name: string; address?: string; category?: string; imageUrl?: string; phone?: string; website?: string; }
// interface LocationSuggestion { id: string; primaryText: string; secondaryText?: string; }

const MainApplicationPage: React.FC = () => {
  console.log('MainApplicationPage loaded');

  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const [isPlaceDetailsSheetOpen, setIsPlaceDetailsSheetOpen] = useState(false);
  const [isRoutePanelVisible, setIsRoutePanelVisible] = useState(false); // Start with route panel hidden
  const [routeDestinationName, setRouteDestinationName] = useState<string | null>(null);

  useEffect(() => {
    // Pre-load or initial setup if needed
  }, []);

  const handlePlaceSelected = (suggestion: LocationSuggestion) => {
    console.log('Place selected on page:', suggestion);
    const placeDetails: PlaceDetails = {
      name: suggestion.primaryText,
      address: suggestion.secondaryText,
      category: 'Selected Location', // Placeholder category
      imageUrl: `https://source.unsplash.com/400x300/?${encodeURIComponent(suggestion.primaryText.split(' ')[0])},city`, // Placeholder image
      phone: 'N/A',
      website: 'N/A',
    };
    setSelectedPlace(placeDetails);
    setIsPlaceDetailsSheetOpen(true);
    setIsRoutePanelVisible(false); // Hide route panel when new place is selected
  };

  const handleGetDirections = (place: PlaceDetails) => {
    console.log(`Directions requested for: ${place.name}. Opening route panel.`);
    // The PlaceDetailsSheet calls onOpenChange(false) internally if user clicks its close button.
    // If Directions button is clicked, we manage sheet closure here.
    setIsPlaceDetailsSheetOpen(false);
    setSelectedPlace(null); // Optionally clear selected place marker or keep it

    setRouteDestinationName(place.name);
    setIsRoutePanelVisible(true); // Show the route panel

    // Note: RouteDisplayPanel manages its own origin/destination inputs.
    // To pre-fill destination, RouteDisplayPanel would need to accept it as a prop.
    // For now, routeDestinationName is for display purposes on this page.
    console.log(`User should now use the Route Panel. Destination hint: ${place.name}`);
  };
  
  const handleCloseRoutePanel = () => {
    setIsRoutePanelVisible(false);
    setRouteDestinationName(null);
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Geocoding Search Input: Positioned at top-left */}
      <div className="absolute top-4 left-4 z-20 w-full max-w-sm sm:max-w-md">
        <GeocodingSearchInput
          onPlaceSelected={handlePlaceSelected}
          placeholder="Search for a location..."
        />
      </div>

      {/* Route Display Panel: Slides in or positioned on the right */}
      {isRoutePanelVisible && (
        <div className="absolute top-4 right-4 z-10 w-full max-w-sm sm:max-w-md h-[calc(100vh-2rem)] bg-white shadow-xl rounded-lg flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Route Planner</h2>
              {routeDestinationName && (
                <p className="text-sm text-gray-500 mt-1">
                  Destination: <span className="font-medium">{routeDestinationName}</span>
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseRoutePanel} aria-label="Close route panel">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <RouteDisplayPanel />
          </div>
        </div>
      )}

      {/* Interactive Map: Fills the background */}
      <div className="h-full w-full z-0">
        <InteractiveMapWrapper
          // Example props, adjust as needed
          // initialCenter={{ lat: 34.0522, lng: -118.2437 }} // Los Angeles
          // zoom={10}
        />
      </div>

      {/* Place Details Sheet: Slides in when a place is selected */}
      <PlaceDetailsSheet
        isOpen={isPlaceDetailsSheetOpen}
        onOpenChange={setIsPlaceDetailsSheetOpen}
        place={selectedPlace}
        onGetDirections={handleGetDirections}
      />
    </div>
  );
};

export default MainApplicationPage;