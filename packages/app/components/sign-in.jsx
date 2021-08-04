import {useState} from "react";
import {supabase} from "../util/supabase-client.js";
import Button from "./button.jsx";
import Input from "./input.jsx";

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
      <div className="w-2/4 shadow-md bg-paper p-4 rounded-lg flex flex-col items-end">
        <div className="w-full flex justify-start mb-8">
          <div className="uppercase font-bold text-primary-dark">
            / Distributed Device Descriptors
            <br />/ Sign In
          </div>
        </div>
        <span className="w-full mb-2">E-mail address</span>
        <Input
          autoFocus={true}
          className="w-full flex-auto"
          type="text"
          placeholder="your e-mail address"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <Button className="m-4 mr-0 p-2 rounded-lg bg-pink-400" type="button" onClick={handleSignIn}>
          sign in
        </Button>
        {error && <div className="flex-grow flex justify-center bg-red-600 rounded text-white p-4 m-4">{error}</div>}
      </div>
    </div>
  );
}
