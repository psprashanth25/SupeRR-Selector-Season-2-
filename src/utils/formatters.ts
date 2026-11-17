export function formatNumber(val: number | null | undefined, decimals = 2): string {
  if (val === null || val === undefined || isNaN(val)) return 'Not available';
  return Number(val).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatInt(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return 'Not available';
  return Math.round(Number(val)).toLocaleString();
}

export function formatPercent(val: number | null | undefined, decimals = 1): string {
  if (val === null || val === undefined || isNaN(val)) return 'Not available';
  return `${Number(val).toFixed(decimals)}%`;
}

export function formatEcon(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return 'Not available';
  return Number(val).toFixed(2);
}

export function formatRunsSaved(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return 'Not available';
  const num = Number(val);
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}`;
}
