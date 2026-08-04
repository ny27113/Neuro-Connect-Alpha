import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [theme, setTheme] = useState('PASTEL');

  const themes = [
    { id: 'PASTEL', label: 'Soft Pastel', color: 'bg-blue-100' },
    { id: 'DARK', label: 'High Contrast', color: 'bg-slate-800' },
    { id: 'CREAM', label: 'Warm Cream', color: 'bg-orange-50' },
    { id: 'HIGH_VISUAL', label: 'High Visual', color: 'bg-emerald-100' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-[0_8px_0_0_#cbd5e1]">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500 mb-8 font-medium">Log in to your learning journey</p>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Username or Email</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4">
            <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Choose your sensory theme</p>
            <div className="flex gap-3 mb-8">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${t.color} ${theme === t.id ? 'border-blue-500 scale-110' : 'border-slate-200'}`}
                  title={t.label}
                />
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl border-b-4 border-blue-800 shadow-md hover:translate-y-[1px] hover:border-b-2 transition-all active:translate-y-[3px] active:border-b-0"
          >
            Log In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400 font-medium">
          New to NeuroConnect? <button className="text-blue-600 font-bold hover:underline">Create an account</button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
