
import { Appointment } from "@/types/Appointment";

export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await fetch('https://dentalai-production.up.railway.app/data', {
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
