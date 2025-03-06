
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Check } from "lucide-react";

interface PhoneCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PhoneCallModal: React.FC<PhoneCallModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a valid phone number with country code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // URL encode the phone number
      const encodedPhoneNumber = encodeURIComponent(phoneNumber);
      
      const response = await fetch(`https://dentalai-production.up.railway.app/make-call?recipient_phone_number=${encodedPhoneNumber}`, {
        method: "POST",
        headers: {
          "accept": "application/json"
        },
        body: "", // Empty body as specified
      });

      const data = await response.json();

      if (data.status === "success") {
        toast({
          title: "Success",
          description: "We'll call you shortly to schedule your appointment",
        });
        
        // Reset form and close modal
        setPhoneNumber("");
        onOpenChange(false);
      } else {
        throw new Error(data.message || "Failed to schedule call");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule your call. Please try again.",
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
          <DialogTitle className="text-xl font-bold text-blue-800">Schedule a Call Back</DialogTitle>
          <DialogDescription>
            Please enter your phone number with country code, and we'll call you shortly.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber" className="font-medium">
              Phone Number (with country code)
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (123) 456-7890"
                className="pl-10"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <p className="text-xs text-gray-500">Example: +1 for USA, +44 for UK, +91 for India</p>
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
                "Scheduling..."
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Schedule Call
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
