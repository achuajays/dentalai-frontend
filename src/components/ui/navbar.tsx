
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

  const navigateTo = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full bg-white py-4 px-6 md:px-10 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/16b9a255-300e-49c6-bc9e-6ea0ea6d50f9.png" 
            alt="DentalCare+ Logo" 
            className="h-10 md:h-12"
          />
          <span className="text-2xl font-bold text-blue-600 hidden md:inline-block">DentalCare+</span>
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
                        <div onClick={() => navigateTo("/ai-scribe")} className="w-full block p-2 hover:bg-blue-50 rounded cursor-pointer">
                          AI Scribe
                        </div>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <div onClick={() => navigateTo("/ai-tools")} className="w-full block p-2 hover:bg-blue-50 rounded cursor-pointer">
                          AI Tools
                        </div>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <div onClick={() => navigateTo("/appointments")} className="w-full block p-2 hover:bg-blue-50 rounded cursor-pointer">
                          Appointments
                        </div>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <div onClick={() => navigateTo("/integrations")} className="w-full block p-2 hover:bg-blue-50 rounded cursor-pointer">
                          Integrations
                        </div>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <div onClick={() => navigateTo("/about")} className="w-full block p-2 hover:bg-blue-50 rounded cursor-pointer">
                          About
                        </div>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <div onClick={() => navigateTo("/account")} className="w-full block p-2 hover:bg-blue-50 rounded cursor-pointer">
                          Account
                        </div>
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
                    <div onClick={() => navigateTo("/ai-scribe")} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                      AI Scribe
                    </div>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <div onClick={() => navigateTo("/ai-tools")} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                      AI Tools
                    </div>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <div onClick={() => navigateTo("/appointments")} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                      Appointments
                    </div>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <div onClick={() => navigateTo("/integrations")} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                      Integrations
                    </div>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <div onClick={() => navigateTo("/about")} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                      About
                    </div>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <div onClick={() => navigateTo("/account")} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                      Account
                    </div>
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
