import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ({ message, type }) {
  return toast(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1000,
    type: type,
    transition: Slide,
    closeOnClick: true,
    pauseOnHover: false,
    theme: "dark",
  });
}
