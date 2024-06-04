"use server";
import { auth, signIn, signOut } from "../auth";

export default async function signout() {
  await signOut();
}
