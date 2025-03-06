
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Building } from "lucide-react";
import { UserProfile } from "@/types/UserProfile";

interface AddressInfoProps {
  userProfile: UserProfile;
  editedProfile: UserProfile;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AddressInfo = ({ 
  userProfile, 
  editedProfile, 
  isEditing, 
  onInputChange 
}: AddressInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="address" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          Street Address
        </Label>
        {isEditing ? (
          <Input 
            id="address" 
            name="address" 
            value={editedProfile.address || ''} 
            onChange={onInputChange} 
            placeholder="Enter your street address"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-md">{userProfile.address || 'Not provided'}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="flex items-center gap-2">
          <Building className="h-4 w-4 text-blue-500" />
          City
        </Label>
        {isEditing ? (
          <Input 
            id="city" 
            name="city" 
            value={editedProfile.city || ''} 
            onChange={onInputChange} 
            placeholder="Enter your city"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-md">{userProfile.city || 'Not provided'}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        {isEditing ? (
          <Input 
            id="state" 
            name="state" 
            value={editedProfile.state || ''} 
            onChange={onInputChange} 
            placeholder="Enter your state"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-md">{userProfile.state || 'Not provided'}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">Zip Code</Label>
        {isEditing ? (
          <Input 
            id="zipCode" 
            name="zipCode" 
            value={editedProfile.zipCode || ''} 
            onChange={onInputChange} 
            placeholder="Enter your zip code"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-md">{userProfile.zipCode || 'Not provided'}</div>
        )}
      </div>
    </div>
  );
};

export default AddressInfo;
