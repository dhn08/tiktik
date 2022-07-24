import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function MyApp({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  if (isSSR) return null;
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT}>
      <ErrorBoundary>
        <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
          <Navbar />
          <div className="flex gap-6 md:gap-20">
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
              <Sidebar />
            </div>
            <div className="mt-4 flex flex-col gap-10 overflow-y-auto h-[88vh] videos flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
