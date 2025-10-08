'use client';

import PresentationContainer from '@/components/PresentationContainer';
import PlaceholderSlide from '@/components/slides/PlaceholderSlide';
import Slide01 from '@/components/slides/Slide01';
import Slide02 from '@/components/slides/Slide02';
import Slide03 from '@/components/slides/Slide03';
import Slide04 from '@/components/slides/Slide04';
import Slide05 from '@/components/slides/Slide05';
import Slide06 from '@/components/slides/Slide06';
import Slide07 from '@/components/slides/Slide07';
import Slide08 from '@/components/slides/Slide08';
import Slide09 from '@/components/slides/Slide09';
import Slide10 from '@/components/slides/Slide10';
import Slide11 from '@/components/slides/Slide11';
import { SlideProps } from '@/lib/types';

// Create placeholder slide components for testing
const slides = [
  Slide01,
  Slide02,
  Slide03,
  Slide04,
  Slide05,
  Slide06,
  Slide07,
  Slide08,
  Slide09,
  Slide10,
  Slide11,
  (props: SlideProps) => <PlaceholderSlide slideNumber={12} title="Final Checklist" backgroundColor="bg-sage/20" {...props} />,
];

export default function Home() {
  return <PresentationContainer slides={slides} />;
}
