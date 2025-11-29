/* eslint-disable @typescript-eslint/no-explicit-any */
import BookEvent from '@/components/book-event';
import EventCard from '@/components/event-card';
import { IEvent } from '@/database';
import { getSimilarEventsBySlug } from '@/database/actions/event.actions';
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

function EventTags({ tags }: { tags: string[] }) {
  return (
    <div className='flex flex-row gap-1.5 flex-wrap'>
      {tags.map((tag, index) => (
        <div key={index} className='pill'>
          {tag}
        </div>
      ))}
    </div>
  );
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
    next: { revalidate: 60 },
  });
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

  const bookings = 10;

  const similarEvents = await getSimilarEventsBySlug(slug);

  // console.log('SIMILAR EVENTS', similarEvents);

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
          <EventAgenda agendaItems={JSON.parse(agenda)} />
          <section className='flex-col-gap-2'>
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags={JSON.parse(tags)} />
        </div>
        {/* Booking form */}
        <aside className='booking'>
          <div className='signup-card'>
            <h2>Book your spot</h2>
            {bookings > 0 ? (
              <p className='text-sm'>
                Join {bookings} people who have already booked their spot
              </p>
            ) : (
              <p className='text-sm'>Be the first to book your spot!</p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
      <div className='flex w-full flex-col gap-4 pt-20'>
        <h2>Similar Events</h2>
        <div className='events'>
          {similarEvents.length > 0 ? (
            similarEvents.map((similarEvent: any) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))
          ) : (
            <p>No similar events found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
