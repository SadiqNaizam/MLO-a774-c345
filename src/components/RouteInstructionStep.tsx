import React from 'react';
import { Icon as LucideIcon, Navigation, CornerUpLeft, ArrowRight } from 'lucide-react'; // Example icons

interface RouteInstructionStepProps {
  icon?: LucideIcon; // e.g., a turn icon
  instruction: string;
  distance?: string; // e.g., "0.5 mi"
  duration?: string; // e.g. "2 min"
}

const RouteInstructionStep: React.FC<RouteInstructionStepProps> = ({
  icon: IconComponent = ArrowRight, // Default icon
  instruction,
  distance,
  duration,
}) => {
  console.log("Rendering RouteInstructionStep:", instruction);
  return (
    <div className="flex items-start space-x-3 py-2 px-1">
      <div className="flex-shrink-0 pt-1">
        <IconComponent className="h-5 w-5 text-gray-600" aria-hidden="true" />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-800">{instruction}</p>
        {(distance || duration) && (
          <p className="text-xs text-gray-500">
            {distance}{distance && duration && " / "}{duration}
          </p>
        )}
      </div>
    </div>
  );
};

export default RouteInstructionStep;