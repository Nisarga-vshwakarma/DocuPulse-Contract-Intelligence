import React, { useState } from 'react';
import { Server, Send, Copy, Check, Terminal, Play, CheckCircle2, Globe, Cpu } from 'lucide-react';

export const ApiPlayground: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('extract');
  const [requestBody, setRequestBody] = useState<string>(JSON.stringify({
    fileName: "24158401-Rental-Agreement",
    text: "RENTAL AGREEMENT\nThis agreement entered into on this 1st day of April 2008 between Hanumaiah (Party One) and Vishal Bhardwaj (Party Two). Monthly rent: Rs. 12000. Term: 01.04.2008 to 31.03.2009. Renewal notice: 60 days."
  }, null, 2));

  const [responseOutput, setResponseOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const endpoints = [
    {
      id: 'extract',
      name: 'POST /api/extract',
      method: 'POST',
      url: '/api/extract',
      desc: 'Cognitive inference extracting the 6 metadata attributes from text or base64 image without regex.',
      sampleBody: JSON.stringify({
        fileName: "24158401-Rental-Agreement",
        text: "RENTAL AGREEMENT\nThis agreement entered into on this 1st day of April 2008 between Hanumaiah (Party One) and Vishal Bhardwaj (Party Two). Monthly rent: Rs. 12000. Term: 01.04.2008 to 31.03.2009. Renewal notice: 60 days."
      }, null, 2),
      curl: `curl -X POST "http://localhost:3000/api/extract" \\
  -H "Content-Type: application/json" \\
  -d '{"fileName": "24158401-Rental-Agreement", "text": "Between Hanumaiah and Vishal Bhardwaj for rent 12000 from 01.04.2008 to 31.03.2009 with 60 days notice."}'`
    },
    {
      id: 'evaluate',
      name: 'POST /api/evaluate',
      method: 'POST',
      url: '/api/evaluate',
      desc: 'Executes mathematical recall evaluation across dataset annotations using True / (True + False).',
      sampleBody: JSON.stringify({
        datasetType: "test"
      }, null, 2),
      curl: `curl -X POST "http://localhost:3000/api/evaluate" \\
  -H "Content-Type: application/json" \\
  -d '{"datasetType": "test"}'`
    },
    {
      id: 'health',
      name: 'GET /api/health',
      method: 'GET',
      url: '/api/health',
      desc: 'Telemetry health endpoint verifying engine availability and model connectivity.',
      sampleBody: '',
      curl: `curl -X GET "http://localhost:3000/api/health"`
    }
  ];

  const currentEp = endpoints.find(e => e.id === selectedEndpoint) || endpoints[0];

  const handleSelectEndpoint = (ep: any) => {
    setSelectedEndpoint(ep.id);
    setRequestBody(ep.sampleBody);
    setResponseOutput('');
  };

  const handleExecute = async () => {
    setLoading(true);
    setResponseOutput('');
    try {
      const opts: RequestInit = {
        method: currentEp.method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (currentEp.method !== 'GET' && requestBody) {
        opts.body = requestBody;
      }
      const res = await fetch(currentEp.url, opts);
      const data = await res.json();
      setResponseOutput(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseOutput(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(currentEp.curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0a1120]/90 border border-cyan-900/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
                RESTful Microservice API Explorer
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Production web service wrapping the cognitive extraction engine for programmatic API consumption.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-3.5 py-1.5 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 flex items-center gap-2 font-medium shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>FastAPI / Express Online</span>
            </span>
          </div>
        </div>

        {/* Endpoints bar */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-cyan-950">
          {endpoints.map((ep) => (
            <button
              key={ep.id}
              onClick={() => handleSelectEndpoint(ep)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                selectedEndpoint === ep.id
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'bg-[#060c18] border-cyan-950 text-slate-400 hover:text-cyan-300 hover:border-cyan-800'
              }`}
            >
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${ep.method === 'GET' ? 'bg-teal-950 text-teal-300 border border-teal-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'}`}>
                {ep.method}
              </span>
              <span>{ep.url}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Curl snippet */}
      <div className="bg-[#0a1120]/90 border border-cyan-900/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive cURL Request</span>
          </div>
          <button
            onClick={copyCurl}
            className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors"
          >
            {copiedCurl ? <Check className="w-3 h-3 text-teal-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedCurl ? 'Copied' : 'Copy cURL Snippet'}</span>
          </button>
        </div>
        <pre className="p-3.5 bg-[#050912] rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto border border-cyan-950">
          {currentEp.curl}
        </pre>
      </div>

      {/* Request & Response Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Pane */}
        <div className="bg-[#0a1120]/90 border border-cyan-900/40 rounded-2xl p-5 shadow-2xl flex flex-col h-[400px] backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-cyan-950">
            <div className="text-xs font-semibold text-cyan-200 uppercase tracking-wider font-mono">
              Payload Body (JSON)
            </div>
            <button
              onClick={handleExecute}
              disabled={loading}
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] active:scale-95 font-mono"
            >
              {loading ? (
                <>
                  <Send className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-slate-950" />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            disabled={currentEp.method === 'GET'}
            placeholder={currentEp.method === 'GET' ? 'No body required for GET request' : 'Enter JSON payload...'}
            className="w-full flex-1 p-3.5 text-xs bg-[#050912] text-cyan-100 font-mono rounded-xl border border-cyan-950 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
          />
        </div>

        {/* Response Pane */}
        <div className="bg-[#0a1120]/90 border border-cyan-900/40 rounded-2xl p-5 shadow-2xl flex flex-col h-[400px] backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-cyan-950">
            <div className="text-xs font-semibold text-cyan-200 uppercase tracking-wider font-mono">
              Server Response
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Status: <span className={responseOutput ? 'text-teal-400 font-bold' : 'text-slate-500'}>{loading ? 'In Flight...' : responseOutput ? '200 OK' : 'Idle'}</span>
            </span>
          </div>
          <pre className="w-full flex-1 p-3.5 text-xs bg-[#050912] text-teal-300 font-mono rounded-xl border border-cyan-950 overflow-y-auto leading-relaxed">
            {responseOutput || (loading ? '// Invoking cognitive endpoint...' : '// Execute request to inspect JSON output')}
          </pre>
        </div>
      </div>
    </div>
  );
};
