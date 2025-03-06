
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { Appointment } from "@/types/Appointment";
import { format } from "date-fns";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const formattedDate = (() => {
    try {
      return format(new Date(appointment.date), 'MMM dd, yyyy');
    } catch (e) {
      return appointment.date;
    }
  })();

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-600" />
          {formattedDate}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-2">{appointment.reason}</p>
        <div className="flex items-center text-sm text-gray-500">
          <User className="mr-1 h-4 w-4" />
          <span>Patient ID: {appointment.patient_id}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-gray-400">Appointment #{appointment.id}</p>
      </CardFooter>
    </Card>
  );
};

export default AppointmentCard;
