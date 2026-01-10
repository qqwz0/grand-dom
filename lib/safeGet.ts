export function safeGet<T = any>(obj: any, path: string[], fallback?: T): T {
  const res = path.reduce(
    (acc: any, k) => (acc && acc[k] !== undefined ? acc[k] : undefined),
    obj
  );
  return (res ?? fallback) as T;
}
