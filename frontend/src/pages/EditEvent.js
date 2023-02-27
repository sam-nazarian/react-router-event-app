import { useRouteLoaderData } from 'react-router-dom'; //useLoaderData

import EventForm from '../components/EventForm';

function EventPage() {
  // const data = useLoaderData(); //highest it looks for is loader is it's current route definition
  const data = useRouteLoaderData('event-detail'); //access data from a higher route

  return <EventForm method="patch" event={data.event} />;
}

export default EventPage;
