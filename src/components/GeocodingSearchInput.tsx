import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card'; // For suggestion dropdown
import LocationSuggestionItem, { LocationSuggestion } from './LocationSuggestionItem'; // Import the new component
import { Search } from 'lucide-react';

interface GeocodingSearchInputProps {
  onPlaceSelected: (place: LocationSuggestion) => void; // Callback when a place is selected
  placeholder?: string;
  initialValue?: string;
}

const GeocodingSearchInput: React.FC<GeocodingSearchInputProps> = ({
  onPlaceSelected,
  placeholder = "Search for a location...",
  initialValue = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  console.log("Rendering GeocodingSearchInput, searchTerm:", searchTerm);

  // Simulate fetching suggestions
  useEffect(() => {
    if (searchTerm.length > 2) {
      console.log("Fetching suggestions for:", searchTerm);
      // Replace with actual geocoding API call
      const mockSuggestions: LocationSuggestion[] = [
        { id: '1', primaryText: `${searchTerm} Coffee Shop`, secondaryText: '123 Mock St, Anytown' },
        { id: '2', primaryText: `${searchTerm} Park`, secondaryText: '456 Mock Ave, Anytown' },
        { id: '3', primaryText: `Central ${searchTerm}`, secondaryText: '789 Mock Blvd, Anytown' },
      ];
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
    console.log("Suggestion selected in GeocodingSearchInput:", suggestion);
    setSearchTerm(suggestion.primaryText); // Update input with selected suggestion
    setSuggestions([]);
    setShowSuggestions(false);
    onPlaceSelected(suggestion);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.length > 2 && setShowSuggestions(true)} // Show suggestions on focus if there's text
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} // Delay to allow click on suggestion
          placeholder={placeholder}
          className="pl-10 pr-4 py-2 w-full"
          aria-label="Location search input"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 shadow-lg">
          <CardContent className="p-0 max-h-60 overflow-y-auto">
            <ul>
              {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <LocationSuggestionItem
                    suggestion={suggestion}
                    onSelect={handleSuggestionSelect}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GeocodingSearchInput;