
export interface TranscriptLine {
  text: string;
  type: "local" | "remote";
  timestamp: string;
}

export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  summary: string;
}
