'use client';

import { Check, ImageIcon, MousePointerClick, RotateCcw, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const issueDetails = {
  cta: {
    title: 'Make the CTA specific',
    copy: '“Reserve your place” tells visitors exactly what will happen next.',
  },
  form: {
    title: 'Reduce form friction',
    copy: 'Three essential fields are easier to complete than six fields at the first step.',
  },
  image: {
    title: 'Optimize the hero image',
    copy: 'A correctly sized modern image improves loading without losing the visual impact.',
  },
  trust: {
    title: 'Add trust near the decision',
    copy: 'Clear reassurance reduces uncertainty before a visitor submits the form.',
  },
} as const;

type IssueId = keyof typeof issueDetails;

export function FunnelChallenge() {
  const [fixed, setFixed] = useState<IssueId[]>([]);
  const [lastFixed, setLastFixed] = useState<IssueId | null>(null);
  const complete = fixed.length === 4;

  function fix(id: IssueId) {
    setLastFixed(id);
    setFixed((current) => current.includes(id) ? current : [...current, id]);
  }

  function reset() {
    setFixed([]);
    setLastFixed(null);
  }

  return (
    <div className="funnel-lab">
      <section className="funnel-stage" aria-labelledby="funnel-stage-heading">
        <div className="lab-panel-heading">
          <div><p className="eyebrow">Interactive challenge</p><h2 id="funnel-stage-heading">Click the four weak points</h2></div>
          <span className="challenge-score">{fixed.length}/4 fixed</span>
        </div>

        <div className="mock-browser">
          <div className="mock-browser-bar" aria-hidden="true"><span /><span /><span /><p>expedition.example</p></div>
          <div className="mock-landing-page">
            <div className="mock-hero-copy">
              <p>Weekend expedition</p>
              <h3>Make the weekend unforgettable.</h3>
              <span>Small-group outdoor experiences designed for beginners.</span>
              <button className="funnel-target mock-cta" type="button" data-fixed={fixed.includes('cta')} aria-pressed={fixed.includes('cta')} onClick={() => fix('cta')}>
                <strong>{fixed.includes('cta') ? 'Reserve your place' : 'Learn more'}</strong>
                <small>{fixed.includes('cta') ? 'Clear next step' : 'Vague call to action'}</small>
              </button>
            </div>

            <button className="funnel-target mock-image" type="button" data-fixed={fixed.includes('image')} aria-pressed={fixed.includes('image')} onClick={() => fix('image')}>
              <ImageIcon size={27} strokeWidth={1.25} aria-hidden="true" />
              <strong>{fixed.includes('image') ? 'Responsive WebP' : '4.8 MB hero.jpg'}</strong>
              <small>{fixed.includes('image') ? 'Sized for this screen' : 'Oversized image'}</small>
            </button>

            <button className="funnel-target mock-form" type="button" data-fixed={fixed.includes('form')} aria-pressed={fixed.includes('form')} onClick={() => fix('form')}>
              <span className="mock-form-heading"><strong>Start your inquiry</strong><small>{fixed.includes('form') ? '3 fields' : '6 fields'}</small></span>
              <span className="mock-fields" aria-hidden="true">
                {Array.from({ length: fixed.includes('form') ? 3 : 6 }, (_, index) => <i key={index} />)}
              </span>
              <span className="mock-submit">Submit</span>
            </button>

            <button className="funnel-target mock-trust" type="button" data-fixed={fixed.includes('trust')} aria-pressed={fixed.includes('trust')} onClick={() => fix('trust')}>
              <ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" />
              <span><strong>{fixed.includes('trust') ? 'Secure booking · reply within one day' : 'No reassurance provided'}</strong><small>{fixed.includes('trust') ? 'Trust placed near the decision' : 'Trust signal missing'}</small></span>
            </button>
          </div>
        </div>
      </section>

      <aside className="challenge-guide" aria-labelledby="challenge-guide-heading">
        <div className="challenge-progress" aria-hidden="true"><span style={{ width: `${fixed.length * 25}%` }} /></div>
        <p className="eyebrow">Review</p>
        <h2 id="challenge-guide-heading">Funnel health</h2>
        <ul>
          {(Object.keys(issueDetails) as IssueId[]).map((id, index) => (
            <li data-fixed={fixed.includes(id)} key={id}>
              <span>{fixed.includes(id) ? <Check size={14} aria-hidden="true" /> : index + 1}</span>
              <div><strong>{issueDetails[id].title}</strong><small>{fixed.includes(id) ? issueDetails[id].copy : 'Find and click this issue in the page preview.'}</small></div>
            </li>
          ))}
        </ul>

        <div className="challenge-message" role="status" aria-live="polite">
          {complete ? (
            <><ShieldCheck size={20} aria-hidden="true" /><div><strong>Funnel repaired</strong><p>You improved clarity, speed, trust, and conversion friction.</p></div></>
          ) : lastFixed ? (
            <><Check size={20} aria-hidden="true" /><div><strong>{issueDetails[lastFixed].title}</strong><p>{issueDetails[lastFixed].copy}</p></div></>
          ) : (
            <><MousePointerClick size={20} aria-hidden="true" /><div><strong>Start inspecting</strong><p>The outlined elements contain the four issues.</p></div></>
          )}
        </div>

        <button className="button button-quiet" type="button" disabled={fixed.length === 0} onClick={reset}><RotateCcw size={15} aria-hidden="true" /> Reset challenge</button>
      </aside>
    </div>
  );
}
