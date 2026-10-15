'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Client navigation works on both static hosts; the link also works without JS.
export function RetiredLab() {
  const router = useRouter();
  useEffect(() => { router.replace('/work/'); }, [router]);
  return <div className="page"><h1>Explore the projects</h1><p>This experience has been retired.</p><Link className="inline-link" href="/work/">Continue to projects →</Link></div>;
}
