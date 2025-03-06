
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection: React.FC = () => {
  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-6">
        About DentalCare+
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
        Leading the future of dental healthcare with advanced technology and compassionate care
      </p>
      <div className="flex justify-center flex-wrap gap-4">
        <Button asChild size="lg" className="rounded-full">
          <Link to="/ai-tools">Explore AI Tools</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link to="/appointments">Schedule Appointment</Link>
        </Button>
      </div>
    </section>
  );
};
