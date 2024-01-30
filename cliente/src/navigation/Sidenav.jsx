import React from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import axios from 'axios';
import { useUserContext } from "../features/userContext";

function Sidenav() {
    const { user, logoutUser } = useUserContext();

    const handleLogout = async() => {
        try {
            await axios.post('http://localhost:3030/users/logout');
            logoutUser();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    // Verifica si 'user' es no nulo antes de acceder a sus propiedades
    const username = user ? user.username : "Anónimo"; 
    const firstLetter = username ? username.charAt(0).toUpperCase() : "";

    return (
        <div className="sidenav">
            <img className="sidenav__logo"
                src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
                alt="Instagram Logo" />

            <div className="sidenav__buttons">
                <button className="sidenav__button">
                    <HomeIcon />
                    <span>Home</span>
                </button>

                <button className="sidenav__button">
                    <SearchIcon />
                    <span>Search</span>
                </button>

                <button className="sidenav__button">
                    <ExploreIcon />
                    <span>Explore</span>
                </button>

                <button className="sidenav__button">
                    <SlideshowIcon />
                    <span>Reels</span>
                </button>

                <button className="sidenav__button">
                    <ChatIcon />
                    <span>Messages</span>
                </button>

                <button className="sidenav__button">
                    <FavoriteBorderIcon />
                    <span>Notifications</span>
                </button>

                <button className="sidenav__button">
                    <AddCircleOutlineIcon />
                    <span>Create</span>
                </button>

                <button className="sidenav__button">
                    <Avatar>
                        {user.username ? user.username.charAt(0).toUpperCase() : "A"}
                    </Avatar>
                <span>{user.username}{" "}</span>
                <button onClick={handleLogout} className="logout__button">Logout</button>
                </button>
            </div>

            <div className="sidenav__more">
                <button className="sidenav__button">
                    <MenuIcon />
                    <span className="sidenav__buttonText">More</span>
                </button>
            </div>
        </div>
    );
}

export default Sidenav;