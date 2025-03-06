
export interface AppointmentRequest {
  extracted_data: {
    date: string;
    reason: string;
    patient_id: number;
  }
}
