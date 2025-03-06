
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTASection: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl mb-16 p-8 md:p-12 text-white text-center">
      <h2 className="text-3xl font-bold mb-6">Experience the Future of Dental Care</h2>
      <p className="text-xl mb-8 max-w-3xl mx-auto">
        Join the growing number of dental professionals who are transforming their practice with our AI-powered tools.
      </p>
      <div className="flex justify-center flex-wrap gap-4">
        <Button asChild size="lg" variant="secondary" className="rounded-full">
          <Link to="/signup">Get Started Today</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full border-white text-white hover:bg-white hover:text-blue-700">
          <Link to="/ai-tools">Explore Our Solutions</Link>
        </Button>
      </div>
    </section>
  );
};
