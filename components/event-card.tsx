import Image from 'next/image';
import Link from 'next/link';

type EventCardProps = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export default function EventCard({
  title,
  image,
  slug,
  location,
  date,
  time,
}: EventCardProps) {
  return (
    <Link href={`/events/${slug}`} id='event-card'>
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className='poster'
      />
      <div className='flex gap-2 items-center'>
        <Image src='/icons/pin.svg' alt='location' width={14} height={14} />
        <p className='text-sm'>{location}</p>
      </div>
      <p className='title'>{title}</p>
      <div className='datetime'>
        <div className='flex gap-2 items-center'>
          <Image src='/icons/calendar.svg' alt='date' width={14} height={14} />
          <p className='text-xs'>{date}</p>
        </div>
        <div className='flex gap-2 items-center'>
          <Image src='/icons/clock.svg' alt='time' width={14} height={14} />
          <p className='text-xs'>{time}</p>
        </div>
      </div>
    </Link>
  );
}
