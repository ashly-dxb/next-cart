// "use client";
// import { SessionProvider } from "next-auth/react";

// const SessionWrapper = ({ children }) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };

// export default SessionWrapper;

"use client"; // tells Next.js to render this component on the client
import { SessionProvider } from "next-auth/react";
export default SessionProvider;
