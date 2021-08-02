import {useState} from "react";
import {supabase} from "../util/supabase-client.js";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!email) {
      return setError("Please enter your e-mail address.");
    }

    try {
      setLoading(true);
      const {error} = await supabase.auth.signIn({email});
      if (error) {
        throw error;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-auto flex flex-col justify-center items-center">
      <div className="w-2/4 shadow-md bg-gray-800 p-4 rounded-lg flex flex-col items-end">
        <div className="w-full flex justify-start mb-8">
          <span className="uppercase font-bold text-pink-400">Sign In</span>
        </div>
        <span className="w-full text-white">E-mail address</span>
        <input
          autoFocus={true}
          className="w-full flex-auto border-black rounded p-2"
          type="text"
          placeholder="your e-mail address"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input className="m-4 mr-0 p-2 rounded-lg bg-pink-400" type="button" value="sign in" onClick={handleSignIn} />
        {error && <div className="flex-grow flex justify-center bg-red-600 rounded text-white p-4 m-4">{error}</div>}
      </div>
    </div>
  );
}
