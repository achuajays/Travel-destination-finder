import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DestinationCardProps {
  destination: {
    title: string;
    description: string;
    flight_price: string;
    flight_duration: string;
    thumbnail: string;
    link: string;
  };
}

export const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <img
          src={destination.thumbnail}
          alt={destination.title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-primary mb-2">
          {destination.title}
        </h3>
        <p className="text-gray-600 mb-4">{destination.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-secondary font-bold">{destination.flight_price}</div>
          <div className="text-sm text-gray-500">
            Flight: {destination.flight_duration}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};