import Image from 'next/image';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function EventDetailItem({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) {
  return (
    <div className='flex-row-gap-2 items-center'>
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
}

function EventAgenda({ agendaItems }: { agendaItems: string[] }) {
  return (
    <div className='agenda'>
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      description,
      agenda,
      title,
      image,
      overview,
      location,
      date,
      time,
      mode,
      audience,
      organizer,
      tags,
    },
  } = await request.json();

  if (!description) return notFound();
  return (
    <section id='event'>
      <div className='header'>
        <h1>Event Description</h1>
        <p className=''>{description}</p>
      </div>
      <div className='details'>
        {/* Event content */}
        <div className='content'>
          <Image
            src={image}
            alt={title}
            width={800}
            height={800}
            className='banner'
          />
          <section className='flex-col-gap-2'>
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section className='flex-col-gap-2'>
            <h2>Event Details</h2>
            <EventDetailItem
              icon='/icons/calendar.svg'
              alt='date'
              label={date}
            />
            <EventDetailItem icon='/icons/clock.svg' alt='time' label={time} />
            <EventDetailItem icon='/icons/pin.svg' alt='pin' label={location} />
            <EventDetailItem icon='/icons/mode.svg' alt='mode' label={mode} />
            <EventDetailItem
              icon='/icons/audience.svg'
              alt='audience'
              label={audience}
            />
          </section>
          <EventAgenda agendaItems={JSON.parse(agenda[0])} />
          <section className='flex-col-gap-2'>
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
        </div>
        {/* Booking form */}
        <aside className='booking'>
          <p className='text-lg font-semibold'>Book Event</p>
        </aside>
      </div>
    </section>
  );
}
