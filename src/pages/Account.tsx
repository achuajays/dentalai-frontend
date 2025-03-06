
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Home } from "lucide-react";
import { UserProfile } from "@/types/UserProfile";
import PersonalInfo from "@/components/Account/PersonalInfo";
import MedicalInfo from "@/components/Account/MedicalInfo";
import AppointmentsInfo from "@/components/Account/AppointmentsInfo";
import LogoutDialog from "@/components/Account/LogoutDialog";

const Account = () => {
  const { isLoggedIn, logout, userId } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    state: null,
    zipCode: null,
    dateOfBirth: null,
    medicalHistory: null,
    allergies: null,
    medications: null
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  useEffect(() => {
    if (userId) {
      const savedProfile = localStorage.getItem(`userProfile_${userId}`);
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setUserProfile(parsedProfile);
        setEditedProfile(parsedProfile);
      }
    }
  }, [userId]);

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setUserProfile(editedProfile);
      if (userId) {
        localStorage.setItem(`userProfile_${userId}`, JSON.stringify(editedProfile));
      }
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>

        <div className="flex justify-between mb-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={handleHomeClick}
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => setConfirmLogout(true)}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfo 
              userProfile={userProfile}
              editedProfile={editedProfile}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              onEditToggle={handleEditToggle}
            />
          </TabsContent>

          <TabsContent value="medical">
            <MedicalInfo 
              userProfile={userProfile}
              editedProfile={editedProfile}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              onEditToggle={handleEditToggle}
            />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentsInfo />
          </TabsContent>
        </Tabs>
      </div>

      <LogoutDialog 
        open={confirmLogout} 
        onOpenChange={setConfirmLogout} 
        onLogout={handleLogout} 
      />
    </div>
  );
};

export default Account;
