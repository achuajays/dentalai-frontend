
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, User, FileText, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BookAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [patientId, setPatientId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId || !date || !reason) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("https://appoinmentbooking-production.up.railway.app/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          extracted_data: {
            date: format(date, "yyyy-MM-dd"),
            reason,
            patient_id: parseInt(patientId),
          },
        }),
      });

      if (response.ok) {
        toast({
          title: "Appointment Booked",
          description: "Your appointment was successfully scheduled",
        });
        
        // Reset form
        setPatientId("");
        setDate(undefined);
        setReason("");
        
        // Close modal
        onOpenChange(false);
      } else {
        throw new Error("Failed to book appointment");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-800">Book Your Dental Appointment</DialogTitle>
          <DialogDescription>
            Fill out the form below to schedule your visit with our specialists.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="patientId" className="font-medium">
              Patient ID
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="patientId"
                type="number"
                placeholder="Enter your patient ID"
                className="pl-10"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="date" className="font-medium">
              Appointment Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="reason" className="font-medium">
              Reason for Visit
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Textarea
                id="reason"
                placeholder="Please describe your dental concerns"
                className="min-h-[80px] pl-10"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading}>Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-700 hover:bg-blue-800"
            >
              {isLoading ? (
                "Booking..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Book Appointment
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
