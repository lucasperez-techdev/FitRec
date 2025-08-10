export type UserPrefs = {
    style: "casual" | "sporty" | "formal" | "street" | "";
    colors: string[];
    comfort: "cold" | "neutral" | "hot" | "";
    rainGear: boolean;
    footwear: "sneakers" | "boots" | "dress" | "";
  };
  
  const KEY = "userPreferences";
  
  export function loadPrefs(): UserPrefs {
    if (typeof window === "undefined") {
      return { style: "", colors: [], comfort: "", rainGear: true, footwear: "" };
    }
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as UserPrefs) : { style: "", colors: [], comfort: "", rainGear: true, footwear: "" };
    } catch {
      return { style: "", colors: [], comfort: "", rainGear: true, footwear: "" };
    }
  }
  
  export function savePrefs(p: UserPrefs) {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(p));
  }
  