
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList 
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-white py-4 px-6 md:px-10 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DentalCare+
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X /> : <Menu />}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 animate-fade-in">
                {isLoggedIn ? (
                  <NavigationMenu className="w-full">
                    <NavigationMenuList className="flex flex-col w-full space-y-2">
                      <NavigationMenuItem className="w-full">
                        <Link to="/ai-scribe" className="w-full block p-2 hover:bg-blue-50 rounded">
                          AI Scribe
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <Link to="/ai-tools" className="w-full block p-2 hover:bg-blue-50 rounded">
                          AI Tools
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <Link to="/appointments" className="w-full block p-2 hover:bg-blue-50 rounded">
                          Appointments
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <Link to="/integrations" className="w-full block p-2 hover:bg-blue-50 rounded">
                          Integrations
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <Link to="/about" className="w-full block p-2 hover:bg-blue-50 rounded">
                          About
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <Link to="/account" className="w-full block p-2 hover:bg-blue-50 rounded">
                          Account
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <Button 
                          onClick={handleLogout} 
                          variant="outline" 
                          className="w-full"
                        >
                          Logout
                        </Button>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button onClick={handleLogin} className="w-full">Login</Button>
                    <Button 
                      onClick={() => navigate("/signup")} 
                      variant="outline" 
                      className="w-full"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {isLoggedIn ? (
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-6">
                  <NavigationMenuItem>
                    <Link to="/ai-scribe" className="text-gray-700 hover:text-blue-600 transition-colors">
                      AI Scribe
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/ai-tools" className="text-gray-700 hover:text-blue-600 transition-colors">
                      AI Tools
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/appointments" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Appointments
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/integrations" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Integrations
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                      About
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/account" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Account
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button onClick={handleLogout} variant="outline">Logout</Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700">Login</Button>
                <Button 
                  onClick={() => navigate("/signup")}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
