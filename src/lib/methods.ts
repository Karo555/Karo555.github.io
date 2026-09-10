/**
 * A method string must be written identically everywhere it appears — the
 * deferred reverse index depends on it, and a migration to fix drift later is
 * far more expensive than a warning now.
 *
 * Two strings collide when they differ only by case, hyphenation, or surrounding
 * whitespace. That is a warning, never a build failure: the site owner may be
 * mid-edit, and a half-typed method should not stop a deploy.
 */
const normalise = (method: string) =>
  method.trim().toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ");

export function warnInconsistentMethods(
  sources: { id: string; methods?: string[] }[]
) {
  // normalised form -> the distinct raw spellings seen, and where each came from
  const seen = new Map<string, Map<string, Set<string>>>();

  for (const { id, methods } of sources) {
    for (const method of methods ?? []) {
      const key = normalise(method);
      if (!seen.has(key)) seen.set(key, new Map());
      const spellings = seen.get(key)!;
      if (!spellings.has(method)) spellings.set(method, new Set());
      spellings.get(method)!.add(id);
    }
  }

  for (const [, spellings] of seen) {
    if (spellings.size < 2) continue;
    const detail = [...spellings]
      .map(([raw, ids]) => `"${raw}" (${[...ids].join(", ")})`)
      .join(" vs ");
    console.warn(
      `[methods] inconsistent spelling of the same method: ${detail}. ` +
        `Pick one and use it in every entry.`
    );
  }
}
