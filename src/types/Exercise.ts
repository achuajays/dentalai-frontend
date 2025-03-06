
export interface Exercise {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export interface ExerciseResponse {
  message: string;
  bodypart: string;
  limit: number;
  offset: number;
  data: Exercise[];
}
