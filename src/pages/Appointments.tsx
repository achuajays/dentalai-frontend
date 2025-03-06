
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAppointments } from "@/services/appointmentService";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppointmentCard from "@/components/Appointments/AppointmentCard";
import NoAppointments from "@/components/Appointments/NoAppointments";
import AppointmentsLoading from "@/components/Appointments/AppointmentsLoading";
import { useToast } from "@/hooks/use-toast";

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
    gcTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000, // 2 minutes
    onSettled: (_data, error) => {
      if (error) {
        console.error("Error loading appointments:", error);
        toast({
          title: "Error",
          description: "Failed to load appointments. Please try again later.",
          variant: "destructive",
        });
      } else {
        console.log("Appointments loaded successfully");
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                <Calendar className="mr-2 h-7 w-7 text-blue-600" />
                Appointments
              </h1>
            </div>
            <p className="text-gray-600">
              Manage your scheduled dental appointments
            </p>
          </div>

          {isLoading ? (
            <AppointmentsLoading />
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">
              An error occurred while loading appointments. Please try again later.
            </div>
          ) : appointments && appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ) : (
            <NoAppointments />
          )}
        </div>
      </main>
    </div>
  );
};

export default Appointments;
