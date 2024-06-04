import Image from "next/image";
import Logout from "../components/Logout";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import styles from "../../container.module.css";
import Layout from "../components/MyLayout";

const HomePage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/Login");

  return (
    <Layout>
      <div
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer}`}
      >
        <div className="max-w-2xl m-auto mb-8 mt-4 border-0">
          {session?.user?.name && session?.user?.image ? (
            <h3 className={`${styles.pageHeading} text-2xl`}>
              Welcome {session?.user?.name} !
              <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={72}
                height={72}
                className="rounded-full"
              />
            </h3>
          ) : (
            <h3 className="text-3xl my-2">Welcome {session?.user?.email}</h3>
          )}
        </div>

        <Logout />
      </div>
    </Layout>
  );
};

export default HomePage;
