"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import styles from "../../container.module.css";
import Layout from "../components/MyLayout";
import toast, { Toaster } from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPencilAlt,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";

export default function ListPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);

  const router = useRouter();

  var counter = 0;

  const loadList = () => {
    setLoading(true);

    fetch("/api/posts")
      .then((res) => res.json())
      .then((respData) => {
        setPosts(respData.data);
        setRowCount(respData.rowCount);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleDelete = (postID, event) => {
    event.preventDefault();
    if (!confirm("Are you sure to delete?")) return false;

    setLoading(true);

    fetch(`../api/posts`, {
      method: "DELETE",
      body: JSON.stringify({
        post_id: postID,
      }),
    })
      .then((res) => res.json())
      .then((respData) => {
        toast.success("Post deleted successfully!", {
          duration: 5000,
          position: "bottom-right",
        });
        // notify("Post has been deleted");
        loadList();
        setLoading(false);

        router.replace("/ListPosts"); // redirect to the listing page
        return null; // Render nothing on this page
      });
  };

  const notify = (message) => toast(message);

  // if (isLoading) return <p>Loading...</p>;
  // if (posts === undefined || posts.length < 1) return <p>No posts found</p>;

  return (
    <Layout>
      <div
        className={`bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer}`}
      >
        <div className="flex m-auto mb-8">
          <h3 className={`${styles.pageHeading} text-2xl`}>
            Posts ({rowCount})
          </h3>
        </div>

        <div className="flex border h-25">
          <div className="w-[30%] ">Title</div>
          <div className="w-[20%] max-md:hidden">Description</div>
          <div className="w-[20%] max-md:hidden">Date</div>
          <div className="w-[30%] ">&nbsp;</div>
        </div>

        <Toaster />

        {isLoading ? <p>Loading...</p> : ""}

        {posts &&
          posts.map((item, index) => {
            counter++;
            return (
              <div key={counter} className={`${styles.rowStriped} flex border`}>
                <div className={`w-[30%] ${styles.textEllipsis} `}>
                  {item.title}
                </div>

                <div className={`w-[20%] ${styles.textEllipsis} max-md:hidden`}>
                  {item.description}
                </div>

                <div className="w-[20%] max-md:hidden">
                  {moment(item.createdDate).format("YYYY-MM-DD HH:mm")}
                </div>

                <div className="w-[30%]">
                  <Link
                    href={{
                      pathname: "/ViewPost",
                      query: { postID: item._id },
                    }}
                    className="p-2 outline-none rounded hover-shadow text-success border-0 bg-transparent"
                    aria-label="Details"
                    title="View Details"
                  >
                    <FontAwesomeIcon icon={faBook} />
                  </Link>
                  &nbsp;
                  <Link
                    href={{
                      pathname: "/EditPost",
                      query: { postID: item._id },
                    }}
                    className="p-2 outline-none rounded hover-shadow text-primary border-0 bg-transparent"
                    aria-label="Edit"
                    title="Edit"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Link>
                  &nbsp;
                  <button
                    className="p-2 outline-none rounded hover-shadow text-danger border-0 bg-transparent"
                    aria-label="Delete"
                    title="Delete"
                    onClick={(event) => handleDelete(item._id, event)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
}
