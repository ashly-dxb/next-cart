"use client";
import { useState } from "react";
import styles from "../../container.module.css";
import Layout from "../components/MyLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import Image from "next/image";
import Logout from "../components/Logout";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { useSession, signIn, signOut } from "next-auth/react";

const CreatePost = () => {
  // const session = await auth();

  // const session = useSession();
  // if (!session?.user) redirect("/Login");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    let errors = {};

    if (!title) {
      errors.title = "Title is required";
    } else if (title.length > 50) {
      errors.title = "Title is too long";
    }

    if (!description) {
      errors.description = "Description is required";
    } else if (description.length > 200) {
      errors.description = "Description is too long";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validateForm();
    if (!isFormValid) {
      return false;
    }

    const formData = {};
    new FormData(document.getElementById("myForm")).forEach(
      (value, key) => (formData[key] = value)
    );

    setLoading(true);

    fetch(`../api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((respData) => {
        toast.success("Post added successfully!", {
          duration: 3000,
          position: "top-right",
        });
        setLoading(false);

        router.replace("/ListPosts"); // redirect to the listing page
        return null; // Render nothing on this page
      });

    // redirect("/posts/ListPosts"); //wont work here
  };

  return (
    <Layout>
      <div
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer}`}
      >
        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto mb-8 mt-4">
          <h3 className={`${styles.pageHeading} text-2xl`}>Add Post</h3>
        </div>

        <form id="myForm" method="post" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
            <div className="col-span-2">
              <label htmlFor="title">Title</label>

              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                autoComplete="off"
                className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                required
                onChange={(e) => setTitle(e.target.value)}
              />

              {errors.title && (
                <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.title}
                </span>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="description">Description</label>

              <textarea
                name="description"
                id="description"
                placeholder="Enter description"
                autoComplete="off"
                className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                rows="8"
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              {errors.description && (
                <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.description}
                </span>
              )}
            </div>

            <div className="col-span-2 text-right">
              <button
                type="submit"
                className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32"
              >
                Add &nbsp;
                <FontAwesomeIcon
                  icon={isLoading ? faSpinner : faRefresh}
                  className="fa spinner"
                  alt="Refresh"
                  title="Refresh"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
