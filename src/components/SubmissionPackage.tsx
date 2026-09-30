import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  PYTHON_SOLUTION_SCRIPT,
  PYTHON_REST_API,
  JUPYTER_NOTEBOOK_JSON,
  SUBMISSION_README_MARKDOWN,
  REQUIREMENTS_TXT,
  TRAIN_CSV_CONTENT,
  TEST_CSV_CONTENT,
  PREDICTIONS_CSV_CONTENT
} from '../data/exportCode';
import { Download, FileCode, Copy, Check, FolderArchive, FileText, CheckCircle2, GitBranch, Terminal } from 'lucide-react';

export const SubmissionPackage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'readme' | 'solution' | 'notebook' | 'api' | 'requirements' | 'predictions'>('readme');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const files = {
    readme: { name: 'README.md', content: SUBMISSION_README_MARKDOWN, language: 'markdown' },
    solution: { name: 'solution.py', content: PYTHON_SOLUTION_SCRIPT, language: 'python' },
    notebook: { name: 'metadata_extractor.ipynb', content: JUPYTER_NOTEBOOK_JSON, language: 'json' },
    api: { name: 'app_api.py', content: PYTHON_REST_API, language: 'python' },
    requirements: { name: 'requirements.txt', content: REQUIREMENTS_TXT, language: 'text' },
    predictions: { name: 'predictions.csv', content: PREDICTIONS_CSV_CONTENT, language: 'csv' },
  };

  const currentFile = files[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    setIsZipping(true);
    window.location.href = '/DocuPulse_VSCode_Ready_Project.zip';
    setTimeout(() => setIsZipping(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Download Action Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-[#0a1120] border border-cyan-800/40 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
                Project Codebase & Replication Artifacts
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed font-mono">
                Standalone Python pipelines, interactive Jupyter Notebook, FastAPI REST endpoints, and official data directory.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 shrink-0 font-mono"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>{isZipping ? 'Downloading...' : 'Download Codebase ZIP'}</span>
          </button>
          <a
            href="/DocuPulse_VSCode_Ready_Project.zip"
            download="DocuPulse_VSCode_Ready_Project.zip"
            className="px-4 py-3 bg-[#060c18] hover:bg-[#0c162a] text-cyan-300 border border-cyan-800/60 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all font-mono"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Direct ZIP Link</span>
          </a>
        </div>
      </div>

      {/* Code Browser & Viewer */}
      <div className="bg-[#0a1120]/90 border border-cyan-900/40 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-cyan-950">
          {/* File tabs */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(files) as Array<keyof typeof files>).map((key) => {
              const f = files[key];
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    setCopied(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                    activeTab === key
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 font-semibold shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'bg-[#060c18] border-cyan-950 text-slate-400 hover:text-cyan-300 hover:border-cyan-800'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 bg-[#060c18] hover:bg-[#0c162a] text-cyan-300 border border-cyan-900/80 rounded-xl text-xs font-mono flex items-center gap-2 transition-colors active:scale-95 shadow-[0_0_8px_rgba(6,182,212,0.1)]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied!' : `Copy ${currentFile.name}`}</span>
            </button>
          </div>
        </div>

        {/* Code Content Container */}
        <div className="relative">
          <div className="absolute right-4 top-4 z-10 text-[9px] uppercase font-mono px-2.5 py-1 rounded-md bg-[#050912] text-cyan-400 border border-cyan-900 shadow-md">
            {currentFile.language}
          </div>
          <pre className="p-4 bg-[#050912] rounded-xl text-xs font-mono text-cyan-100 overflow-x-auto max-h-[550px] overflow-y-auto border border-cyan-950 leading-relaxed whitespace-pre-wrap selection:bg-cyan-500 selection:text-black">
            {currentFile.content}
          </pre>
        </div>
      </div>
    </div>
  );
};
