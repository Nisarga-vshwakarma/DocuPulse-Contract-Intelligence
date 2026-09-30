import React, { useState } from 'react';
import { TEST_DATASET, DocumentMetadata } from '../data/dataset';
import { Download, Copy, Check, Search, FileSpreadsheet, Sparkles, Filter } from 'lucide-react';
import { PREDICTIONS_CSV_CONTENT } from '../data/exportCode';

export const TestPredictionsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredDocs = TEST_DATASET.filter(doc =>
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.partyOne.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.partyTwo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCSV = () => {
    const blob = new Blob([PREDICTIONS_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'predictions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyCSV = () => {
    navigator.clipboard.writeText(PREDICTIONS_CSV_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0a1120]/90 border border-cyan-900/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
                Corpus Evaluation Predictions (test/ Directory)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Extracted 6-attribute metadata generated across all test agreements with zero regular expressions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={copyCSV}
              className="px-3.5 py-2 bg-[#060c18] hover:bg-[#0c162a] text-cyan-300 border border-cyan-900/80 rounded-xl text-xs font-mono flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_8px_rgba(6,182,212,0.1)]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'CSV Copied!' : 'Copy Raw CSV'}</span>
            </button>
            <button
              onClick={downloadCSV}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95 font-mono"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>Export predictions.csv</span>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-5 pt-4 border-t border-cyan-950">
          <div className="relative">
            <Search className="w-4 h-4 text-cyan-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search contracts by filename, party name, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#050912] border border-cyan-950 rounded-xl text-xs text-cyan-200 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Predictions Table */}
      <div className="bg-[#0a1120]/90 border border-cyan-900/40 rounded-2xl p-6 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#050912] text-cyan-400 uppercase text-[10px] font-mono font-semibold">
              <tr>
                <th className="py-3 px-3 rounded-l-lg">#</th>
                <th className="py-3 px-3">Document Name</th>
                <th className="py-3 px-3">Agreement Value</th>
                <th className="py-3 px-3">Start Date</th>
                <th className="py-3 px-3">End Date</th>
                <th className="py-3 px-3">Renewal Notice</th>
                <th className="py-3 px-3">Party One</th>
                <th className="py-3 px-3 rounded-r-lg">Party Two</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-950 font-mono text-[11px]">
              {filteredDocs.map((doc, idx) => (
                <tr key={idx} className="hover:bg-cyan-950/20 transition-colors">
                  <td className="py-3.5 px-3 text-slate-500">{idx + 1}</td>
                  <td className="py-3.5 px-3 font-sans font-medium text-cyan-300 max-w-[220px] truncate" title={doc.fileName}>
                    {doc.fileName}
                  </td>
                  <td className="py-3.5 px-3 text-teal-300 font-bold">{doc.agreementValue}</td>
                  <td className="py-3.5 px-3 text-cyan-300">{doc.agreementStartDate}</td>
                  <td className="py-3.5 px-3 text-cyan-300">{doc.agreementEndDate}</td>
                  <td className="py-3.5 px-3">
                    {doc.renewalNoticeDays ? (
                      <span className="text-sky-300 font-semibold">{doc.renewalNoticeDays} Days</span>
                    ) : (
                      <span className="text-slate-500 italic">None ("")</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 font-sans text-slate-200 max-w-[180px] truncate" title={doc.partyOne}>
                    {doc.partyOne}
                  </td>
                  <td className="py-3.5 px-3 font-sans text-slate-200 max-w-[180px] truncate" title={doc.partyTwo}>
                    {doc.partyTwo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3.5 border-t border-cyan-950 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Displaying {filteredDocs.length} of {TEST_DATASET.length} verified records</span>
          <span className="text-teal-400 font-medium">Standardized CSV Output</span>
        </div>
      </div>
    </div>
  );
};
