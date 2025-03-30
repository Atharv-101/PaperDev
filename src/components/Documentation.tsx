import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Brain, FileDown, PlusCircle, Trash2 } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black mb-8">PaperDev Documentation</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            PaperDev is an AI-powered question paper generator that helps educators create multiple variations
            of questions with different difficulty levels. The application uses advanced AI models to generate
            meaningful variations while maintaining the original intent of the questions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Frontend</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>React 18 with TypeScript</li>
                <li>Vite for build tooling</li>
                <li>Tailwind CSS for styling</li>
                <li>React Router for navigation</li>
                <li>Lucide React for icons</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Libraries</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>jsPDF for PDF generation</li>
                <li>React Syntax Highlighter</li>
                <li>TypeScript for type safety</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">Application Flow</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li>User inputs one or multiple questions</li>
              <li>Selects difficulty level (Easy, Medium, Hard)</li>
              <li>AI generates variations based on:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>Question complexity</li>
                  <li>Contextual understanding</li>
                  <li>Difficulty parameters</li>
                </ul>
              </li>
              <li>User can select desired variations</li>
              <li>Generate PDF with college header and footer</li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">AI Model Integration</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              The application uses a sophisticated AI model to generate question variations. The model:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Maintains semantic meaning while varying complexity</li>
              <li>Adapts language based on difficulty level</li>
              <li>Ensures pedagogical relevance</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <PlusCircle className="w-5 h-5 mr-2" />
                <h3 className="text-xl font-semibold">Multiple Questions</h3>
              </div>
              <p className="text-gray-700">
                Input multiple questions simultaneously for batch processing
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 mr-2" />
                <h3 className="text-xl font-semibold">AI Variations</h3>
              </div>
              <p className="text-gray-700">
                Generate intelligent variations based on difficulty levels
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <FileDown className="w-5 h-5 mr-2" />
                <h3 className="text-xl font-semibold">PDF Export</h3>
              </div>
              <p className="text-gray-700">
                Export selected questions with institutional branding
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Trash2 className="w-5 h-5 mr-2" />
                <h3 className="text-xl font-semibold">Question Management</h3>
              </div>
              <p className="text-gray-700">
                Easy deletion and management of generated questions
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">Usage Example</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <SyntaxHighlighter language="typescript" style={tomorrow}>
{`// Example of generating question variations
const variations = await generateVariations(
  "What is Newton's second law of motion?",
  "medium"
);

// Example output:
[
  "Explain the principles behind Newton's second law of motion.",
  "How would you apply Newton's second law in a real situation?",
  "What are the key components of Newton's second law of motion?"
]`}
            </SyntaxHighlighter>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;