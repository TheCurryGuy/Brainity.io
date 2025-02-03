import { BrainIcon } from "../icons/BrainIcon";
import { ContentIcon } from "../icons/ContentIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTube } from "../icons/Youtube";
import { SidebarItem } from "./SidebarItem";
import { StateContext } from "../Context API/StateContext";
import { useContext, useState } from "react";
import { HomeIcon } from "../icons/HomeIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import { NoteIcon } from "../icons/NoteIcon";
import { ChatIcon } from "../icons/ChatIcon";
import {  MenuIcon } from "../icons/MenuIcon";

export const Sidebar = () => {
    const { setYoutube, setNote, setTwitter, setContent, setDashboard, setChat } = useContext(StateContext);
    const Navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    function YoutubeClick() {
        setYoutube(true);
        setTwitter(false);
        setContent(false);
        setNote(false);
        setChat(false);
        setDashboard(false);
        toggleSidebar();
    }

    function TwitterClick() {
        setYoutube(false);
        setTwitter(true);
        setContent(false);
        setNote(false);
        setChat(false);
        setDashboard(false);
        toggleSidebar();
    }

    function ContentClick() {
        setYoutube(false);
        setTwitter(false);
        setContent(true);
        setNote(false);
        setChat(false);
        setDashboard(false);
        toggleSidebar();
    }

    function HomeClick() {
        setYoutube(false);
        setTwitter(false);
        setContent(false);
        setNote(false);
        setChat(false);
        setDashboard(true);
        toggleSidebar();
    }

    function NoteClick() {
        setNote(true);
        setYoutube(false);
        setTwitter(false);
        setContent(false);
        setChat(false);
        setDashboard(false);
        toggleSidebar();
    }

    function ChatClick() {
        setYoutube(false);
        setTwitter(false);
        setContent(false);
        setDashboard(false);
        setChat(true);
        setNote(false);
        toggleSidebar();
    }

    function LogoutClick() {
        localStorage.removeItem("token");
        Navigate("/");
    }

    return (
        <>
            {!isSidebarOpen && <div className="md:hidden fixed top-4 left-4 z-50">
                <div onClick={toggleSidebar} className="p-2 cursor-pointer rounded-lg">
                    <MenuIcon />
                </div>
            </div>}
            <div className={`min-h-screen bg-white border-r min-w-86 flex flex-col p-4 justify-between fixed md:relative transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div>
                    <div className="flex items-center justify-between">
                        <div onClick={() => Navigate("/")} className="text-4xl flex items-center gap-2 cursor-pointer">
                            {<BrainIcon />} Brainity.io
                        </div>
                        <div onClick={toggleSidebar} className="p-2 cursor-pointer rounded-lg md:hidden">
                            <MenuIcon />
                        </div>
                    </div>
                    <div className="pt-10">
                        <SidebarItem onClick={HomeClick} icon={<HomeIcon />} text="Dashboard" />
                        <SidebarItem onClick={YoutubeClick} icon={<YouTube />} text="Youtube" />
                        <SidebarItem onClick={TwitterClick} icon={<TwitterIcon />} text="Twitter" />
                        <SidebarItem onClick={ContentClick} icon={<ContentIcon />} text="Links" />
                        <SidebarItem onClick={NoteClick} icon={<NoteIcon />} text="Notes" />
                        <SidebarItem onClick={ChatClick} icon={<ChatIcon />} text="AI Chat" />
                    </div>
                </div>
                <div className=" mb-6 md:mb-4">
                    <SidebarItem onClick={LogoutClick} icon={<LogoutIcon />} text="Logout" />
                </div>
            </div>
        </>
    );
};