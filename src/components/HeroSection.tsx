
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop')",
          filter: "brightness(0.8)"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/40"></div>
      
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Advanced Dental Care For Your Perfect Smile
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Experience modern dentistry with compassion and expertise. Our team is dedicated to your comfort and oral health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 hover-scale"
            >
              Book Appointment
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg px-8"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
