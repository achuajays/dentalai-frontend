
import React from "react";
import { Building2, FileText, CheckCircle, Clock } from "lucide-react";

type StatProps = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const stats: StatProps[] = [
  {
    value: "5000+",
    label: "Dental Practices",
    icon: <Building2 size={24} className="mx-auto" />
  }, 
  {
    value: "1M+",
    label: "Patient Records",
    icon: <FileText size={24} className="mx-auto" />
  }, 
  {
    value: "99.9%",
    label: "Uptime",
    icon: <CheckCircle size={24} className="mx-auto" />
  }, 
  {
    value: "24/7",
    label: "Support",
    icon: <Clock size={24} className="mx-auto" />
  }
];

export const CompanyStats: React.FC = () => {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-100">
            <div className="text-blue-600 mb-3">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
