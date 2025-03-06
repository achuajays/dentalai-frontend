
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save } from "lucide-react";
import { UserProfile } from "@/types/UserProfile";
import ContactInfo from "./ContactInfo";
import AddressInfo from "./AddressInfo";

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
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-3">Contact Information</h3>
            <ContactInfo 
              userProfile={userProfile}
              editedProfile={editedProfile}
              isEditing={isEditing}
              onInputChange={onInputChange}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-3">Address Information</h3>
            <AddressInfo
              userProfile={userProfile}
              editedProfile={editedProfile}
              isEditing={isEditing}
              onInputChange={onInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
