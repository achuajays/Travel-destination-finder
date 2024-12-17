import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MapPin, Clock, DollarSign, RefreshCw } from "lucide-react";

interface Destination {
  title: string;
  description: string;
  rating: number;
  reviews: number;
  price?: string;
  extracted_price?: number;
  thumbnail: string;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("best hill place in kerala");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["destinations", searchTerm],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/search-destination/?prompt=${encodeURIComponent(searchTerm)}`, {
        method: "POST",
        headers: {
          "accept": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: false, // Start fetching only when refetch() is called
  });

  const handleSearch = () => {
    refetch();
  };

  // Ensure data is defined before mapping
  const destinations = data ? data.destinations : [];

  return (
    <div className="min-h-screen bg-neutral p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Discover Your Dream Destination</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your preferences below and let us help you find the perfect vacation spot that matches your desires.
          </p>
        </div>

        <div className="flex gap-4 mb-8 max-w-2xl mx-auto">
          <Input
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // No longer triggers search
            className="flex-1"
          />
          <Button 
            onClick={handleSearch} 
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Finding perfect destinations for you...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination: Destination, index: number) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={destination.thumbnail}
                    alt={destination.title}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{destination.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {destination.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {destination.rating} ({destination.reviews} reviews)
                    </div>
                    {destination.price && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {destination.price}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;