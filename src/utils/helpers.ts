// Утилита для классов (аналог cn)
export const cn = (
  ...classes: (string | boolean | undefined | null)[]
): string => {
  return classes.filter(Boolean).join(' ').trim();
};
