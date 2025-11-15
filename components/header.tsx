import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href='/' className='logo'>
          <Image src='/icons/logo.png' alt='logo' width={24} height={24} />
          <p className=''>DevEvent</p>
        </Link>
        <ul>
          <Link href='/'>Home</Link>
          <Link href='/events'>Events</Link>
          <Link href='/create'>Create Event</Link>
        </ul>
      </nav>
    </header>
  );
}
