import React from 'react';

const WelcomeScreen = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl">
        <div className="mb-8 inline-block p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-[0_4px_0_0_#cbd5e1]">
          <h1 className="text-5xl font-black tracking-tight text-slate-900">NeuroConnect</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-700 mb-6">
          The AI-powered adaptive learning platform designed for <span className="text-blue-600 underline decoration-4 underline-offset-4">you</span>.
        </h2>
        
        <p className="text-lg text-slate-500 mb-12 leading-relaxed">
          No distractions. No sensory overload. Just clear, tactile learning pathways 
          that adapt to your unique cognitive profile.
        </p>

        <button 
          onClick={onNext}
          className="bg-blue-600 text-white text-xl font-bold py-4 px-12 rounded-xl border-b-4 border-blue-800 shadow-lg hover:translate-y-[2px] hover:border-b-2 transition-all active:translate-y-[4px] active:border-b-0"
        >
          Get Started
        </button>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white border-2 border-slate-200 rounded-lg shadow-[0_2px_0_0_#cbd5e1]">
            <p className="font-bold text-slate-900">ADHD Friendly</p>
            <p className="text-sm text-slate-500">Chunked tasks & focus modes.</p>
          </div>
          <div className="p-4 bg-white border-2 border-slate-200 rounded-lg shadow-[0_2px_0_0_#cbd5e1]">
            <p className="font-bold text-slate-900">Dyscalculia Support</p>
            <p className="text-sm text-slate-500">Visual proofs & digit tinting.</p>
          </div>
          <div className="p-4 bg-white border-2 border-slate-200 rounded-lg shadow-[0_2px_0_0_#cbd5e1]">
            <p className="font-bold text-slate-900">Sensory Safe</p>
            <p className="text-sm text-slate-500">Zero gradients or glows.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
