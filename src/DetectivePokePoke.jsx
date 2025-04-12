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
    const webhookUrl = "https://pokeproxy.asahifactory.workers.dev/"; // 👈 paste it!
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
    <div className="min-h-screen flex items-center justify-center bg-snoblue p-6">
      <div className="w-full max-w-md bg-snobelly rounded-2xl shadow-xl p-6 border border-white/40">
  
        <h1 className="text-3xl font-bold text-center text-snobrown mb-2">
          Detective PokePoke 🔍
        </h1>
        <p className="text-center text-sm text-snobrown/80 mb-4">
          Choose where each card ends up after the shuffle ✨
        </p>
  
        <div className="text-center mb-4">
          <img
            src={snorlax}
            alt="Snorlax"
            className="mx-auto w-24 h-auto drop-shadow-md animate-bounce-slow"
          />
          <p className="text-xs text-snobrown/60 mt-1">Snorlax is guarding the data...</p>
        </div>
  
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((row) => (
            <div key={row} className="flex items-center gap-2 justify-center">
              <span className="w-16 text-sm text-snobrown/70">Slot {row + 1}:</span>
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleSelect(row, val)}
                  disabled={selection.includes(val) && selection[row] !== val}
                  className={`w-12 h-12 rounded-lg text-lg font-semibold border shadow-sm transition
                    ${
                      selection[row] === val
                        ? "bg-snoblue text-white shadow-inner"
                        : selection.includes(val)
                        ? "bg-snobelly/60 text-snobrown/40 cursor-not-allowed"
                        : "bg-white text-snobrown hover:bg-snoblue/20"
                    }`}
                >
                  {val}
                </button>
              ))}
            </div>
          ))}
        </div>
  
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSyncToSheet}
            className="bg-snobrown hover:bg-snobrown/80 text-white px-6 py-2 rounded-xl shadow transition"
          >
            Sync to Sheet
          </button>
        </div>
      </div>
    </div>
  );  
  
}
