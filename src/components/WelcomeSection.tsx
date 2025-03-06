
import { Stethoscope, Shield, Clock, UserCheck } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Welcome to DentalCare+</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We combine advanced technology with compassionate care to deliver the best dental experience for you and your family.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center hover-scale transition-all hover:shadow-md"
            >
              <div className="bg-blue-600 p-3 rounded-full mb-4 text-white">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    title: "Advanced Technology",
    description: "State-of-the-art equipment and modern techniques for precise diagnosis and treatment.",
    icon: <Stethoscope size={24} />
  },
  {
    title: "Patient Safety",
    description: "Stringent protocols to ensure a clean, sanitized, and safe environment for all procedures.",
    icon: <Shield size={24} />
  },
  {
    title: "Convenient Hours",
    description: "Flexible scheduling including evenings and weekends to accommodate your busy life.",
    icon: <Clock size={24} />
  },
  {
    title: "Experienced Team",
    description: "Our dentists have over 20 years of combined experience in various dental specialties.",
    icon: <UserCheck size={24} />
  }
];
