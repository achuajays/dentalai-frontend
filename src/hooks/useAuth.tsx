
import { useState, useCallback, useEffect } from 'react';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check login status on initial load
    const loggedIn = authService.isLoggedIn();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setUserId(authService.getUserId());
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      setIsLoggedIn(true);
      setUserId(response.id.toString());
      toast({
        title: "Login successful",
        description: "Welcome back to DentalCare+",
      });
      return response;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const signup = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.signup({ email, password });
      setIsLoggedIn(true);
      setUserId(response.id.toString());
      toast({
        title: "Registration successful",
        description: "Welcome to DentalCare+",
      });
      return response;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try a different email",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const logout = useCallback(() => {
    authService.logout();
    setIsLoggedIn(false);
    setUserId(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  }, [toast]);

  return {
    isLoggedIn,
    isLoading,
    login,
    signup,
    logout,
    userId
  };
};
