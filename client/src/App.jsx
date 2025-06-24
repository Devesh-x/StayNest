import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import About from "./routes/about/about";

function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div style={{ 
      padding: "40px", 
      textAlign: "center",
      backgroundColor: "#fcf5f3",
      minHeight: "calc(100vh - 100px)"
    }}>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Oops! Something went wrong</h1>
      <p style={{ color: "#666" }}>
        {error.message || "An unexpected error occurred"}
      </p>
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "agents",
          element: <div className="comingSoon" style={{
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#fcf5f3",
            minHeight: "calc(100vh - 100px)"
          }}>
            <h1 style={{ marginBottom: "20px", color: "#333" }}>Coming Soon!</h1>
            <p style={{ color: "#666" }}>Our agents page is under construction.</p>
          </div>,
        },
        {
          path: "contact",
          element: <div className="comingSoon" style={{
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#fcf5f3",
            minHeight: "calc(100vh - 100px)"
          }}>
            <h1 style={{ marginBottom: "20px", color: "#333" }}>Coming Soon!</h1>
            <p style={{ color: "#666" }}>Our contact page is under construction.</p>
          </div>,
        },
        {
          path: "list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: ":id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
