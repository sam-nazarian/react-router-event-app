import { Suspense } from 'react';
import { useRouteLoaderData, Await } from 'react-router-dom'; //useLoaderData

import EventForm from '../components/EventForm';

function EventPage() {
  // const data = useLoaderData(); //highest it looks for is loader is it's current route definition
  // const data = useRouteLoaderData('event-detail'); //access data from a higher route
  // return <EventForm method="patch" event={data.event} />;

  const { event } = useRouteLoaderData('event-detail');

  return (
    <Suspense fallback="Loading...">
      <Await resolve={event}>{(loadEventData) => <EventForm event={loadEventData} method="PATCH" />}</Await>
    </Suspense>
  );
}

export default EventPage;
