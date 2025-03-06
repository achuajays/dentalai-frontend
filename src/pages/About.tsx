import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { GraduationCap, Shield, Award, Heart, Clock, Users, MessageSquare, Building2, FileText, CheckCircle, Search, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto py-8 px-4 max-w-7xl">
          {/* Hero Section */}
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

          {/* Mission and Vision */}
          <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl mb-16 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Mission</h2>
                <p className="text-gray-700 text-lg mb-6">
                  At DentalCare+, we are committed to revolutionizing dental healthcare by seamlessly integrating 
                  cutting-edge AI technology with compassionate, patient-centered care. Our mission is to make 
                  high-quality dental care more accessible, efficient, and personalized for everyone.
                </p>
                <div className="flex items-center">
                  <Heart className="h-12 w-12 text-blue-600 mr-4" />
                  <p className="text-blue-700 font-medium">
                    Putting patients first with technology that enhances the human touch
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-indigo-800 mb-6">Our Vision</h2>
                <p className="text-gray-700 text-lg mb-6">
                  We envision a future where AI-powered dental care is the standard, not the exception. A world where 
                  dentists have powerful digital assistants that enhance their clinical expertise, reduce administrative 
                  burden, and allow them to focus on what matters most: providing exceptional care to their patients.
                </p>
                <div className="flex items-center">
                  <GraduationCap className="h-12 w-12 text-indigo-600 mr-4" />
                  <p className="text-indigo-700 font-medium">
                    Continuous innovation and education for better oral health outcomes
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreValues.map((value, index) => <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  <CardContent className="pt-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 mb-6 mx-auto">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-center text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-center">{value.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </section>

          {/* Our Technology */}
          <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl mb-16 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">The Technology Behind DentalCare+</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">AI-Powered Solutions</h3>
                <p className="text-gray-700">
                  Our suite of AI tools represents the cutting edge of dental technology. From automated SOAP note generation 
                  with AI Scribe to advanced X-ray analysis, our AI assistants help dentists deliver faster, more accurate care.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">HIPAA-compliant data processing for all patient information</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Advanced encryption for secure data transmission and storage</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Regular security audits and compliance checks</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {techFeatures.map((feature, index) => <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-5">
                      <div className="text-blue-600 mb-3">{feature.icon}</div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </section>

          {/* Company Stats */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-100">
                  <div className="text-blue-600 mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>)}
            </div>
          </section>

          {/* CTA Section */}
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
                <Link to="/ai-tools" className="make text color black ">Explore Our Solutions</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>;
};

// Core Values data
const coreValues = [{
  title: "Innovation",
  description: "We constantly push the boundaries of what's possible in dental technology to improve patient care and clinical outcomes.",
  icon: <GraduationCap size={32} />
}, {
  title: "Excellence",
  description: "We are committed to delivering the highest standard of technology and support to our dental partners.",
  icon: <Award size={32} />
}, {
  title: "Compassion",
  description: "We believe technology should enhance the human touch, not replace it. Our tools are designed to support compassionate care.",
  icon: <Heart size={32} />
}, {
  title: "Accessibility",
  description: "We're dedicated to making advanced dental technology accessible to practices of all sizes and their diverse patient populations.",
  icon: <Users size={32} />
}, {
  title: "Integrity",
  description: "We uphold the highest ethical standards in data security, privacy, and responsible AI development.",
  icon: <Shield size={32} />
}, {
  title: "Collaboration",
  description: "We work closely with dental professionals to develop solutions that address real clinical needs and challenges.",
  icon: <MessageSquare size={32} />
}];

// Technology features data
const techFeatures = [{
  title: "Real-time Transcription",
  description: "Advanced speech-to-text algorithms capture patient consultations with high accuracy.",
  icon: <MessageSquare size={24} />
}, {
  title: "SOAP Note Generation",
  description: "AI that structures patient information into comprehensive clinical documentation.",
  icon: <FileText size={24} />
}, {
  title: "X-ray Analysis",
  description: "Computer vision technology that assists in identifying potential issues in dental X-rays.",
  icon: <Search size={24} />
}, {
  title: "Treatment Planning",
  description: "AI-assisted tools for developing comprehensive treatment plans based on patient data.",
  icon: <ClipboardList size={24} />
}];

// Company stats data
const stats = [{
  value: "5000+",
  label: "Dental Practices",
  icon: <Building2 size={24} className="mx-auto" />
}, {
  value: "1M+",
  label: "Patient Records",
  icon: <FileText size={24} className="mx-auto" />
}, {
  value: "99.9%",
  label: "Uptime",
  icon: <CheckCircle size={24} className="mx-auto" />
}, {
  value: "24/7",
  label: "Support",
  icon: <Clock size={24} className="mx-auto" />
}];
export default About;