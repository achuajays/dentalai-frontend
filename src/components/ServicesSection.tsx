
import { Tooth, Smile, Star, Heart, X, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive dental care for patients of all ages, from preventive dentistry to cosmetic procedures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-none shadow-sm hover:shadow-md transition-all hover-scale"
            >
              <CardHeader className="pb-2">
                <div className="text-blue-600 mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "General Dentistry",
    shortDescription: "Comprehensive care for all ages",
    description: "Regular check-ups, cleanings, fillings, and preventive care to maintain your oral health and catch issues early.",
    icon: <Tooth size={28} />
  },
  {
    title: "Cosmetic Dentistry",
    shortDescription: "Enhance your smile",
    description: "Teeth whitening, veneers, bonding, and other treatments to improve the appearance of your teeth and smile.",
    icon: <Smile size={28} />
  },
  {
    title: "Orthodontics",
    shortDescription: "Straighten your teeth",
    description: "Traditional braces, clear aligners, and other orthodontic treatments to correct misaligned teeth and improve bite.",
    icon: <Star size={28} />
  },
  {
    title: "Restorative Dentistry",
    shortDescription: "Repair damaged teeth",
    description: "Crowns, bridges, dentures, and implants to restore function and appearance to damaged or missing teeth.",
    icon: <FileText size={28} />
  },
  {
    title: "Emergency Dental Care",
    shortDescription: "Immediate relief for pain",
    description: "Same-day appointments for dental emergencies, including severe pain, broken teeth, or lost fillings.",
    icon: <X size={28} />
  },
  {
    title: "Pediatric Dentistry",
    shortDescription: "Child-friendly dental care",
    description: "Specialized care for children in a comfortable environment, focusing on prevention and positive experiences.",
    icon: <Heart size={28} />
  }
];
