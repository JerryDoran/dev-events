'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ExploreButton() {
  return (
    <button
      type='button'
      id='explore-btn'
      onClick={() => console.log('Clicked!')}
      className='mt-7 mx-auto text-xl'
    >
      <Link href='/#events'>
        Explore Events
        <Image
          src='/icons/arrow-down.svg'
          alt='arrow-down'
          width={24}
          height={24}
          className='ml-2'
        />
      </Link>
    </button>
  );
}
