'use client';

import PresentationContainer from '@/components/PresentationContainer';
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
import Slide12 from '@/components/slides/Slide12';

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
  Slide12,
];

export default function Home() {
  return <PresentationContainer slides={slides} />;
}
