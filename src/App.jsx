import React from "react";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayouts from "./layouts/MainLayouts";
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
    const addJob = async (newJob) => {
        const res = await fetch("/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newJob),
        });
        return;
    };
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayouts />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: "jobs",
                    element: <JobsPage />,
                },
                {
                    path: "job/:id",
                    element: <JobPage />,
                    loader: jobLoader,
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
                {
                    path: "add-job",
                    element: <AddJobPage addJobSubmit={addJob} />,
                },
                {
                    path: "edit-job/:id",
                    element: <EditJobPage />,
                    loader: jobLoader,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
