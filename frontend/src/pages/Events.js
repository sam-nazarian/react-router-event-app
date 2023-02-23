import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

// First renders component then after it fetches for the data,
function EventsPage() {
  const events = useLoaderData(); //gets access to closest loader data

  // console.log(events);

  return <EventsList events={events} />;
}

export default EventsPage;
