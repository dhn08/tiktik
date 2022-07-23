import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  if (isSSR) return null;
  return (
    <SessionProvider session={session}>
      <div>
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-y-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />;
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
