// You can use useLoaderData() in the element that's assigned to a route AND in all components that might be used inside that element.
import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

// First renders component then after it fetches for the data,
function EventsPage() {
  const data = useLoaderData(); //gets access to closest loader data
  const events = data.events;

  return <EventsList events={events} />;
}

export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // ...
  } else {
    // const resData = await response.json();
    // return resData.events; //resData is an obj wtih events inside of it, events is an arr fo objects
    // const res = new Response('any data', { status: 201 });
    // return res; //data gets extracted from your responses when using useLoaderData()

    return response; //fetch returns a promise that resolves to a response
  }
}

export default EventsPage;
