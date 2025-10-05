import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ForecastCard } from "@/components/ForecastCard";
import { PollutantCard } from "@/components/PollutantCard";
import { ForecastChart } from "@/components/ForecastChart";
import { HealthAdvisory } from "@/components/HealthAdvisory";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Footer } from "@/components/Footer";
import { Cloud, Droplet, Wind, Flame, Zap, Factory } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [location, setLocation] = useState("");
  const [showForecast, setShowForecast] = useState(false);

  // Mock data - In production, fetch from NASA TEMPO API, weather API, etc.
  const mockForecastData = [
    { day: "Mon", aqi: 42 },
    { day: "Tue", aqi: 38 },
    { day: "Wed", aqi: 45 },
    { day: "Thu", aqi: 52 },
    { day: "Fri", aqi: 48 },
  ];

  const mockMapLocations = [
    { name: "Delhi", aqi: 152, lat: 28.6, lng: 77.2, category: "Unhealthy" },
    { name: "Mumbai", aqi: 68, lat: 19.0, lng: 72.8, category: "Moderate" },
    { name: "Bangalore", aqi: 42, lat: 12.9, lng: 77.6, category: "Good" },
    { name: "Chennai", aqi: 55, lat: 13.0, lng: 80.2, category: "Moderate" },
    { name: "Kolkata", aqi: 98, lat: 22.5, lng: 88.3, category: "Moderate" },
    { name: "Hyderabad", aqi: 72, lat: 17.4, lng: 78.4, category: "Moderate" },
  ];

  const handleSearch = (searchLocation: string) => {
    setLocation(searchLocation);
    setShowForecast(true);
    toast.success(`Fetching forecast for ${searchLocation}...`);
    
    // Scroll to forecast section
    setTimeout(() => {
      document.getElementById("forecast")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentAQI={42} aqiCategory="Good" />
      
      <Hero onSearch={handleSearch} />

      {showForecast && (
        <main id="forecast" className="container mx-auto px-4 py-16 space-y-16 animate-fade-in">
          {/* Current Forecast Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Current Air Quality - {location}
            </h2>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ForecastCard
                  location={location}
                  aqi={42}
                  category="Good"
                  weather={{
                    temperature: 24,
                    humidity: 65,
                    windSpeed: 12,
                  }}
                />
              </div>
              <div className="lg:col-span-2">
                <ForecastChart data={mockForecastData} />
              </div>
            </div>
          </section>

          {/* Pollutant Breakdown Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Pollutant Levels</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <PollutantCard
                name="PM2.5"
                value={12.5}
                unit="µg/m³"
                icon={Cloud}
                description="Fine particulate matter smaller than 2.5 micrometers. Primary health concern for respiratory issues."
                status="good"
              />
              <PollutantCard
                name="PM10"
                value={28.3}
                unit="µg/m³"
                icon={Droplet}
                description="Particulate matter smaller than 10 micrometers. Can irritate airways and lungs."
                status="good"
              />
              <PollutantCard
                name="NO₂"
                value={35.2}
                unit="ppb"
                icon={Factory}
                description="Nitrogen dioxide from vehicle emissions and industrial sources."
                status="moderate"
              />
              <PollutantCard
                name="O₃"
                value={42.8}
                unit="ppb"
                icon={Zap}
                description="Ground-level ozone, formed by reactions of pollutants in sunlight."
                status="moderate"
              />
              <PollutantCard
                name="CO"
                value={0.5}
                unit="ppm"
                icon={Flame}
                description="Carbon monoxide from incomplete combustion of fossil fuels."
                status="good"
              />
              <PollutantCard
                name="SO₂"
                value={8.2}
                unit="ppb"
                icon={Wind}
                description="Sulfur dioxide from burning coal and oil."
                status="good"
              />
            </div>
          </section>

          {/* Health Advisory Section */}
          <section id="about">
            <h2 className="text-3xl font-bold text-foreground mb-8">Health Recommendations</h2>
            <HealthAdvisory aqiCategory="Good" />
          </section>

          {/* Interactive Map Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Regional Air Quality</h2>
            <InteractiveMap locations={mockMapLocations} />
          </section>
        </main>
      )}

      {!showForecast && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-card rounded-lg shadow-soft">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">NASA TEMPO Data</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time satellite observations of air pollutants over North America
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-soft">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Wind className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Weather Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Combined with meteorological data for accurate forecasting
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-soft">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <Factory className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Ground Sensors</h3>
                <p className="text-sm text-muted-foreground">
                  Validated with ground-level monitoring stations for precision
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
