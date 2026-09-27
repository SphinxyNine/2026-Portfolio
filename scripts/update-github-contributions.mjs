import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const username = process.argv[2] || 'SphinxyNine';
const manilaDate = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit',
}).formatToParts(new Date()).reduce((parts, part) => ({ ...parts, [part.type]: part.value }), {});
const today = new Date(Date.UTC(Number(manilaDate.year), Number(manilaDate.month) - 1, Number(manilaDate.day)));
const start = new Date(today);
start.setUTCDate(start.getUTCDate() - 364);
const iso = (date) => date.toISOString().slice(0, 10);
const years = [...new Set([start.getUTCFullYear(), today.getUTCFullYear()])];

function parseCalendar(html) {
  const rows = [];
  const pattern = /<td(?<attrs>[^>]*data-date="(?<date>[^"]+)"[^>]*)><\/td>\s*<tool-tip[^>]*>(?<label>[^<]+)<\/tool-tip>/g;
  for (const match of html.matchAll(pattern)) {
    const level = Number(match.groups.attrs.match(/data-level="(\d)"/)?.[1] ?? 0);
    const count = Number(match.groups.label.match(/^([\d,]+) contribution/)?.[1].replaceAll(',', '') ?? 0);
    rows.push({ date: match.groups.date, count, level });
  }
  return rows;
}

const calendars = await Promise.all(years.map(async (year) => {
  const from = `${year}-01-01`;
  const to = `${year}-12-31`;
  const response = await fetch(`https://github.com/users/${username}/contributions?from=${from}&to=${to}`, {
    headers: { 'user-agent': 'Mozilla/5.0 Portfolio contribution updater' },
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status} for ${year}`);
  return parseCalendar(await response.text());
}));

const activeDays = calendars.flat()
  .filter((day) => day.date >= iso(start) && day.date <= iso(today) && day.count > 0)
  .sort((a, b) => a.date.localeCompare(b.date));
const total = activeDays.reduce((sum, day) => sum + day.count, 0);
const output = `export const githubContributionSnapshot = ${JSON.stringify({
  username,
  from: iso(start),
  to: iso(today),
  total,
  refreshedAt: iso(today),
  activeDays,
}, null, 2)} as const;\n`;

const target = fileURLToPath(new URL('../data/github-contributions.ts', import.meta.url));
await writeFile(target, output);
console.log(`Saved ${total} public contributions across ${activeDays.length} active days for ${username}.`);
