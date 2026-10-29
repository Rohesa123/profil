import { useEffect, useState, type ReactNode } from "react";
import {
  GithubContext,
  defaultSnapshot,
  fetchGithubUser,
  readCache,
  writeCache,
  type GhSnapshot,
  type GhStatus,
} from "./githubContext";

export function GithubProvider({ children }: { children: ReactNode }) {
  const cached = readCache();
  const [snapshot, setSnapshot] = useState<GhSnapshot>(cached ?? defaultSnapshot);
  const [status, setStatus] = useState<GhStatus>(cached ? "cached" : "loading");

  useEffect(() => {
    const controller = new AbortController();

    fetchGithubUser(controller.signal)
      .then((fresh) => {
        setSnapshot(fresh);
        setStatus("live");
        writeCache(fresh);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        const last = readCache();
        if (last) {
          setSnapshot(last);
          setStatus("cached");
        } else {
          setStatus("static");
        }
        console.warn("[github] gagal refresh, pakai data tersimpan:", err.message);
      });

    return () => controller.abort();
  }, []);

  return (
    <GithubContext.Provider value={{ snapshot, status }}>
      {children}
    </GithubContext.Provider>
  );
}
