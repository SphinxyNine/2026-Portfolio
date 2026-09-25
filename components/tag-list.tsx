export function TagList({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <ul className="tag-list" aria-label="Tools and technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
