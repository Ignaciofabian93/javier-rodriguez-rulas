"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { content, type Locale } from "./content";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (typeof content)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "jrr-locale";

/*
 * The locale lives in a tiny external store (localStorage + an in-memory
 * copy) read through useSyncExternalStore. The server and the hydration pass
 * both render Spanish; React then switches to the visitor's saved or browser
 * language right after hydrating, with no mismatch and no setState-in-effect.
 */
const listeners = new Set<() => void>();
// In-memory choice; also keeps the toggle working when storage is blocked.
let chosen: Locale | null = null;

function isLocale(value: unknown): value is Locale {
  return value === "es" || value === "en";
}

function readStored(): Locale | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

function getSnapshot(): Locale {
  return (
    chosen ??
    readStored() ??
    (navigator.language?.toLowerCase().startsWith("en") ? "en" : "es")
  );
}

function getServerSnapshot(): Locale {
  return "es";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Follow changes made in other tabs.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      chosen = readStored();
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function writeLocale(locale: Locale) {
  chosen = locale;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage unavailable (e.g. blocked cookies): keep the in-memory choice.
  }
  listeners.forEach((notify) => notify());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep <html lang> in sync for screen readers and translation tools.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => writeLocale(l);
  const toggle = () => writeLocale(locale === "es" ? "en" : "es");

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, toggle, t: content[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
