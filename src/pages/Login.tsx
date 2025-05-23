
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="container flex flex-col lg:flex-row max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col justify-center">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-700 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Log in to access your DentalCare+ account</p>
            </div>

            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-1 p-0">
                <CardTitle className="text-2xl text-center font-bold">Login</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials below to continue
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
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot?
                      </Link>
                    </div>
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
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white hover-scale"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="p-0 mt-4 flex justify-center">
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Right side - Image Banner */}
        <div className="hidden lg:block w-1/2 bg-blue-700 p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-700/80"></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/lovable-uploads/d83b9060-9af2-49a7-837f-a9ab57f39afa.png')" }}></div>
          <div className="relative z-10 h-full flex flex-col justify-center text-white">
            <h2 className="text-5xl font-bold mb-6">Enter the Future</h2>
            <h3 className="text-3xl font-light mb-8">of Dental Care, today</h3>
            <p className="text-xl mb-8 max-w-md">
              Access advanced dental AI tools and improve patient outcomes with our cutting-edge platform.
            </p>
            <div className="mt-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-sm text-white/80 mb-2">Trusted by dental professionals worldwide</div>
                <div className="text-2xl font-bold">5,000+ Active Practices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
