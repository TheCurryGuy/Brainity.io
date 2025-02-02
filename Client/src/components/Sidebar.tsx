import { BrainIcon } from "../icons/BrainIcon"
import { ContentIcon } from "../icons/ContentIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YouTube } from "../icons/Youtube"
import { SidebarItem } from "./SidebarItem"
import { StateContext } from "../Context API/StateContext"
import { useContext } from "react"
import { HomeIcon } from "../icons/HomeIcon"
import { LogoutIcon } from "../icons/LogoutIcon"
import { useNavigate } from "react-router-dom"
import { NoteIcon } from "../icons/NoteIcon"
import { ChatIcon } from "../icons/ChatIcon"

export const Sidebar = () => {
    const { setYoutube, setNote, setTwitter, setContent, setDashboard, setChat} = useContext(StateContext)
    const Navigate = useNavigate();

    function YoutubeClick(){
        setYoutube(true)
        setTwitter(false)
        setContent(false)
        setNote(false)
        setChat(false)
        setDashboard(false)
    }
    function TwitterClick(){
        setYoutube(false)
        setTwitter(true)
        setContent(false)
        setNote(false)
        setChat(false)
        setDashboard(false)

    }
    function ContentClick(){
        setYoutube(false)
        setTwitter(false)
        setContent(true)
        setNote(false)
        setChat(false)
        setDashboard(false)
    }
    function HomeClick(){
        setYoutube(false)
        setTwitter(false)
        setContent(false)
        setNote(false)
        setChat(false)
        setDashboard(true)
        
    }
    function NoteClick(){
        setNote(true)
        setYoutube(false)
        setTwitter(false)
        setContent(false)
        setChat(false)
        setDashboard(false)
    }
    function ChatClick(){
        setYoutube(false)
        setTwitter(false)
        setContent(false)
        setDashboard(false)
        setChat(true)
        setNote(false)
    }
    function LogoutClick(){
        localStorage.removeItem("token")
        Navigate("/")
    }

    return <div className="min-h-screen bg-white border-r min-w-86 flex flex-col p-4 justify-between">
        <div>
            <div className=" text-4xl flex items-center gap-2">{<BrainIcon/>} Brainity.io </div>
            <div className=" pt-10">
                <SidebarItem onClick = {HomeClick} icon={<HomeIcon />} text="Dashboard"/>
                <SidebarItem onClick = {YoutubeClick} icon={<YouTube/>} text="Youtube"/>
                <SidebarItem onClick = {TwitterClick} icon={<TwitterIcon/>} text="Twitter"/>
                <SidebarItem onClick = {ContentClick} icon={<ContentIcon/>} text="Links"/> 
                <SidebarItem onClick = {NoteClick} icon={<NoteIcon/>} text="Notes"/>
                <SidebarItem onClick = {ChatClick} icon={<ChatIcon/>} text=" AI Chat"/>
            </div>
        </div>
        <div className="mb-4">
        <SidebarItem onClick = {LogoutClick} icon={<LogoutIcon/>} text="Logout"/> 
        </div>
    </div>
}