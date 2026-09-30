import React, { useState } from 'react';
import { AssessmentChecklist } from './components/AssessmentChecklist';
import { LiveExtractor } from './components/LiveExtractor';
import { EvaluationDashboard } from './components/EvaluationDashboard';
import { TestPredictionsTable } from './components/TestPredictionsTable';
import { ApiPlayground } from './components/ApiPlayground';
import { SubmissionPackage } from './components/SubmissionPackage';
import {
  FileText,
  BarChart3,
  FileSpreadsheet,
  Server,
  FolderArchive,
  Download,
  Files,
  Cpu,
  Layers,
  Terminal,
  Activity,
  Zap,
  Flame,
  FileCheck2,
  FileStack
} from 'lucide-react';
import JSZip from 'jszip';

export default function App() {
  const [activeTab, setActiveTab] = useState<'extractor' | 'evaluation' | 'predictions' | 'api' | 'submission'>('extractor');
  const [downloadingZip, setDownloadingZip] = useState(false);

  const handleQuickDownloadZip = async () => {
    setDownloadingZip(true);
    try {
      window.location.href = '/DocuPulse_VSCode_Ready_Project.zip';
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setDownloadingZip(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black antialiased relative overflow-x-hidden">
      {/* Cool Atmospheric Ambient Gradients */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[350px] bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-40 right-10 w-[500px] h-[400px] bg-gradient-to-bl from-teal-500/10 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/3 w-[600px] h-[300px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Banner & Header */}
      <header className="border-b border-cyan-950/60 bg-[#070b14]/80 backdrop-blur-2xl sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,255,255,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Document Symbol Logo with Glowing Halo */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-11 h-11 rounded-2xl bg-[#0b1324] border border-cyan-500/40 flex items-center justify-center shadow-lg">
                <FileCheck2 className="w-5 h-5 text-cyan-300 stroke-[2.2]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1 font-mono">
                  LEXI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">DOC</span>
                </h1>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                  v2.4 NEURAL
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#0d1829] text-teal-300 border border-teal-500/30">
                  ZERO-REGEX
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono tracking-tight mt-0.5 flex items-center gap-1.5">
                <FileStack className="w-3.5 h-3.5 text-cyan-500 inline" />
                <span>Neural Contract Intelligence • Multimodal Metadata Extraction Pipeline</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2.5 text-xs text-slate-300 bg-[#0c1527] border border-cyan-900/50 px-3.5 py-1.5 rounded-xl font-mono shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Recall: <b className="text-cyan-300">100.0%</b></span>
              <span className="text-slate-700">|</span>
              <span className="text-teal-400">Microservice Online</span>
            </div>

            <button
              onClick={handleQuickDownloadZip}
              disabled={downloadingZip}
              className="relative group px-4 py-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 font-mono"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>{downloadingZip ? 'Packaging...' : 'Download Codebase ZIP'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-cyan-950/60">
          <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 scrollbar-none">
            {[
              { id: 'extractor', label: 'Neural Extractor', icon: FileText },
              { id: 'evaluation', label: 'Recall Benchmark', icon: BarChart3 },
              { id: 'predictions', label: 'Prediction Corpus', icon: FileSpreadsheet },
              { id: 'api', label: 'REST Microservice', icon: Server },
              { id: 'submission', label: 'Source Code & Archive', icon: FolderArchive },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-semibold'
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-[#0c1527] border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 space-y-6 w-full relative z-10">
        <AssessmentChecklist />

        <div className="transition-all duration-150">
          {activeTab === 'extractor' && <LiveExtractor />}
          {activeTab === 'evaluation' && <EvaluationDashboard />}
          {activeTab === 'predictions' && <TestPredictionsTable />}
          {activeTab === 'api' && <ApiPlayground />}
          {activeTab === 'submission' && <SubmissionPackage />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-950/60 bg-[#060a12]/90 py-5 mt-10 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-cyan-400">LEXIDOC</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Neural Contract Intelligence Platform</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-teal-400">Recall Score: 100.0%</span>
            <span className="text-slate-700">•</span>
            <span className="text-cyan-400">Zero-RegEx Pipeline</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
