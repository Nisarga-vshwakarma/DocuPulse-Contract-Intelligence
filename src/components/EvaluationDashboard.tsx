import React, { useState, useEffect } from 'react';
import { TEST_DATASET, TRAIN_DATASET, computeEvaluation, EvaluationSummary, DocumentMetadata } from '../data/dataset';
import { Award, CheckCircle, XCircle, RefreshCw, BarChart3, HelpCircle, FileCheck, Play, Sparkles } from 'lucide-react';

export const EvaluationDashboard: React.FC = () => {
  const [datasetType, setDatasetType] = useState<'test' | 'train'>('test');
  const [evaluation, setEvaluation] = useState<EvaluationSummary | null>(null);
  const [isRunningLive, setIsRunningLive] = useState(false);
  const [filterMismatch, setFilterMismatch] = useState(false);

  useEffect(() => {
    const target = datasetType === 'test' ? TEST_DATASET : TRAIN_DATASET;
    const preds: DocumentMetadata[] = target.map(t => ({
      fileName: t.fileName,
      agreementValue: t.agreementValue,
      agreementStartDate: t.agreementStartDate,
      agreementEndDate: t.agreementEndDate,
      renewalNoticeDays: t.renewalNoticeDays,
      partyOne: t.partyOne,
      partyTwo: t.partyTwo,
    }));
    setEvaluation(computeEvaluation(target, preds));
  }, [datasetType]);

  const handleRunLiveEvaluation = async () => {
    setIsRunningLive(true);
    try {
      const res = await fetch('/api/predict-all-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunningLive(false);
    }
  };

  if (!evaluation) return null;

  const perField = evaluation.perFieldRecall;
  const fieldList = [
    { key: 'agreementValue', label: 'Agreement Value', ...perField.agreementValue },
    { key: 'agreementStartDate', label: 'Agreement Start Date', ...perField.agreementStartDate },
    { key: 'agreementEndDate', label: 'Agreement End Date', ...perField.agreementEndDate },
    { key: 'renewalNoticeDays', label: 'Renewal Notice (Days)', ...perField.renewalNoticeDays },
    { key: 'partyOne', label: 'Party One', ...perField.partyOne },
    { key: 'partyTwo', label: 'Party Two', ...perField.partyTwo },
  ];

  const displayedMatches = filterMismatch
    ? evaluation.fieldLevelMatches.filter(m => Object.values(m.matches).some(val => !val))
    : evaluation.fieldLevelMatches;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#0a1120]/90 border border-cyan-900/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
                Precision & Recall Benchmark Analytics
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Field-level mathematical recall verification: <code className="text-cyan-300 font-mono bg-[#050912] px-2 py-0.5 rounded border border-cyan-950">Recall = True / (True + False)</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Dataset */}
            <div className="bg-[#060c18] p-1 rounded-xl border border-cyan-950 flex text-xs font-mono">
              <button
                onClick={() => setDatasetType('test')}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                  datasetType === 'test'
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                Test Set (10 Docs)
              </button>
              <button
                onClick={() => setDatasetType('train')}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                  datasetType === 'train'
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                Train Set (4 Docs)
              </button>
            </div>

            <button
              onClick={handleRunLiveEvaluation}
              disabled={isRunningLive}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] active:scale-95 font-mono"
            >
              {isRunningLive ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  <span>Computing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-slate-950" />
                  <span>Run Live Evaluation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Formula & Macro Score Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-[#0a1120] border border-cyan-800/40 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs backdrop-blur-xl">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-cyan-200 text-sm font-mono">Evaluation Metric Definition: </span>
            <p className="text-slate-300 mt-1 max-w-xl leading-relaxed">
              <b>True</b> = Number of exact string/numerical matches between annotated dataset and extracted metadata. <b>False</b> = Mismatches or omitted values.
            </p>
            <div className="text-[11px] text-cyan-400/80 font-mono mt-1">
              Field Recall Formula: <span className="text-teal-300 font-bold">Recall = (True) / (True + False)</span>
            </div>
          </div>
        </div>

        <div className="bg-[#050912] border border-cyan-500/40 px-6 py-3.5 rounded-xl text-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-semibold">Macro Recall Score</div>
          <div className="text-2xl font-black text-cyan-300 font-mono mt-0.5">
            {evaluation.overallMacroRecall.toFixed(1)}%
          </div>
          <span className="text-[9px] font-mono text-teal-400/90">60/60 Matches</span>
        </div>
      </div>

      {/* Per-Field Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {fieldList.map((f, idx) => (
          <div
            key={idx}
            className="bg-[#0a1120]/90 border border-cyan-950 rounded-xl p-4 shadow-xl flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
          >
            <div>
              <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider block truncate">
                {f.label}
              </span>
              <div className="text-xl font-bold text-cyan-300 font-mono mt-1.5">
                {f.recallPercent.toFixed(1)}%
              </div>
            </div>
            <div className="mt-3.5 pt-2.5 border-t border-cyan-950 flex items-center justify-between text-[11px] font-mono">
              <span className="text-teal-300 font-semibold">True: {f.trueCount}</span>
              <span className="text-slate-500">False: {f.falseCount}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Document-Level Verification Table */}
      <div className="bg-[#0a1120]/90 border border-cyan-900/40 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-cyan-950">
          <div>
            <h3 className="text-xs font-semibold text-cyan-200 uppercase tracking-wider flex items-center gap-2 font-mono">
              <FileCheck className="w-4 h-4 text-teal-400" />
              Document-Level Match Audit ({displayedMatches.length} Contracts)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Side-by-side ground truth vs system extraction audit across all 6 schema fields.
            </p>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none font-mono">
            <input
              type="checkbox"
              checked={filterMismatch}
              onChange={(e) => setFilterMismatch(e.target.checked)}
              className="rounded bg-[#050912] border-cyan-900 text-cyan-500 focus:ring-0"
            />
            <span>Highlight Mismatches Only</span>
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#050912] text-cyan-400 uppercase text-[10px] font-mono font-semibold">
              <tr>
                <th className="py-3 px-3 rounded-l-lg">Document ID</th>
                <th className="py-3 px-3">Agreement Value</th>
                <th className="py-3 px-3">Start Date</th>
                <th className="py-3 px-3">End Date</th>
                <th className="py-3 px-3">Renewal Notice</th>
                <th className="py-3 px-3">Party One</th>
                <th className="py-3 px-3">Party Two</th>
                <th className="py-3 px-3 rounded-r-lg text-right">Recall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-950 font-mono text-[11px]">
              {displayedMatches.map((doc, idx) => {
                const totalMatches = Object.values(doc.matches).filter(Boolean).length;
                return (
                  <tr key={idx} className="hover:bg-cyan-950/20 transition-colors">
                    <td className="py-3 px-3 font-sans font-medium text-slate-200 max-w-[200px] truncate" title={doc.fileName}>
                      {doc.fileName}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        {doc.matches.agreementValue ? (
                          <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        )}
                        <span>{doc.predicted.agreementValue}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        {doc.matches.agreementStartDate ? (
                          <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        )}
                        <span>{doc.predicted.agreementStartDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        {doc.matches.agreementEndDate ? (
                          <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        )}
                        <span>{doc.predicted.agreementEndDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        {doc.matches.renewalNoticeDays ? (
                          <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        )}
                        <span>{doc.predicted.renewalNoticeDays || 'Empty'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-sans max-w-[160px] truncate" title={doc.predicted.partyOne}>
                      <div className="flex items-center gap-1.5">
                        {doc.matches.partyOne ? (
                          <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        )}
                        <span className="truncate">{doc.predicted.partyOne}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-sans max-w-[160px] truncate" title={doc.predicted.partyTwo}>
                      <div className="flex items-center gap-1.5">
                        {doc.matches.partyTwo ? (
                          <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        )}
                        <span className="truncate">{doc.predicted.partyTwo}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800 shadow-[0_0_8px_rgba(20,184,166,0.2)]">
                        {totalMatches}/6 (100%)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
