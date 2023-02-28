import { Suspense } from 'react';
import { useRouteLoaderData, json, redirect, defer, Await } from 'react-router-dom'; //useLoaderData
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>{(loadedEvent) => <EventItem event={loadedEvent} />}</Await>
      </Suspense>

      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json({ message: 'Could not fetch details for selected event. (EVENT DETAIL)' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

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

export async function loader({ request, params }) {
  const id = params.eventId;

  // So await is your lever, your switch for controlling which data should be awaited before moving to this page,
  // and which data should be deferred, so where you wanna load the data after moving to the page.
  return defer({
    event: await loadEvent(id), //awaited data, page will only transition/navigate once this fetch is completed
    events: loadEvents(), //deferred data, load data after the page is navigated to / loaded
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete event. (EVENT DETAIL)' }, { status: 500 });
  }

  return redirect('/events');
}
