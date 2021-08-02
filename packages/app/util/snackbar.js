import {useSnackbar} from "react-simple-snackbar";

export function useSuccessSnack(message) {
  return useSnackbar({
    style: {
      color: "black",
      backgroundColor: "#4caf50",
    },
  });
}

export function useErrorSnack(messaage) {
  return useSnackbar({
    style: {
      color: "white",
      backgroundColor: "#f44336",
    },
  });
}
