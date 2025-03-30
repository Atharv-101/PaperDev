import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { QuestionInput } from './components/QuestionInput';
import { QuestionList } from './components/QuestionList';
import { generateVariations } from './utils/mockAI';
import { Question, GeneratorState, Difficulty } from './types';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Documentation from './components/Documentation';

function Generator() {
  const [state, setState] = useState<GeneratorState>({
    questions: [],
    loading: false,
    error: null,
  });

  const handleSubmit = async (questions: string[], difficulty: Difficulty) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const newQuestions = await Promise.all(
        questions.map(async (question) => {
          const variations = await generateVariations(question, difficulty);
          return {
            id: Date.now().toString() + Math.random(),
            original: question,
            variations,
            difficulty,
            selectedVariations: [],
          };
        })
      );
      
      setState(prev => ({
        ...prev,
        loading: false,
        questions: [...newQuestions, ...prev.questions],
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to generate variations. Please try again.',
      }));
    }
  };

  const handleDelete = (id: string) => {
    setState(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id),
    }));
  };

  const handleVariationSelect = (questionId: string, variationIndex: number) => {
    setState(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id !== questionId) return q;
        
        const selectedVariations = q.selectedVariations.includes(variationIndex)
          ? q.selectedVariations.filter(i => i !== variationIndex)
          : [...q.selectedVariations, variationIndex].sort();
        
        return { ...q, selectedVariations };
      }),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-black">
            AI Question Paper Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Generate variations of multiple questions based on difficulty levels
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <QuestionInput onSubmit={handleSubmit} loading={state.loading} />
          {state.error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {state.error}
            </div>
          )}
        </div>

        <QuestionList
          questions={state.questions}
          onDelete={handleDelete}
          onVariationSelect={handleVariationSelect}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="bg-black text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <Brain className="w-6 h-6 mr-2" />
            PaperDev
          </Link>
          <Link to="/docs" className="hover:text-gray-300 transition-colors">
            Documentation
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Generator />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </Router>
  );
}

export default App;