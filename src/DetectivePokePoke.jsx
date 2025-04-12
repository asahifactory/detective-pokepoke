import React, { useState } from "react";
import snorlax from "./assets/snorlax.gif";

export default function DetectivePokePoke() {
  const [selection, setSelection] = useState(Array(5).fill(null));
  const [entries, setEntries] = useState([]);

  const handleSelect = (row, value) => {
    // Prevent duplicate values
    if (selection.includes(value)) return;

    const updated = [...selection];
    updated[row] = value;
    setSelection(updated);
  };

  const handleSave = () => {
    if (selection.includes(null)) {
      alert("Please complete all selections.");
      return;
    }
    setEntries([...entries, [...selection]]);
    setSelection(Array(5).fill(null));
  };

  const handleExportCSV = () => {
    const header = "entry,slot1,slot2,slot3,slot4,slot5\n";
    const rows = entries
      .map((entry, idx) => `${idx + 1},${entry.join(",")}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "detective-pokepoke.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSyncToSheet = async () => {
    const webhookUrl = "https://script.google.com/macros/s/AKfycbwl6ouFT2xpliJWGfA5dytmktF6g8Vbthxp01rZ5f63pvsOM_ac_QmCfS_VredooYPd/exec"; // 👈 paste it!
    if (selection.includes(null)) {
      alert("Please complete all selections before syncing.");
      return;
    }
  
    try {
      await fetch(webhookUrl, {
        method: "POST",
        body: JSON.stringify(selection),
        headers: { "Content-Type": "application/json" },
      });
      alert("Synced to Google Sheet!");
    } catch (err) {
      console.error("Sync failed:", err);
      alert("Failed to sync. Check console.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-pink-100 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/40">
  
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">
          Detective PokePoke 🔍
        </h1>
        <p className="text-center text-sm text-gray-600 mb-4">
          Click where each card ends up <span className="font-semibold">after the shuffle</span> ✨
        </p>
  
        <div className="text-center mb-4">
            <img
                src={snorlax}
                alt="Snorlax"
                className="mx-auto w-24 h-auto drop-shadow-md animate-bounce-slow"
            />
            <p className="text-xs text-gray-500 mt-1">Snorlax is observing quietly... zzz</p>
        </div>

  
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((row) => (
            <div key={row} className="flex items-center gap-2 justify-center">
              <span className="w-16 text-sm text-gray-500">Slot {row + 1}:</span>
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleSelect(row, val)}
                  disabled={selection.includes(val) && selection[row] !== val}
                  className={`w-12 h-12 rounded-lg text-lg font-semibold border shadow-sm transition 
                    ${
                      selection[row] === val
                        ? "bg-blue-200 text-blue-900 shadow-inner"
                        : selection.includes(val)
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-blue-100"
                    }`}
                >
                  {val}
                </button>
              ))}
            </div>
          ))}
        </div>
  
        <div className="flex gap-3 justify-center mt-6">
            <button
                onClick={handleSyncToSheet}
                className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-4 py-2 rounded-lg shadow transition"
                >
                Sync to Sheet
            </button>

          <button
            onClick={handleSave}
            className="bg-green-200 hover:bg-green-300 text-green-900 px-4 py-2 rounded-lg shadow-sm transition"
          >
            Save Shuffle
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-blue-200 hover:bg-blue-300 text-blue-900 px-4 py-2 rounded-lg shadow-sm transition"
          >
            Export CSV
          </button>
        </div>
  
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Saved Entries</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1 max-h-32 overflow-auto">
            {entries.map((entry, idx) => (
              <li key={idx}>#{idx + 1}: {entry.join(" ")}</li>
            ))}
          </ul>
        </div>
  
      </div>
    </div>
  );
  
}
