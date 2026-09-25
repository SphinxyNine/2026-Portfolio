export function DraftBadge({ children = 'Draft content' }: { children?: string }) {
  return <span className="draft-badge">{children}</span>;
}
