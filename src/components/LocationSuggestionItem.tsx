import React from 'react';

export interface LocationSuggestion {
  id: string;
  primaryText: string;
  secondaryText?: string;
  // Potentially include coordinates or other data
}

interface LocationSuggestionItemProps {
  suggestion: LocationSuggestion;
  onSelect: (suggestion: LocationSuggestion) => void;
}

const LocationSuggestionItem: React.FC<LocationSuggestionItemProps> = ({ suggestion, onSelect }) => {
  console.log("Rendering LocationSuggestionItem for:", suggestion.primaryText);

  const handleSelect = () => {
    console.log("Selected suggestion:", suggestion.primaryText);
    onSelect(suggestion);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
      role="option"
    >
      <div className="font-medium">{suggestion.primaryText}</div>
      {suggestion.secondaryText && (
        <div className="text-sm text-gray-500">{suggestion.secondaryText}</div>
      )}
    </button>
  );
};

export default LocationSuggestionItem;