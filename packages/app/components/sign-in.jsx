import {useState} from "react";
import {supabase} from "../util/supabase-client.js";
import Button from "./button.jsx";
import ErrorPanel from "./error-panel.jsx";
import InfoPanel from "./info-panel.jsx";
import Input from "./input.jsx";
import LoadingPanel from "./loading-panel.jsx";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSignIn = async () => {
    if (!email) {
      return setError("Please enter your e-mail address.");
    }

    try {
      setError("");
      setLoading(true);
      const {error} = await supabase.auth.signIn({email});
      if (error) {
        throw error;
      }
      setEmailSent(true);
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
          <div className="uppercase font-bold text-primary-dark">/ Sign In - Distributed Device Descriptors</div>
        </div>
        {loading && <LoadingPanel>Working...</LoadingPanel>}
        {!loading && !emailSent && (
          <>
            <span className="w-full mb-2">E-mail address</span>
            <Input
              autoFocus={true}
              className="w-full flex-auto"
              type="text"
              placeholder="Enter your e-mail address"
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <Button className="m-4 mr-0 p-2 rounded-lg bg-pink-400" type="button" onClick={handleSignIn}>
              sign in
            </Button>
          </>
        )}
        {!loading && emailSent && (
          <InfoPanel>We have sent you a confirmation e-mail. Please check your inbox at {email}.</InfoPanel>
        )}
        {error && <ErrorPanel>{error}</ErrorPanel>}
      </div>
    </div>
  );
}
