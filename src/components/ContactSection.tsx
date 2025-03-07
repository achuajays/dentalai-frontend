
import { MapPin, Phone, Clock, AlertTriangle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveMap from "@/components/ui/InteractiveMap";

export function ContactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're conveniently located and offer flexible hours to accommodate your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="text-blue-600 mb-2"><Clock size={24} /></div>
                  <CardTitle className="text-xl">Office Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 2:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="text-blue-600 mb-2"><AlertTriangle size={24} /></div>
                  <CardTitle className="text-xl">Emergency Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">
                    Dental emergencies can happen anytime. We offer same-day appointments for urgent cases.
                  </p>
                  <p className="font-semibold text-blue-600">
                    Emergency: (555) 123-4567
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="text-blue-600 mb-2"><CreditCard size={24} /></div>
                  <CardTitle className="text-xl">Payment Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">
                    We accept most dental insurance plans, credit cards, and offer flexible payment plans.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Most major insurances accepted</li>
                    <li>Flexible payment plans</li>
                    <li>Credit cards accepted</li>
                    <li>Care Credit financing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="text-blue-600 mb-2"><Phone size={24} /></div>
                  <CardTitle className="text-xl">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">
                    Have questions or ready to schedule an appointment? Reach out to us anytime.
                  </p>
                  <p className="font-semibold mb-1">Phone: (555) 987-6543</p>
                  <p className="font-semibold mb-1">Email: info@dentalcareplus.com</p>
                  <p className="font-semibold">Fax: (555) 987-6544</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-md h-[400px]">
            <InteractiveMap 
              center={[-122.4194, 37.7749]} 
              zoom={15} 
              address="123 Dental Way, Suite 100, San Francisco, CA 94110" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
