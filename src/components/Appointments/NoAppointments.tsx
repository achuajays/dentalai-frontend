
import React from "react";
import { Calendar } from "lucide-react";

const NoAppointments: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Calendar className="h-16 w-16 text-gray-300 mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">No Appointments Found</h3>
      <p className="text-gray-500 text-center max-w-md">
        There are currently no appointments scheduled. New appointments will appear here when they are created.
      </p>
    </div>
  );
};

export default NoAppointments;
