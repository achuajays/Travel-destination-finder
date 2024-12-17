import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, Clock, Search, Calendar, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search */}
      <div className="relative min-h-[600px] bg-gradient-to-br from-[#e6f7e9] to-[#f0f9f2]">
        <div className="absolute inset-0 bg-black/5" />
        <nav className="relative container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-[#00A651] font-bold text-2xl">Ticketize</div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#download" className="text-gray-600 hover:text-gray-900">Download App</a>
            <a href="#partners" className="text-gray-600 hover:text-gray-900">Partner with Us</a>
            <Button variant="outline" className="mr-2">Login</Button>
            <Button className="bg-[#00A651] hover:bg-[#008c44]">Register</Button>
          </div>
        </nav>
        
        <div className="relative container mx-auto px-4 pt-16 pb-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Take a break with Ticketize
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Experience a Interactive Discovery with Ease through our Online Ticket Booking Service
            </p>
            
            {/* Search Box */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <MapPin className="w-4 h-4" />
                    From
                  </label>
                  <Input placeholder="Enter location" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <MapPin className="w-4 h-4" />
                    To
                  </label>
                  <Input placeholder="Enter destination" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Date
                  </label>
                  <Input type="date" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Users className="w-4 h-4" />
                    Passengers
                  </label>
                  <Input type="number" min="1" defaultValue="1" className="w-full" />
                </div>
              </div>
              <Button 
                onClick={() => navigate("/search")}
                className="w-full md:w-auto bg-[#00A651] hover:bg-[#008c44] text-white px-8"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Convenient Booking at Your Fingertips
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Book with ease and enjoy the benefits of our online ticket booking platform.
              We offer flexible booking policies, effortless ticket search, and ultimate
              comfort in transportation options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="w-8 h-8 text-[#00A651]" />}
              title="Flexible Holidays"
              description="Book with confidence! Our flexible policy allows easy changes to travel dates, destinations, or cancellations."
            />
            <FeatureCard
              icon={<Search className="w-8 h-8 text-[#00A651]" />}
              title="Effortless Search"
              description="Find your perfect ticket effortlessly. Enter your details and let our smart system find the best options."
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8 text-[#00A651]" />}
              title="Ultimate Comfort"
              description="We offer various transport options, including flights, trains, buses, and more, each curated for a seamless experience."
            />
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div id="partners" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-900">Our Trusted Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <img src="/lovable-uploads/e6d07edf-8ad2-4ec9-8aae-8b2645815989.png" alt="Partner 1" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            <div className="text-gray-400 text-xl font-semibold">Partner 2</div>
            <div className="text-gray-400 text-xl font-semibold">Partner 3</div>
            <div className="text-gray-400 text-xl font-semibold">Partner 4</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-[#00A651] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            Discover the ultimate ease in online ticket booking, featuring flexible policies,
            effortless search, and a variety of transport options - all curated for your utmost comfort.
          </p>
          <Button 
            onClick={() => navigate("/search")}
            className="bg-white text-[#00A651] hover:bg-gray-100 px-8 py-6 text-lg rounded-full"
          >
            Start Exploring <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 p-3 bg-gray-50 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Index;