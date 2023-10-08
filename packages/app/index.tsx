import { createRoot } from "react-dom/client";
const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element not avialable.");
}

const root = createRoot(rootElement);
root.render(<h1>nice</h1>);
