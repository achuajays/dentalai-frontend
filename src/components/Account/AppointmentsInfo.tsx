
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AppointmentsInfo = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-800">Your Appointments</CardTitle>
        <CardDescription>Past and upcoming dental appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-blue-50 p-6 text-center">
          <h3 className="text-lg font-medium text-blue-700 mb-2">No appointments</h3>
          <p className="text-gray-600 mb-4">You don't have any upcoming appointments scheduled.</p>
          <Button 
            onClick={() => navigate('/appointments')} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Schedule Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsInfo;
