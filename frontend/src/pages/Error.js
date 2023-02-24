import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occured!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    // message = JSON.parse(error.data).message; //convert the string to an object, in order to access the message property
    message = error.data.message; //.json automatically does all the parsing for us
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resouce or page.';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
