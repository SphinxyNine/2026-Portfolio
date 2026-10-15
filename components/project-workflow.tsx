import { ArrowDown } from 'lucide-react';
import type { WorkflowDiagram } from '@/data/portfolio';

export function ProjectWorkflow({ diagram }: { diagram: WorkflowDiagram }) {
  return (
    <figure className="project-workflow">
      <ol aria-label="Workflow steps">
        {diagram.steps.map((step, index) => (
          <li key={`${index}-${step.label}`}>
            {index > 0 && <ArrowDown size={18} aria-hidden="true" />}
            <div className="project-workflow-step">
              <p>{step.label}</p>
              {!!step.branches?.length && <ul aria-label={`Paths for ${step.label}`}>{step.branches.map((branch) => <li key={branch}>{branch}</li>)}</ul>}
            </div>
          </li>
        ))}
      </ol>
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}
