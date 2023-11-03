import {
  FormControl,
  FormLabel,
  Input,
  Link,
  Sheet,
  Typography,
} from "@mui/joy";
import "./App.css";
import Button from "@mui/joy/Button";
import { CssVarsProvider } from "@mui/joy/styles";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
function App() {
  return <RouterProvider router={router} />;
}

export default App;
