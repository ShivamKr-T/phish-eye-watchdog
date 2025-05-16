
export interface EmailFormData {
  sender: string;
  subject: string;
  body: string;
  urls?: string;
}

export interface PredictionResponse {
  result: string;
  confidence: number;
  risk_level: 'high' | 'medium' | 'low' | 'safe';
}

export interface PResponse {
  phishing:boolean
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  description?: string;
  icon?: React.ElementType;
}
