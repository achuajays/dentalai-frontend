
import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/About/HeroSection";
import { MissionVision } from "@/components/About/MissionVision";
import { CoreValues } from "@/components/About/CoreValues";
import { CommunityPlatforms } from "@/components/About/CommunityPlatforms";
import { TechnologyFeatures } from "@/components/About/TechnologyFeatures";
import { CompanyStats } from "@/components/About/CompanyStats";
import { CTASection } from "@/components/About/CTASection";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto py-8 px-4 max-w-7xl">
          {/* Hero Section */}
          <HeroSection />

          {/* Mission and Vision */}
          <MissionVision />

          {/* Core Values */}
          <CoreValues />

          {/* Community Platforms Section */}
          <CommunityPlatforms />

          {/* Our Technology */}
          <TechnologyFeatures />

          {/* Company Stats */}
          <CompanyStats />

          {/* CTA Section */}
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
