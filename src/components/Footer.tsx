import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/b4975272-2fc3-479d-bb65-462c16f4c351.png" 
                alt="DentalCare+ Logo" 
                className="h-10 bg-white rounded-full p-1"
              />
              <h3 className="text-xl font-bold">DentalCare+</h3>
            </div>
            <p className="text-blue-100 mb-4">
              Providing exceptional dental care with compassion and expertise for over 15 years.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-100 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-blue-100 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/appointments" className="text-blue-100 hover:text-white transition-colors">Appointments</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">General Dentistry</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Cosmetic Dentistry</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Orthodontics</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Pediatric Dentistry</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Emergency Care</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-blue-100">
              <li>123 Dental Way, Suite 100</li>
              <li>San Francisco, CA 94110</li>
              <li>Phone: (555) 987-6543</li>
              <li>Email: info@dentalcareplus.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; {new Date().getFullYear()} DentalCare+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
