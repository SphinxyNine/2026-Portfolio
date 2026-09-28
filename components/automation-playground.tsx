'use client';

import {
  BellRing,
  BriefcaseBusiness,
  CalendarCheck2,
  Check,
  FormInput,
  PhoneMissed,
  Play,
  RotateCcw,
  Send,
  Tags,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

type Option = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const triggers: Option[] = [
  { id: 'lead', title: 'New lead form', description: 'A visitor submits an inquiry.', icon: FormInput },
  { id: 'booking', title: 'Booking submitted', description: 'A prospect reserves a call.', icon: CalendarCheck2 },
  { id: 'missed-call', title: 'Missed call', description: 'A call goes unanswered.', icon: PhoneMissed },
];

const actions: Option[] = [
  { id: 'tag', title: 'Add CRM tag', description: 'Organize and segment the lead.', icon: Tags },
  { id: 'follow-up', title: 'Send follow-up', description: 'Deliver a useful next step.', icon: Send },
  { id: 'notify', title: 'Notify the team', description: 'Alert the right person quickly.', icon: BellRing },
  { id: 'opportunity', title: 'Create opportunity', description: 'Move the lead into a pipeline.', icon: BriefcaseBusiness },
];

const outcomes: Record<string, string> = {
  lead: 'The inquiry is captured, organized, and moved forward without manual handoff.',
  booking: 'The booking is confirmed and the team receives the context needed to prepare.',
  'missed-call': 'The lead receives a quick response while the team gets a clear follow-up task.',
};

export function AutomationPlayground() {
  const reduceMotion = usePrefersReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [triggerId, setTriggerId] = useState('');
  const [actionIds, setActionIds] = useState<string[]>([]);
  const [status, setStatus] = useState<'ready' | 'running' | 'complete'>('ready');
  const [runKey, setRunKey] = useState(0);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const selectedTrigger = triggers.find((item) => item.id === triggerId);
  const selectedActions = actionIds.map((id) => actions.find((item) => item.id === id)).filter(Boolean) as Option[];

  function chooseTrigger(id: string) {
    setTriggerId(id);
    setStatus('ready');
  }

  function toggleAction(id: string) {
    setActionIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length === 3) return current;
      return [...current, id];
    });
    setStatus('ready');
  }

  function runWorkflow() {
    if (!selectedTrigger || selectedActions.length === 0 || status === 'running') return;
    if (timer.current) clearTimeout(timer.current);
    setRunKey((key) => key + 1);
    setStatus('running');
    timer.current = setTimeout(() => setStatus('complete'), reduceMotion ? 80 : 2200);
  }

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setTriggerId('');
    setActionIds([]);
    setStatus('ready');
  }

  return (
    <div className="automation-lab">
      <div className="lab-builder">
        <fieldset className="lab-option-group">
          <legend><span>01</span> Choose a trigger</legend>
          <div className="lab-option-grid">
            {triggers.map(({ id, title, description, icon: Icon }) => (
              <button className="lab-option" type="button" key={id} aria-pressed={triggerId === id} onClick={() => chooseTrigger(id)}>
                <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                <span><strong>{title}</strong><small>{description}</small></span>
                {triggerId === id && <Check className="lab-option-check" size={15} aria-hidden="true" />}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="lab-option-group">
          <legend><span>02</span> Add up to three actions</legend>
          <div className="lab-option-grid lab-action-grid">
            {actions.map(({ id, title, description, icon: Icon }) => {
              const selected = actionIds.includes(id);
              const unavailable = !selected && actionIds.length === 3;
              return (
                <button className="lab-option" type="button" key={id} aria-pressed={selected} disabled={unavailable} onClick={() => toggleAction(id)}>
                  <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                  <span><strong>{title}</strong><small>{description}</small></span>
                  {selected && <Check className="lab-option-check" size={15} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <section className="automation-preview" aria-labelledby="workflow-preview-heading">
        <div className="lab-panel-heading">
          <div><p className="eyebrow">Live preview</p><h2 id="workflow-preview-heading">Your workflow</h2></div>
          <span className={`lab-status is-${status}`}>{status === 'complete' ? 'Complete' : status === 'running' ? 'Running' : 'Ready'}</span>
        </div>

        <div className="workflow-canvas" data-status={status} key={runKey}>
          {selectedTrigger ? (
            <WorkflowNode option={selectedTrigger} type="Trigger" step={0} />
          ) : (
            <div className="workflow-empty"><Workflow size={22} aria-hidden="true" /><span>Select a trigger to begin</span></div>
          )}
          {selectedActions.map((action, index) => (
            <div className="workflow-step" key={action.id} style={{ '--step': index + 1 } as CSSProperties}>
              <span className="workflow-line" aria-hidden="true" />
              <WorkflowNode option={action} type={`Action ${index + 1}`} step={index + 1} />
            </div>
          ))}
        </div>

        <div className="lab-controls">
          <button className="button button-primary animated-control" type="button" disabled={!selectedTrigger || selectedActions.length === 0 || status === 'running'} onClick={runWorkflow}>
            <Play size={15} fill="currentColor" aria-hidden="true" /> Run workflow
          </button>
          <button className="button button-quiet" type="button" disabled={!selectedTrigger && actionIds.length === 0} onClick={reset}>
            <RotateCcw size={15} aria-hidden="true" /> Reset
          </button>
        </div>

        <p className="lab-live-message" role="status" aria-live="polite">
          {status === 'complete' && triggerId ? outcomes[triggerId] : status === 'running' ? 'Passing the lead through each automation step…' : 'Choose a trigger and at least one action, then run the workflow.'}
        </p>
      </section>
    </div>
  );
}

function WorkflowNode({ option, type, step }: { option: Option; type: string; step: number }) {
  const Icon = option.icon;
  return (
    <div className="workflow-node" style={{ '--step': step } as CSSProperties}>
      <span className="workflow-node-icon"><Icon size={18} strokeWidth={1.5} aria-hidden="true" /></span>
      <span><small>{type}</small><strong>{option.title}</strong></span>
      <span className="workflow-node-check"><Check size={13} aria-hidden="true" /></span>
    </div>
  );
}
