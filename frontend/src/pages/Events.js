import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData(); //gets access to closest loader data

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      {/* the callback function is ran with the fullfield promise when it's fulfilled */}
      <Await resolve={events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({ message: 'Could not fetch events. (ERROR IN EVENTS)' }, { status: 500 }); //json creates a response object, with the data being a json format
  } else {
    // can't return response alone as this will go inside of a defer
    const resData = await response.json();
    return resData.events; //arr of objs
  }
}

export function loader() {
  // render component even if data isn't fully loaded
  return defer({
    // value must be a Promise
    events: loadEvents(), //loadEvents is a promise which eventually will resolve into another value (as every async func is a Promise)
  });
}
