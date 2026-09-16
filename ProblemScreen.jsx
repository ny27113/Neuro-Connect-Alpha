import React, { useState } from 'react';

const ProblemScreen = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleValidate = () => {
    if (answer === '90000') {
      setIsCorrect(true);
      setStep(3);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-[0_8px_0_0_#cbd5e1]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-slate-100">
          <div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Commercial Math</span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">Node 2.1: Asset Depreciation</h2>
          </div>
          <button 
            onClick={onBack}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors"
          >
            ← Exit Node
          </button>
        </div>

        {/* Problem Statement with Digit Tinting */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 mb-8">
          <p className="text-lg leading-relaxed text-slate-700 font-medium">
            An aircraft currently valued at{' '}
            <span className="inline-block px-1.5 py-0.5 bg-emerald-100 border border-emerald-200 rounded text-emerald-800 font-bold">
              $100,000
            </span>{' '}
            depreciates in value by{' '}
            <span className="inline-block px-1.5 py-0.5 bg-rose-100 border border-rose-200 rounded text-rose-800 font-bold">
              10%
            </span>{' '}
            every year. What is the value of the aircraft after{' '}
            <span className="inline-block px-1.5 py-0.5 bg-amber-100 border border-amber-200 rounded text-amber-800 font-bold">
              1 Year
            </span>?
          </p>
        </div>

        {/* Step 1: Visual Scaffold (CRA - Representational) */}
        {step >= 1 && (
          <div className="mb-8 border-2 border-slate-100 rounded-xl p-6 bg-slate-50">
            <h3 className="font-bold text-slate-900 mb-4">Step 1: Visualize the Drop</h3>
            <div className="flex items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-lg">
              <div className="text-center flex-1">
                <p className="text-xs text-slate-400 font-bold">START VALUE</p>
                <p className="text-xl font-black text-slate-900">$100,000</p>
              </div>
              <div className="h-0.5 bg-slate-200 flex-1 relative flex justify-center">
                <span className="absolute -top-3 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">-10%</span>
              </div>
              <div className="text-center flex-1">
                <p className="text-xs text-slate-400 font-bold">YEAR 1 VALUE</p>
                <p className="text-xl font-black text-blue-600">?</p>
              </div>
            </div>
            {step === 1 && (
              <button 
                onClick={() => setStep(2)}
                className="mt-6 bg-slate-900 text-white font-bold py-2.5 px-6 rounded-lg border-b-2 border-slate-950 shadow hover:translate-y-[1px] hover:border-b transition-all"
              >
                I understand, show the math
              </button>
            )}
          </div>
        )}

        {/* Step 2: The Calculation (CRA - Abstract) */}
        {step >= 2 && (
          <div className="mb-8 border-2 border-slate-100 rounded-xl p-6 bg-slate-50">
            <h3 className="font-bold text-slate-900 mb-4">Step 2: Solve the Equation</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">
              Formula: <code className="bg-slate-200 px-2 py-1 rounded font-mono font-bold text-slate-800">New Value = Value × (1 - Rate)</code>
            </p>
            
            <div className="space-y-4 max-w-xs">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Your Answer</label>
                <div className="flex gap-3">
                  <input 
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={step === 3}
                    placeholder="Enter final amount"
                    className="flex-1 bg-white border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors font-bold"
                  />
                  {step < 3 && (
                    <button 
                      onClick={handleValidate}
                      className="bg-blue-600 text-white font-bold px-6 rounded-lg border-b-2 border-blue-800 hover:translate-y-[1px] hover:border-b transition-all"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>

              {isCorrect === false && (
                <p className="text-sm text-rose-600 font-bold bg-rose-50 border border-rose-100 p-3 rounded-lg">
                  ❌ Incorrect. Tip: calculate 10% of $100,000 ($10,000) and subtract it.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Success State */}
        {step === 3 && (
          <div className="border-2 border-emerald-200 rounded-xl p-6 bg-emerald-50 text-center">
            <h3 className="text-xl font-black text-emerald-800 mb-2">🎉 Spot On!</h3>
            <p className="text-emerald-600 font-medium mb-6">
              You correctly calculated the depreciation. $100,000 - 10% ($10,000) = $90,000.
            </p>
            <button 
              onClick={onBack}
              className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl border-b-4 border-emerald-800 hover:translate-y-[1px] hover:border-b transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProblemScreen;
