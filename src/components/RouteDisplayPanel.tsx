import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import RouteInstructionStep from './RouteInstructionStep'; // Import the new component
import { Car, Walking, Bike, Navigation } from 'lucide-react'; // Example icons

interface RouteStep {
  id: string;
  icon?: React.ElementType; // Lucide icon component
  instruction: string;
  distance?: string;
  duration?: string;
}

interface RouteDisplayPanelProps {
  // Example: onRouteCalculate: (origin: string, destination: string, mode: string) => void;
  // Example: initialRouteSteps?: RouteStep[];
}

const RouteDisplayPanel: React.FC<RouteDisplayPanelProps> = (props) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('driving'); // driving, walking, cycling
  const [routeSteps, setRouteSteps] = useState<RouteStep[]>([
    // Placeholder route steps
    { id: '1', icon: Navigation, instruction: 'Head north on Main St', distance: '0.2 mi' },
    { id: '2', icon: CornerUpLeft, instruction: 'Turn left onto Park Ave', distance: '0.5 mi', duration: '2 min' },
    { id: '3', instruction: 'Destination will be on your right', distance: '100 ft' },
  ]);

  console.log("Rendering RouteDisplayPanel, mode:", travelMode);

  const handleCalculateRoute = () => {
    console.log("Calculating route from", origin, "to", destination, "by", travelMode);
    // Call props.onRouteCalculate(origin, destination, travelMode)
    // For now, just log. In a real app, this would trigger API call and update routeSteps.
  };

  return (
    <div className="p-4 space-y-4 border border-gray-200 rounded-md shadow-sm bg-white h-full flex flex-col">
      <h2 className="text-lg font-semibold">Directions</h2>
      <div className="space-y-2">
        <div>
          <Label htmlFor="origin">Origin</Label>
          <Input
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Your location or address"
          />
        </div>
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
        </div>
      </div>

      <div>
        <Label>Travel Mode</Label>
        <ToggleGroup
          type="single"
          value={travelMode}
          onValueChange={(value) => { if (value) setTravelMode(value); }}
          className="mt-1"
          aria-label="Travel mode"
        >
          <ToggleGroupItem value="driving" aria-label="Driving">
            <Car className="h-4 w-4 mr-2" /> Driving
          </ToggleGroupItem>
          <ToggleGroupItem value="walking" aria-label="Walking">
            <Walking className="h-4 w-4 mr-2" /> Walking
          </ToggleGroupItem>
          <ToggleGroupItem value="cycling" aria-label="Cycling">
            <Bike className="h-4 w-4 mr-2" /> Cycling
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Button onClick={handleCalculateRoute} className="w-full">Get Directions</Button>

      <Separator className="my-4" />

      <h3 className="text-md font-medium">Route Steps:</h3>
      {routeSteps.length > 0 ? (
        <ScrollArea className="flex-grow h-48"> {/* Adjust height as needed */}
          <div className="space-y-1 pr-2">
            {routeSteps.map((step) => (
              <RouteInstructionStep
                key={step.id}
                icon={step.icon}
                instruction={step.instruction}
                distance={step.distance}
                duration={step.duration}
              />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <p className="text-sm text-gray-500">Enter origin and destination to see route steps.</p>
      )}
    </div>
  );
};

// Helper component, not typically exported unless used elsewhere.
const Separator: React.FC<{className?: string}> = ({className}) => <hr className={`border-gray-200 ${className}`} />;


export default RouteDisplayPanel;