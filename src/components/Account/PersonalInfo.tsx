
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/types/UserProfile";
import ContactInfo from "./ContactInfo";
import AddressInfo from "./AddressInfo";
import ProfileSection from "./ProfileSection";
import ProfileHeader from "./ProfileHeader";

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
      <ProfileHeader 
        title="Personal Information" 
        description="Your personal and contact details"
        isEditing={isEditing}
        onEditToggle={onEditToggle}
      />
      <CardContent className="pt-4">
        <div className="space-y-6">
          <ProfileSection 
            title="Contact Information"
            component={
              <ContactInfo 
                userProfile={userProfile}
                editedProfile={editedProfile}
                isEditing={isEditing}
                onInputChange={onInputChange}
              />
            }
          />

          <ProfileSection 
            title="Address Information"
            component={
              <AddressInfo
                userProfile={userProfile}
                editedProfile={editedProfile}
                isEditing={isEditing}
                onInputChange={onInputChange}
              />
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
