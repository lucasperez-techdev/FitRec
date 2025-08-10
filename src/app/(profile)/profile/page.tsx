"use client";
import { useEffect, useState } from "react";
import { loadPrefs, savePrefs, type UserPrefs } from "@/lib/prefs";

const COLORS = ["black", "white", "blue", "green", "red", "beige"];

export default function ProfilePage() {
  const [prefs, setPrefs] = useState<UserPrefs>({ style: "", colors: [], comfort: "", rainGear: true, footwear: "" });
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => { setPrefs(loadPrefs()); }, []);

  const toggleColor = (c: string) =>
    setPrefs(p => p.colors.includes(c) ? { ...p, colors: p.colors.filter(x => x !== c) } : { ...p, colors: [...p.colors, c] });

  const onSave = () => { savePrefs(prefs); setSaved("Preferences saved!"); setTimeout(() => setSaved(null), 1500); };
  const onReset = () => { const blank: UserPrefs = { style: "", colors: [], comfort: "", rainGear: true, footwear: "" }; setPrefs(blank); savePrefs(blank); };

  return (
    <main className="profile-container">
      <h1 className="profile-title">Your Profile</h1>

      <section className="profile-card">
        <label className="label">Clothing Style</label>
        <select className="input" value={prefs.style}
          onChange={(e) => setPrefs({ ...prefs, style: e.target.value as UserPrefs["style"] })}>
          <option value="">Pick one</option>
          <option value="casual">Casual</option>
          <option value="sporty">Sporty</option>
          <option value="formal">Formal</option>
          <option value="street">Street</option>
        </select>

        <label className="label mt-4">Favorite Colors</label>
        <div className="chips">
          {COLORS.map(c => (
            <button key={c} type="button" onClick={() => toggleColor(c)}
              className={`chip ${prefs.colors.includes(c) ? "chip-active" : ""}`}>
              {c}
            </button>
          ))}
        </div>

        <label className="label mt-4">Weather Comfort</label>
        <select className="input" value={prefs.comfort}
          onChange={(e) => setPrefs({ ...prefs, comfort: e.target.value as UserPrefs["comfort"] })}>
          <option value="">Pick one</option>
          <option value="cold">I run cold</option>
          <option value="neutral">Neutral</option>
          <option value="hot">I run hot</option>
        </select>

        <label className="label mt-4">Footwear Preference</label>
        <select className="input" value={prefs.footwear}
          onChange={(e) => setPrefs({ ...prefs, footwear: e.target.value as UserPrefs["footwear"] })}>
          <option value="">Pick one</option>
          <option value="sneakers">Sneakers</option>
          <option value="boots">Boots</option>
          <option value="dress">Dress shoes</option>
        </select>

        <label className="label mt-4 flex items-center gap-2">
          <input type="checkbox" checked={prefs.rainGear}
                 onChange={(e) => setPrefs({ ...prefs, rainGear: e.target.checked })}/>
          Ill wear rain gear if needed
        </label>

        <div className="mt-4 flex gap-3">
          <button className="btn-primary" onClick={onSave}>Save</button>
          <button className="btn-muted" onClick={onReset}>Reset</button>
        </div>

        {saved && <p className="saved">{saved}</p>}
      </section>
    </main>
  );
}
