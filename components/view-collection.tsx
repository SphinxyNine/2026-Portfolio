'use client';

import { Grid2X2, List } from 'lucide-react';
import { useSyncExternalStore, type ReactNode } from 'react';

type ViewMode = 'grid' | 'list';
const viewChangeEvent = 'portfolio-view-change';

function subscribeToView(callback: () => void) {
  window.addEventListener(viewChangeEvent, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(viewChangeEvent, callback);
    window.removeEventListener('storage', callback);
  };
}

function savedView(storageKey: string): ViewMode {
  const value = window.sessionStorage.getItem(`portfolio-view:${storageKey}`);
  return value === 'list' ? 'list' : 'grid';
}

export function ViewCollection({
  children,
  storageKey,
  countLabel,
}: {
  children: ReactNode;
  storageKey: string;
  countLabel: string;
}) {
  const view = useSyncExternalStore(
    subscribeToView,
    () => savedView(storageKey),
    () => 'grid',
  );

  function selectView(nextView: ViewMode) {
    window.sessionStorage.setItem(`portfolio-view:${storageKey}`, nextView);
    window.dispatchEvent(new Event(viewChangeEvent));
  }

  return (
    <section className="view-collection" data-view={view}>
      <div className="collection-toolbar">
        <p>{countLabel}</p>
        <div className="view-toggle" role="group" aria-label="Choose content layout">
          <button type="button" aria-pressed={view === 'grid'} onClick={() => selectView('grid')}>
            <Grid2X2 size={14} strokeWidth={1.7} aria-hidden="true" /><span>Grid</span>
          </button>
          <button type="button" aria-pressed={view === 'list'} onClick={() => selectView('list')}>
            <List size={15} strokeWidth={1.7} aria-hidden="true" /><span>List</span>
          </button>
        </div>
      </div>
      {children}
    </section>
  );
}
