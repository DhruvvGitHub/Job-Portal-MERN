import './App.css'
import Companies from './components/admin/Companies'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Browse from './components/Browse'
import Home from './components/Home'
import JobDescription from './components/JobDescription'
import Jobs from './components/Jobs'
import Profile from './components/Profile'
import Layout from './components/shared/Layout'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    )
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    )
  },
  {
    path: "/jobs",
    element: (
      <Layout>
        <Jobs />
      </Layout>
    )
  },
  {
    path: "/description/:id",
    element: (
      <Layout>
        <JobDescription />
      </Layout>
    )
  },
  {
    path: "/browse",
    element: (
      <Layout>
        <Browse />
      </Layout>
    )
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    )
  },
  // Admin routes starts from here 
  {
    path: "admin/companies",
    element: (
      <Layout>
        <Companies />
      </Layout>
    )
  }
])

function App() {
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App;
