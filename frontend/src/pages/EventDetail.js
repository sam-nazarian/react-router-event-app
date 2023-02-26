import { useRouteLoaderData, json, redirect } from 'react-router-dom'; //useLoaderData
import EventItem from '../components/EventItem';

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');

  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function loader({ request, params }) {
  // request.url //could be used to extract query parameters
  const id = params.eventId;

  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json({ message: 'Could not fetch details for selected event. (EVENT DETAIL)' }, { status: 500 });
  } else {
    return response;
  }
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
