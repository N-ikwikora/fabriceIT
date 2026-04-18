import { Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./pages/Profile";
import Messaging from "./pages/Messaging";
import Followers from "./pages/Followers";
import MobileMoney from "./pages/MobileMoney";
import SearchBar from "./components/SearchBar";
import Help from "./components/Help";
import LearnMore from "./pages/LearnMore";
import HelpRequest from "./pages/HelpRequest";
import RequestBox from "./pages/RequestBox";
import VideoPage from "./components/VideoPage";
import Layout from "./components/Layout";
import UsersList from "./pages/UsersList";
import SunAI from "./pages/SunAi";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/home" element={<Layout><Home /> </Layout>}/>
      <Route path="/about" element={<Layout><About /> </Layout>} />
      <Route path="/contact" element={<Layout><Contact /> </Layout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Layout><Profile /> </Layout>} />
      <Route path="/messaging" element={<Layout><Messaging /></Layout>} />
      <Route path="/followers" element={<Layout><Followers /></Layout>} />
        <Route path="/MobileMoney" element={<Layout><MobileMoney /></Layout>} />
          <Route path="/LearnMore" element={<Layout><LearnMore /></Layout>} />
              <Route path="/SearchBar" element={<Layout><SearchBar /></Layout>} />
                 <Route path="/HelpRequest" element={<Layout><HelpRequest /></Layout>} />
                  <Route path="/RequestBox" element={<Layout><RequestBox /></Layout>} />
                  <Route path="/VideoPage" element={<Layout><VideoPage /></Layout>} />
                   <Route path="/Layout" element={<Layout />} />
               <Route path="/Help" element={<Layout><Help /></Layout>} />
               <Route path="/SunAi" element={<SunAI />} />
              <Route path="/AdminPanel" element={<AdminPanel />} />


                  <Route path="/UsersList" element={<Layout><UsersList /></Layout>} />
    </Routes>
  )
}