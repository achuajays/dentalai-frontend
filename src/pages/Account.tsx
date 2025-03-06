import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Mail, MapPin, Phone, Building, Calendar, Save, Edit, LogOut, Home } from "lucide-react";

type UserProfile = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  dateOfBirth: string | null;
  medicalHistory: string | null;
  allergies: string | null;
  medications: string | null;
};

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
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-blue-800">Personal Information</CardTitle>
                    <CardDescription>Your personal and contact details</CardDescription>
                  </div>
                  <Button 
                    onClick={handleEditToggle} 
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
                        onChange={handleInputChange} 
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
                        onChange={handleInputChange} 
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
                        onChange={handleInputChange} 
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
                        onChange={handleInputChange} 
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
                        onChange={handleInputChange} 
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
                          onChange={handleInputChange} 
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
                          onChange={handleInputChange} 
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
                          onChange={handleInputChange} 
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
                          onChange={handleInputChange} 
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
          </TabsContent>

          <TabsContent value="medical">
            <Card className="shadow-lg border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-blue-800">Medical Information</CardTitle>
                    <CardDescription>Your medical history and important health information</CardDescription>
                  </div>
                  <Button 
                    onClick={handleEditToggle} 
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
                        onChange={handleInputChange} 
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
                        onChange={handleInputChange} 
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
                        onChange={handleInputChange} 
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
          </TabsContent>

          <TabsContent value="appointments">
            <Card className="shadow-lg border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-800">Your Appointments</CardTitle>
                <CardDescription>Past and upcoming dental appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-blue-50 p-6 text-center">
                  <h3 className="text-lg font-medium text-blue-700 mb-2">No appointments</h3>
                  <p className="text-gray-600 mb-4">You don't have any upcoming appointments scheduled.</p>
                  <Button 
                    onClick={() => navigate('/appointments')} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Schedule Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={confirmLogout} onOpenChange={setConfirmLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
            <DialogDescription>
              You will be logged out of your account and returned to the home page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmLogout(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Account;
