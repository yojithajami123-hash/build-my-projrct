
export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  duration: string;
  imagePrompt: string;
  imageUrl?: string;
}

export interface ImplementationStep {
  stepNumber: number;
  title: string;
  description: string;
  tips: string[];
}

export interface ProjectGuide {
  title: string;
  objective: string;
  techStackDetailed: string[];
  steps: ImplementationStep[];
}

export interface UserPreferences {
  courses: string;
  interests: string;
  skillLevel: string;
}
