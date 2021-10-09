import 'bootstrap/dist/css/bootstrap.css'
import 'react-notifications/lib/notifications.css';
import { useEffect, useState } from 'react';
import { NotificationContainer } from 'react-notifications';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("Detecting Metamask...");

  useEffect(() => {
    if (window.ethereum) {
      setLoading(false);
    }
    else {
      setMsg("Please install metamask to use this Dapp");
    }
  }, []);

  return (
    <>
      {loading ? <div>{msg}</div> : <Component {...pageProps} />}
      <NotificationContainer/>
    </>
  )
}

export default MyApp;
