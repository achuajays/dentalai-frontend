
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read testimonials from our satisfied patients about their dental experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold mr-3">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Sarah Johnson",
    type: "Regular Patient",
    rating: 5,
    comment: "I've been going to DentalCare+ for years and have always had excellent experiences. The staff is friendly and professional, and the dentists are thorough and gentle."
  },
  {
    name: "Michael Chen",
    type: "New Patient",
    rating: 5,
    comment: "As someone with dental anxiety, I was nervous about my first visit, but the team made me feel comfortable and explained everything clearly. Best dental experience I've had!"
  },
  {
    name: "Emily Rodriguez",
    type: "Orthodontic Patient",
    rating: 4,
    comment: "My Invisalign treatment has been going great. The dentists are knowledgeable and the office uses the latest technology. I'm already seeing results!"
  },
  {
    name: "David Williams",
    type: "Emergency Patient",
    rating: 5,
    comment: "I had a dental emergency and they got me in the same day. The pain was quickly addressed and they created a treatment plan that worked for me."
  },
  {
    name: "Sophia Martinez",
    type: "Parent of Patient",
    rating: 5,
    comment: "My kids used to dread going to the dentist until we found DentalCare+. Now they actually look forward to their appointments thanks to the friendly staff and kid-friendly approach."
  },
  {
    name: "James Thompson",
    type: "Cosmetic Dentistry Patient",
    rating: 5,
    comment: "I couldn't be happier with my veneers! The dentists listened to what I wanted and delivered results that exceeded my expectations. Worth every penny."
  }
];
