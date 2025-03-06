
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Edit } from "lucide-react";
import { UserProfile } from "@/types/UserProfile";

interface MedicalInfoProps {
  userProfile: UserProfile;
  editedProfile: UserProfile;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEditToggle: () => void;
}

const MedicalInfo = ({ 
  userProfile, 
  editedProfile, 
  isEditing, 
  onInputChange, 
  onEditToggle 
}: MedicalInfoProps) => {
  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-800">Medical Information</CardTitle>
            <CardDescription>Your medical history and important health information</CardDescription>
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
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Medical History</Label>
            {isEditing ? (
              <Textarea 
                id="medicalHistory" 
                name="medicalHistory" 
                rows={4} 
                value={editedProfile.medicalHistory || ''} 
                onChange={onInputChange} 
                placeholder="Enter your medical history"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-md min-h-[100px]">
                {userProfile.medicalHistory || 'No medical history provided'}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            {isEditing ? (
              <Textarea 
                id="allergies" 
                name="allergies" 
                rows={3} 
                value={editedProfile.allergies || ''} 
                onChange={onInputChange} 
                placeholder="Enter any allergies"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-md min-h-[80px]">
                {userProfile.allergies || 'No allergies provided'}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="medications">Current Medications</Label>
            {isEditing ? (
              <Textarea 
                id="medications" 
                name="medications" 
                rows={3} 
                value={editedProfile.medications || ''} 
                onChange={onInputChange} 
                placeholder="Enter current medications"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-md min-h-[80px]">
                {userProfile.medications || 'No medications provided'}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalInfo;
