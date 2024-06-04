import { doSocialLogin } from "@/app/actions";

const LoginForm = () => {
  return (
    <div className={`max-w-2xl bg-white py-4 px-5 mt-4 m-auto w-full `}>
      <form action={doSocialLogin}>
        <button
          className="bg-pink-400 text-white p-3 mr-3 rounded-md text-lg"
          type="submit"
          name="action"
          value="google"
        >
          Login with Google
        </button>

        <button
          className="bg-green-400 text-white p-3 mr-3 rounded-md text-lg"
          type="submit"
          name="action"
          value="github"
        >
          Login with GitHub
        </button>

        <button
          className="bg-blue-800 text-white p-3 rounded-md text-lg"
          type="submit"
          name="action"
          value="linkedin"
        >
          Login with LinkedIn
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
