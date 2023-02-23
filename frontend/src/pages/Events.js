// You can use useLoaderData() in the element that's assigned to a route AND in all components that might be used inside that element.
import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

// First renders component then after it fetches for the data,
function EventsPage() {
  const data = useLoaderData(); //gets access to closest loader data

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  const events = data.events;

  return <EventsList events={events} />;
}

// Can't use react hooks in the loader function as it's not a react component, however can use any browser API as it's ran on the client-side
export async function loader() {
  const response = await fetch('http://localhost:8080/events213');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    throw { message: 'Could not fetch events.' };
  } else {
    // const resData = await response.json();
    // return resData.events; //resData is an obj wtih events inside of it, events is an arr fo objects
    // const res = new Response('any data', { status: 201 });
    // return res; //data gets extracted from your responses when using useLoaderData()

    return response; //fetch returns a promise that resolves to a response
  }
}

export default EventsPage;
