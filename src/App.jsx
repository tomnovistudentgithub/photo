import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import PhotoDetailPage from './pages/PhotoDetailPage';
import TopicPhotos from "./pages/TopicPhotos/TopicPhotos.jsx";
import NavBar from "./components/navigation/NavBar.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Contact from './pages/Contact/Contact.jsx';
import Login from './components/Login/Login.jsx';
import Registration from './components/Registration/Registration.jsx';
import AdminPortal from "./pages/Admin/AdminPortal.jsx";
import './App.css';
import GridPage from "./pages/grid/Gridpage.jsx";
import PinnedPhotosProvider from "./contexts/PinnedPhotosProvider.jsx";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import About from "./pages/About/About.jsx";

function App() {

    const auth = true;


    return (

        <AuthContextProvider>
        <PinnedPhotosProvider>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element=<About /> />
                <Route path="/photo/:id" element={<PhotoDetailPage />} />
                <Route path="/topic/:topicId" element={<TopicPhotos />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/grid" element={<GridPage />} />
                <Route path="/admin" element={auth ? <AdminPortal /> : <Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
        </PinnedPhotosProvider>
        </AuthContextProvider>
    );
}

export default App;