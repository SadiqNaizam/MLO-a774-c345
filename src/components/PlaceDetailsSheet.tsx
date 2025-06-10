import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose, // Optional: for a close button inside
} from '@/components/ui/sheet'; // Assuming shadcn/ui Sheet
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Globe } from 'lucide-react'; // Example icons

interface PlaceDetails {
  name: string;
  address?: string;
  category?: string;
  imageUrl?: string;
  phone?: string;
  website?: string;
  // other details...
}

interface PlaceDetailsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  place?: PlaceDetails | null; // Place data to display
  onGetDirections: (place: PlaceDetails) => void;
}

const PlaceDetailsSheet: React.FC<PlaceDetailsSheetProps> = ({
  isOpen,
  onOpenChange,
  place,
  onGetDirections,
}) => {
  console.log("Rendering PlaceDetailsSheet, isOpen:", isOpen, "Place:", place?.name);

  if (!place) {
    return null; // Don't render if no place data or not open (Sheet handles open state visually)
  }

  const handleDirectionsClick = () => {
    if (place) {
        console.log("Get directions clicked for:", place.name);
        onGetDirections(place);
        onOpenChange(false); // Optionally close sheet after clicking directions
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md flex flex-col">
        <SheetHeader className="mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={place.imageUrl || '/placeholder.svg'} alt={place.name} />
              <AvatarFallback>{place.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <SheetTitle className="text-xl">{place.name}</SheetTitle>
                {place.category && <Badge variant="secondary">{place.category}</Badge>}
            </div>
          </div>
          {place.address && (
            <SheetDescription className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              {place.address}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="flex-grow space-y-3 overflow-y-auto pr-2">
            {/* More details can go here */}
            {place.phone && (
                <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" />
                    <span>{place.phone}</span>
                </div>
            )}
            {place.website && (
                <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" />
                    <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {place.website}
                    </a>
                </div>
            )}
            {/* Example: Opening Hours, Reviews placeholder */}
            <p className="text-xs text-gray-400 mt-4">Additional details like opening hours, reviews, etc., would appear here.</p>
        </div>

        <SheetFooter className="mt-auto pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button type="button" onClick={handleDirectionsClick} className="w-full sm:w-auto">
            Directions
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PlaceDetailsSheet;