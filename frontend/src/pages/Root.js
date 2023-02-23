import { Outlet } from 'react-router-dom'; // {useNavigation}
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  //navigation is used to see the routes transition state, loading is added to the comopnent which is already visible
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />

      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
