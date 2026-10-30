"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, ShieldCheck, ShieldAlert, Send, Activity, Clock } from "lucide-react";

interface BanReport {
  id: string;
  timestamp: string;
  banType: string;
  reason: string;
}

export default function BanWaveTracker() {
  const [reports, setReports] = useState<BanReport[]>([
    { id: "1", timestamp: "2 mins ago", banType: "Permanent / Termination", reason: "Exploiting/Scripting" },
    { id: "2", timestamp: "5 mins ago", banType: "7-Day Ban", reason: "Toxic Behavior/Chat" },
    { id: "3", timestamp: "12 mins ago", banType: "1-Day Ban", reason: "Unauthorized Charges" },
  ]);

  const [banType, setBanType] = useState("1-Day Ban");
  const [reason, setReason] = useState("Exploiting/Scripting");
  const [status, setStatus] = useState<"SAFE" | "CAUTION" | "ACTIVE">("SAFE");

  useEffect(() => {
    if (reports.length > 8) {
      setStatus("ACTIVE");
    } else if (reports.length > 4) {
      setStatus("CAUTION");
    } else {
      setStatus("SAFE");
    }
  }, [reports]);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: BanReport = {
      id: Date.now().toString(),
      timestamp: "Just now",
      banType,
      reason,
    };
    setReports([newReport, ...reports]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <Activity className="text-red-500 animate-pulse" /> ROBLOX BAN WAVE TRACKER
            </h1>
            <p className="text-slate-400 text-sm mt-1">Crowdsourced real-time status and ban reporting hub.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-xl px-5">
            {status === "SAFE" && (
              <>
                <ShieldCheck className="text-emerald-400 w-8 h-8" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">SYSTEM STATUS</div>
                  <div className="text-emerald-400 font-bold tracking-wider text-sm">NO ACTIVE WAVE</div>
                </div>
              </>
            )}
            {status === "CAUTION" && (
              <>
                <AlertTriangle className="text-amber-400 w-8 h-8 animate-bounce" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">SYSTEM STATUS</div>
                  <div className="text-amber-400 font-bold tracking-wider text-sm">ELEVATED REPORTS</div>
                </div>
              </>
            )}
            {status === "ACTIVE" && (
              <>
                <ShieldAlert className="text-red-500 w-8 h-8 animate-pulse" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">SYSTEM STATUS</div>
                  <div className="text-red-500 font-black tracking-wider text-sm">BAN WAVE ACTIVE</div>
                </div>
              </>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-indigo-400" /> Report a Ban
            </h2>
            <p className="text-xs text-slate-400">Help the community track detections. Submit anonymously.</p>
            
            <form onSubmit={handleSubmitReport} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Ban Length</label>
                <select 
                  value={banType} 
                  onChange={(e) => setBanType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option>Warning</option>
                  <option>1-Day Ban</option>
                  <option>3-Day Ban</option>
                  <option>7-Day Ban</option>
                  <option>Permanent / Termination</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Suspected Reason</label>
                <select 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option>Exploiting/Scripting</option>
                  <option>Toxic Behavior/Chat</option>
                  <option>Decal/Asset Upload</option>
                  <option>Unauthorized Charges</option>
                  <option>False Positive / Unknown</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition duration-200 flex items-center justify-center gap-2"
              >
                Submit Report
              </button>
            </form>
          </div>

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" /> Recent User Submissions
              </h2>
              <span className="text-xs bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono px-2.5 py-1 rounded-full">
                Total Logs: {reports.length}
              </span>
            </div>

            <div className="divide-y divide-slate-800 max-h-[400px] overflow-y-auto pr-2 space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wide ${
                      report.banType.includes("Permanent") 
                        ? "bg-red-950 text-red-400 border border-red-900" 
                        : "bg-amber-950 text-amber-400 border border-amber-900"
                    }`}>
                      {report.banType}
                    </span>
                    <p className="text-sm font-medium text-slate-200 mt-1">{report.reason}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{report.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
