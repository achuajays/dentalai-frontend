
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="container flex flex-col lg:flex-row-reverse max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl">
        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col justify-center">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-700 mb-2">Get Started</h1>
              <p className="text-gray-600">Create your DentalCare+ account</p>
            </div>

            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-1 p-0">
                <CardTitle className="text-2xl text-center font-bold">Sign Up</CardTitle>
                <CardDescription className="text-center">
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="youremail@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-800">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-800">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white hover-scale"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="p-0 mt-4 flex justify-center">
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Left side - Image Banner */}
        <div className="hidden lg:block w-1/2 bg-blue-700 p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-700/80"></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/lovable-uploads/d83b9060-9af2-49a7-837f-a9ab57f39afa.png')" }}></div>
          <div className="relative z-10 h-full flex flex-col justify-center text-white">
            <h2 className="text-5xl font-bold mb-6">Enter the Future</h2>
            <h3 className="text-3xl font-light mb-8">of Dental Care, today</h3>
            <p className="text-xl mb-8 max-w-md">
              Join thousands of dental professionals using our platform to transform patient care with AI technology.
            </p>
            <div className="mt-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-sm text-white/80 mb-2">Getting started is easy</div>
                <div className="text-2xl font-bold">Free 30-day trial for new users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
