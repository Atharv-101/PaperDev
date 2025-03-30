import React from 'react';
import { Question } from '../types';
import { Trash2, FileDown } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface QuestionListProps {
  questions: Question[];
  onDelete: (id: string) => void;
  onVariationSelect: (questionId: string, variationIndex: number) => void;
}

export function QuestionList({ questions, onDelete, onVariationSelect }: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No questions generated yet. Add questions above to get started.
      </div>
    );
  }

  const handleDownloadPDF = () => {
    const questionsWithSelections = questions.filter(q => q.selectedVariations.length > 0);
    if (questionsWithSelections.length === 0) {
      alert('Please select at least one variation before downloading the PDF.');
      return;
    }
    generatePDF(questionsWithSelections);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Generated Questions</h2>
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center px-4 py-2 border border-transparent
                   text-sm font-medium rounded-md shadow-sm text-white bg-green-600 
                   hover:bg-green-700 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-green-500"
        >
          <FileDown className="w-5 h-5 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="space-y-6">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-white rounded-lg shadow-md p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Original Question:</h3>
                <p className="mt-1 text-gray-600">{question.original}</p>
              </div>
              <button
                onClick={() => onDelete(question.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex items-center">
                <h4 className="text-md font-medium text-gray-900">Variations</h4>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full
                             bg-blue-100 text-blue-800 capitalize">
                  {question.difficulty}
                </span>
              </div>
              <ul className="mt-2 space-y-2">
                {question.variations.map((variation, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3"
                  >
                    <input
                      type="checkbox"
                      id={`variation-${question.id}-${index}`}
                      checked={question.selectedVariations.includes(index)}
                      onChange={() => onVariationSelect(question.id, index)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                               border-gray-300 rounded cursor-pointer"
                    />
                    <label
                      htmlFor={`variation-${question.id}-${index}`}
                      className="text-gray-600 pl-4 border-l-2 border-gray-200 flex-grow cursor-pointer"
                    >
                      {variation}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}