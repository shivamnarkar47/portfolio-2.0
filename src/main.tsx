//@ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/Hero.tsx";
import GithubAcc from "./components/GithubAcc.tsx";
import { Octokit } from "octokit";
import ErrorPage from "./components/ErrorPage.tsx";
import  {APIGITHUBKEY}  from "./lib/constant.js"
const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_KEY 
})


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Hero />
      },
      {
        path: "/github",
        element: <GithubAcc />,
        loader: async () => {
          const user = await octokit.request('GET /user',
            {
              headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
            }
          )
          return user
        }
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
