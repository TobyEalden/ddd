import { useSnackbar } from "react-simple-snackbar";

export function useSuccessSnack() {
  return useSnackbar({
    style: {
      color: "white",
      fontWeight: "bold",
      backgroundColor: "#4caf50",
    },
  });
}

export function useErrorSnack() {
  return useSnackbar({
    style: {
      color: "white",
      fontWeight: "bold",
      backgroundColor: "#f44336",
    },
  });
}

export function useSnacks() {
  return [useSuccessSnack()[0], useErrorSnack()[0]];
}
