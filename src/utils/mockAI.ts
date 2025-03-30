import { Difficulty } from '../types';

// Mock AI response generator
export async function generateVariations(
  question: string,
  difficulty: Difficulty
): Promise<string[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const variations: Record<Difficulty, string[]> = {
    easy: [
      `Can you explain ${question.toLowerCase()}?`,
      `What is the basic concept of ${question.toLowerCase()}?`,
      `In simple terms, describe ${question.toLowerCase()}.`
    ],
    medium: [
      `Explain the principles behind ${question.toLowerCase()}.`,
      `How would you apply ${question.toLowerCase()} in a real situation?`,
      `What are the key components of ${question.toLowerCase()}?`
    ],
    hard: [
      `Analyze and evaluate ${question.toLowerCase()} in detail.`,
      `Compare and contrast different aspects of ${question.toLowerCase()}.`,
      `What are the advanced applications of ${question.toLowerCase()}?`
    ]
  };

  return variations[difficulty];
}