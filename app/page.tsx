import EventCard, { EventCardProps } from '@/components/event-card';
import ExploreButton from '@/components/explore-button';
import { cacheLife } from 'next/cache';
// import posthog from 'posthog-js';

// posthog.capture('my event', { property: 'value' });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function HomePage() {
  'use cache';

  cacheLife('hours'); 
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (
    <section className=''>
      <h1 className='text-center'>
        The Hub for Every Dev <br /> Event That You Can&apos;t Miss
      </h1>
      <p className='text-center mt-5 text-2xl'>
        Hackathons and Conferences all in one place
      </p>
      <ExploreButton />
      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {events &&
            events.length > 0 &&
            events.map((event: EventCardProps) => (
              <li key={event.title} className='list-none'>
                <EventCard key={event.title} {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
