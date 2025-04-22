
import { Appointment } from "@/types/Appointment";
import { API_BASE_URL } from "@/config/constants";

export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/data`, {
      headers: {
        'accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching appointments: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    throw error;
  }
};
