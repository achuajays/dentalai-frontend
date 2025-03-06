
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, MapPin, Phone, Building, Calendar, Save, Edit } from "lucide-react";
import { UserProfile } from "@/types/UserProfile";

interface PersonalInfoProps {
  userProfile: UserProfile;
  editedProfile: UserProfile;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEditToggle: () => void;
}

const PersonalInfo = ({ 
  userProfile, 
  editedProfile, 
  isEditing, 
  onInputChange, 
  onEditToggle 
}: PersonalInfoProps) => {
  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-800">Personal Information</CardTitle>
            <CardDescription>Your personal and contact details</CardDescription>
          </div>
          <Button 
            onClick={onEditToggle} 
            variant="outline" 
            className={`gap-2 ${isEditing ? 'bg-blue-100 text-blue-700' : ''}`}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
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

        <div className="mt-6">
          <h3 className="text-lg font-medium text-blue-800 mb-3">Address Information</h3>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
