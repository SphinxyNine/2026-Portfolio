import type { SVGProps } from 'react';

// Brand outlines follow the MIT-licensed Tabler Icons 24px grid.
function BrandIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BrandIcon {...props}>
      <path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" />
      <path d="M16 16v-3a2 2 0 0 0-4 0" />
      <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
    </BrandIcon>
  );
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BrandIcon {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.28 0 6.72-1.61 6.72-7a5.4 5.4 0 0 0-1.5-3.75A5.3 5.3 0 0 0 19.12 0S17.94-.37 15 1.5a12.3 12.3 0 0 0-6 0C6.06-.37 4.88 0 4.88 0a5.3 5.3 0 0 0-.1 3.75A5.4 5.4 0 0 0 3.28 7c0 5.38 3.44 7 6.72 7-.39.49-.68 1.05-.85 1.65A5.2 5.2 0 0 0 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </BrandIcon>
  );
}
