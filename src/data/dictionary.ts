// English words, to tell a real non-theme word from a typo.
// The list is about 3 MB, so it loads on demand into its own chunk.
let dictionary: Promise<Set<string>> | undefined;

// A failed download is forgotten, so the next call tries again.
export const loadDictionary = () =>
  (dictionary ??= import('an-array-of-english-words')
    .then(m => new Set((m.default as string[]).filter(w => w.length >= 4).map(w => w.toUpperCase())))
    .catch(error => {
      dictionary = undefined;
      throw error;
    }));
