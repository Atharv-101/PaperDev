import React, { useState } from 'react';
import { PlusCircle, Plus, Trash2 } from 'lucide-react';
import { Difficulty, QuestionInput as QuestionInputType } from '../types';

interface QuestionInputProps {
  onSubmit: (questions: string[], difficulty: Difficulty) => void;
  loading: boolean;
}

export function QuestionInput({ onSubmit, loading }: QuestionInputProps) {
  const [questions, setQuestions] = useState<QuestionInputType[]>([
    { id: '1', text: '' }
  ]);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validQuestions = questions
      .map(q => q.text.trim())
      .filter(q => q.length > 0);
    
    if (validQuestions.length > 0) {
      onSubmit(validQuestions, difficulty);
      setQuestions([{ id: '1', text: '' }]);
    }
  };

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { id: Date.now().toString(), text: '' }
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, text: string) => {
    setQuestions(prev =>
      prev.map(q => q.id === id ? { ...q, text } : q)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        {questions.map((question, index) => (
          <div key={question.id} className="flex gap-2">
            <div className="flex-grow">
              <label
                htmlFor={`question-${question.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Question {index + 1}
              </label>
              <textarea
                id={`question-${question.id}`}
                value={question.text}
                onChange={(e) => updateQuestion(question.id, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                         focus:border-blue-500 focus:ring-blue-500
                         bg-white p-3 text-gray-900"
                placeholder="What is Newton's second law of motion?"
                rows={2}
              />
            </div>
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(question.id)}
                className="mt-8 p-2 text-gray-400 hover:text-red-500 
                         transition-colors"
                title="Remove question"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addQuestion}
        className="inline-flex items-center px-3 py-2 border border-gray-300
                 rounded-md text-sm font-medium text-gray-700 bg-white
                 hover:bg-gray-50 focus:outline-none focus:ring-2
                 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Question
      </button>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                     focus:border-blue-500 focus:ring-blue-500 bg-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={loading || !questions.some(q => q.text.trim())}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent
                   text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                   focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Generate Variations
        </button>
      </div>
    </form>
  );
}