
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Mail } from "lucide-react";
import { Appointment } from "@/types/Appointment";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const formattedDate = (() => {
    try {
      return format(new Date(appointment.date), 'MMM dd, yyyy');
    } catch (e) {
      return appointment.date;
    }
  })();

  const handleSendEmail = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(
        `https://dentalai-production.up.railway.app/email/send?recipient_email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: {
            'accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: "Reminder email sent successfully",
      });
      setIsDialogOpen(false);
      setEmail("");
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Error",
        description: "Failed to send reminder email. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
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
        <CardFooter className="pt-0 flex justify-between items-center">
          <p className="text-xs text-gray-400">Appointment #{appointment.id}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
            onClick={() => setIsDialogOpen(true)}
          >
            <Mail className="mr-1 h-4 w-4" />
            Send Reminder
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Appointment Reminder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className="col-span-3"
              />
            </div>
            <div className="col-span-4">
              <p className="text-sm text-gray-500">
                Send a reminder email for appointment on {formattedDate}.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendEmail}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentCard;
