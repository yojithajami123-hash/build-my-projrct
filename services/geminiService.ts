import { GoogleGenAI, Type } from "@google/genai";
import { ProjectIdea, ProjectGuide, UserPreferences } from "../types";

/**
 * Utility to get a fresh AI instance safely.
 */
const getAI = () => {
  // Vite replaces process.env.API_KEY at build time via the 'define' config.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    console.error("CRITICAL: API_KEY is missing. The application requires a valid Google Gemini API key to function. Please set it in your environment variables.");
    // Return a dummy instance so the app doesn't immediately white-screen on load, 
    // but actual API calls will fail with a clear error.
    return new GoogleGenAI({ apiKey: 'MISSING_API_KEY' });
  }
  
  return new GoogleGenAI({ apiKey });
};

export const generateProjectIdeas = async (prefs: UserPreferences): Promise<ProjectIdea[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on the following student profile, suggest 6 unique and practical project ideas.
    Courses: ${prefs.courses}
    Interests: ${prefs.interests}
    Skill Level: ${prefs.skillLevel}
    
    Ensure ideas range across the student's courses and are highly relevant.
    Include a specific "imagePrompt" for each project that describes a clean, modern digital illustration or a 3D isometric icon representing the project's core concept.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            techStack: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            duration: { type: Type.STRING },
            imagePrompt: { type: Type.STRING, description: "A detailed prompt for generating a representative image." }
          },
          required: ["id", "title", "description", "difficulty", "techStack", "duration", "imagePrompt"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse project ideas", e);
    return [];
  }
};

export const generateProjectImage = async (prompt: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a professional, high-quality, 3D isometric illustration for a software project with the following theme: ${prompt}. The style should be clean, modern, and tech-oriented, using a soft indigo and slate color palette. No text in the image.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    if (!response.candidates?.[0]?.content?.parts) return null;

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error("Failed to generate project image", e);
    return null;
  }
};

export const generateProjectGuide = async (project: ProjectIdea): Promise<ProjectGuide | null> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Create a detailed step-by-step implementation guide for the project: "${project.title}".
    Description: ${project.description}
    Difficulty: ${project.difficulty}
    Target Tech Stack: ${project.techStack.join(", ")}
    
    Include a clear objective, detailed tech stack, and 5-7 comprehensive implementation steps with actionable tips for each.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          objective: { type: Type.STRING },
          techStackDetailed: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stepNumber: { type: Type.NUMBER },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                tips: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                }
              },
              required: ["stepNumber", "title", "description", "tips"]
            }
          }
        },
        required: ["title", "objective", "techStackDetailed", "steps"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "null");
  } catch (e) {
    console.error("Failed to parse project guide", e);
    return null;
  }
};