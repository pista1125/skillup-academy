import { createRoot } from "react-dom/client";
import * as THREE from "three";
import App from "./App.tsx";
import "./index.css";

// Set global THREE if needed for legacy compatibility, but don't mutate the module
if (typeof window !== 'undefined') {
  (window as any).THREE = THREE;
}

createRoot(document.getElementById("root")!).render(<App />);
