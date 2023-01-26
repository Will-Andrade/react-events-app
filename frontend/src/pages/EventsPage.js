import { Suspense } from 'react';
import { Await, useLoaderData, json, defer } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {loadedEvents => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents () {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw Response(JSON.stringify({ message: 'Could not fetch events.' }), { 
    //   status: 500 
    // });

    return json({ message: 'Could not fetch events.' }, {
      status: 500
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader () {
  //! I need a promise here!
  return defer({
    events: loadEvents()
  });
};
