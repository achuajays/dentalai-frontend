
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { UserProfile } from "@/types/UserProfile";

interface ContactInfoProps {
  userProfile: UserProfile;
  editedProfile: UserProfile;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactInfo = ({ 
  userProfile, 
  editedProfile, 
  isEditing, 
  onInputChange 
}: ContactInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="flex items-center gap-2">
          <User className="h-4 w-4 text-blue-500" />
          First Name
        </Label>
        {isEditing ? (
          <Input 
            id="firstName" 
            name="firstName" 
            value={editedProfile.firstName || ''} 
            onChange={onInputChange} 
            placeholder="Enter your first name"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-md">{userProfile.firstName || 'Not provided'}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName" className="flex items-center gap-2">
          <User className="h-4 w-4 text-blue-500" />
          Last Name
        </Label>
        {isEditing ? (
          <Input 
            id="lastName" 
            name="lastName" 
            value={editedProfile.lastName || ''} 
            onChange={onInputChange} 
            placeholder="Enter your last name"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-md">{userProfile.lastName || 'Not provided'}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-blue-500" />
          Email
        </Label>
        {isEditing ? (
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={editedProfile.email || ''} 
            onChange={onInputChange} 
            placeholder="Enter your email address"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-md">{userProfile.email || 'Not provided'}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-blue-500" />
          Phone
        </Label>
        {isEditing ? (
          <Input 
            id="phone" 
            name="phone" 
            value={editedProfile.phone || ''} 
            onChange={onInputChange} 
            placeholder="Enter your phone number"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-md">{userProfile.phone || 'Not provided'}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-500" />
          Date of Birth
        </Label>
        {isEditing ? (
          <Input 
            id="dateOfBirth" 
            name="dateOfBirth" 
            type="date" 
            value={editedProfile.dateOfBirth || ''} 
            onChange={onInputChange} 
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-md">{userProfile.dateOfBirth || 'Not provided'}</div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
