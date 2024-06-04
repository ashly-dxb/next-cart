// "use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../../container.module.css";
// import { auth, signIn, signOut } from "../../auth";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

import links from "../../lib/menulinks";

// import { useSession, SessionProvider } from "next-auth/react";

function SignOut() {
  return (
    <form action={() => {}}>
      <button type="submit">Sign out</button>
    </form>
  );
}

export default function Navbar({ session }) {
  // const session = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  // const session = await auth();
  // const session = {};
  // const { session } = useSession();

  return (
    <div className=" flex justify-between items-center w-full py-4 text-white bg-black">
      <div className="text-2xl font-signature ml-2">
        <a href="#" className="no-underline text-white">
          My-Tech-Blog
        </a>
        {/* {session?.user?.name} */}

        <span className="px-8">
          {session?.user ? (
            <div>
              {session.user.name && session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={32}
                  height={32}
                />
              )}
              logout
              <SignOut />
            </div>
          ) : (
            <Link href="/api/auth/signin">
              <button variant="link">Sign in</button>
            </Link>
          )}
        </span>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, text }) => (
          <li
            key={id}
            className="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
          >
            <Link
              href={link}
              className={`no-underline text-white hover:text-white-700 ${
                pathname === link
                  ? " px-3 py-1 rounded text-white border-blue-500 border-1 font-semibold"
                  : ""
              }`}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer z-10 text-gray-500 md:hidden"
      >
        <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
          {isOpen ? (
            <path
              fillRule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          )}
        </svg>
      </div>

      {isOpen && (
        <ul
          className={`flex flex-col justify-top items-center absolute top-0 left-0 px-2 w-full h-screen bg-gradient-to-b from-black to-gray-500 ${styles.smallScreenNavMenu}`}
        >
          {links.map(({ id, link, text }) => (
            <li
              key={id}
              className="flex flex-row pl-3 py-6 sm:mt-0 w-full shrink-0 hover:bg-gray-900"
            >
              <Link
                href={link}
                onClick={() => setIsOpen(!isOpen)}
                className={`text-3xl no-underline text-white hover:text-blue-100 w-full shrink-0 ${
                  pathname === link
                    ? "bg-yellow-600 py-2 px-2 rounded text-white font-bold w-full shrink-0"
                    : ""
                }`}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
