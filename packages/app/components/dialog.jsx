import {Dialog as ReachDialog} from "@reach/dialog";
import "@reach/dialog/styles.css";

export default function Dialog(props) {
  return <ReachDialog className="p-4 rounded-md w-4/5" {...props} />;
}
