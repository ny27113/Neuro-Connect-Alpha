import React from 'react';

const LearningNode = ({ title, category, progress, colorClass, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white border-2 border-slate-200 rounded-lg p-6 shadow-[0_4px_0_0_#cbd5e1] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#cbd5e1] transition-all cursor-pointer"
    >
      <div className={`h-2 w-12 rounded-full ${colorClass} mb-4`}></div>
      <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 mb-4">{category}</p>
      <div className="w-full bg-slate-100 h-3 rounded-full border border-slate-200 overflow-hidden">
        <div 
          className={`${colorClass} h-full transition-all duration-1000`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-right text-xs font-bold text-slate-400 mt-2">{progress}% Complete</p>
    </div>
  );
};

const HomeScreen = ({ onSelectNode }) => {
  const nodes = [
    { title: "Algebraic Structures", category: "Mathematics", progress: 65, colorClass: "bg-blue-500" },
    { title: "Commercial Math", category: "Mathematics", progress: 30, colorClass: "bg-emerald-500" },
    { title: "Spatial Reasoning", category: "Geometry", progress: 85, colorClass: "bg-amber-500" },
    { title: "Data Analysis", category: "Statistics", progress: 10, colorClass: "bg-rose-500" },
    { title: "Trigonometry", category: "Mathematics", progress: 0, colorClass: "bg-indigo-500" },
    { title: "Coordinate Geometry", category: "Geometry", progress: 45, colorClass: "bg-violet-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-6 md:p-12">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">NeuroConnect</h1>
          <p className="text-slate-500 font-medium">Adaptive Learning Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center font-bold text-blue-600">
            TX
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-12 bg-white border-2 border-slate-200 rounded-xl p-8 shadow-[0_4px_0_0_#cbd5e1]">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Alex! 👋</h2>
          <p className="text-slate-600 max-w-2xl">
            You're making great progress in <span className="font-bold text-blue-600">Algebraic Structures</span>. 
            Ready to tackle your next node? Click on <span className="font-bold text-emerald-600">Commercial Math</span> to try a live interactive problem!
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nodes.map((node, index) => (
            <LearningNode 
              key={index} 
              {...node} 
              onClick={() => node.title === "Commercial Math" && onSelectNode()}
            />
          ))}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t-2 border-slate-200 text-slate-400 text-sm font-medium flex justify-between">
        <p>© 2026 NeuroConnect Alpha 1.0</p>
        <div className="flex gap-6">
          <button className="hover:text-slate-600 transition-colors">Settings</button>
          <button className="hover:text-slate-600 transition-colors">Support</button>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;
