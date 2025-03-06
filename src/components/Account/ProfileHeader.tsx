
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";

interface ProfileHeaderProps {
  title: string;
  description: string;
  isEditing: boolean;
  onEditToggle: () => void;
}

const ProfileHeader = ({ title, description, isEditing, onEditToggle }: ProfileHeaderProps) => {
  return (
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-blue-800">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
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
  );
};

export default ProfileHeader;
