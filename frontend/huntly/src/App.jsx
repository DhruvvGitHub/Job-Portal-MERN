import './App.css'
import AdminJobs from './components/admin/AdminJobs'
import Applicants from './components/admin/Applicants'
import Companies from './components/admin/Companies'
import CompanySetup from './components/admin/CompanySetup'
import CreateCompany from './components/admin/CreateCompany'
import CreateJob from './components/admin/CreateJob'
import ProtectedRoute from './components/admin/ProtectedRoute'
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
        <ProtectedRoute>
        <Companies />
        </ProtectedRoute>
      </Layout>
    )
  },
  {
    path: "admin/companies/create",
    element: (
      <Layout>
        <ProtectedRoute>
        <CreateCompany />
        </ProtectedRoute>
      </Layout>
    )
  },
    {
    path: "admin/companies/:id",
    element: (
      <Layout>
        <ProtectedRoute>
        <CompanySetup />
        </ProtectedRoute>
      </Layout>
    )
  },
  {
    path: "admin/jobs",
    element: (
      <Layout>
                <ProtectedRoute>
        <AdminJobs />
        </ProtectedRoute>
      </Layout>
    )
  },
  {
    path: "admin/jobs/create",
    element: (
      <Layout>
        <ProtectedRoute>
        <CreateJob />
        </ProtectedRoute>
      </Layout>
    )
  },
  {
    path: "admin/jobs/:id/applicants",
    element: (
      <Layout>
                <ProtectedRoute>
        <Applicants />
        </ProtectedRoute>
      </Layout>
    )
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}  />
    </div>
  )
}

export default App;
