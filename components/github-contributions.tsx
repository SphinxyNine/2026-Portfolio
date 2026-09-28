import { ArrowUpRight } from 'lucide-react';
import { githubContributionSnapshot as snapshot } from '@/data/github-contributions';
import { githubProfileSummary as profileSummary } from '@/data/github-profile-summary';
import { GitHubIcon } from './brand-icons';

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function contributionDays() {
  const start = new Date(`${snapshot.from}T00:00:00Z`);
  const end = new Date(`${snapshot.to}T00:00:00Z`);
  const activity = new Map<string, (typeof snapshot.activeDays)[number]>(
    snapshot.activeDays.map((day) => [day.date, day]),
  );
  const days: Array<{ date: string; count: number; level: number; empty?: boolean }> = [];

  for (let offset = 0; offset < start.getUTCDay(); offset += 1) {
    days.push({ date: `empty-${offset}`, count: 0, level: 0, empty: true });
  }

  for (let date = new Date(start); date <= end; date.setUTCDate(date.getUTCDate() + 1)) {
    const key = isoDate(date);
    const contribution = activity.get(key);
    days.push({ date: key, count: contribution?.count ?? 0, level: contribution?.level ?? 0 });
  }

  return days;
}

const monthLabels = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export function GitHubContributions() {
  const days = contributionDays();
  const publicTotalLabel = new Intl.NumberFormat('en-US').format(snapshot.total);
  const profileTotalLabel = new Intl.NumberFormat('en-US').format(profileSummary.total);
  const nonPublicTotal = Math.max(profileSummary.total - snapshot.total, 0);

  return (
    <section className="home-section github-section" aria-labelledby="github-heading">
      <header className="section-heading home-section-heading">
        <span className="section-index" aria-hidden="true">05</span>
        <h2 id="github-heading">GitHub activity</h2>
        <a className="inline-link section-link" href={`https://github.com/${snapshot.username}`} target="_blank" rel="noopener noreferrer">
          @{snapshot.username} <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </header>
      <div className="github-calendar-shell">
        <div className="github-summary">
          <div className="github-total">
            <span className="github-mark" aria-hidden="true"><GitHubIcon width={22} height={22} /></span>
            <div>
              <strong>{profileTotalLabel}</strong>
              <span>contributions in the last year</span>
            </div>
            <span className="github-total-badge">Profile total</span>
          </div>
          <dl className="github-breakdown">
            <div><dt>Public</dt><dd>{publicTotalLabel}</dd></div>
            <div><dt>Not publicly exposed</dt><dd>{nonPublicTotal}</dd></div>
          </dl>
        </div>
        <div className="github-chart-heading">
          <p>Public activity calendar</p>
          <p>{snapshot.from} — {snapshot.to}</p>
        </div>
        <div className="github-chart-body">
          <div className="github-weekdays" aria-hidden="true">
            <span>Mon</span><span>Wed</span><span>Fri</span>
          </div>
          <div className="github-calendar-scroll">
            <div className="github-months" aria-hidden="true">
              {monthLabels.map((month) => <span key={month}>{month}</span>)}
            </div>
            <div className="github-calendar-grid" role="img" aria-label={`${publicTotalLabel} public GitHub contributions from ${snapshot.from} to ${snapshot.to}`}>
              {days.map((day) => day.empty ? (
                <span className="contribution-day is-empty" key={day.date} aria-hidden="true" />
              ) : (
                <span
                  className="contribution-day"
                  data-level={day.level}
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="github-calendar-footer">
          <p>The daily grid contains public activity. Your signed-in profile total also includes activity GitHub does not expose publicly.</p>
          <div className="github-legend" aria-label="Contribution intensity">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => <i className="contribution-day" data-level={level} key={level} aria-hidden="true" />)}
            <span>More</span>
          </div>
        </div>
        <p className="github-snapshot-note">Profile total supplied {profileSummary.capturedAt} · Public calendar refreshed {snapshot.refreshedAt}</p>
      </div>
    </section>
  );
}
