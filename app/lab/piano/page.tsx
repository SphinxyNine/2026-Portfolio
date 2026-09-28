import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { PocketPiano } from '@/components/pocket-piano';

export const metadata: Metadata = {
  title: 'Pocket Keys',
  description: 'Play a one-octave virtual piano in Zy Fausto’s interactive portfolio.',
  alternates: { canonical: '/lab/piano/' },
};

export default function PianoLabPage() {
  return (
    <div className="page lab-page">
      <PageIntro
        eyebrow="Interactive lab"
        title="Pocket Keys"
        description="A small playable instrument built into the portfolio—because the work is technical, but the person behind it is also a musician."
      />
      <PocketPiano />
    </div>
  );
}
