import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { StateContext } from "../Context API/StateContext";

export default function useContent(){
    const [contents, setContent] = useState([]);
    const {modalOpen} = useContext(StateContext)
    useEffect(()=> {
        const fetchContent = async () => {
            try{
                axios.get("http://localhost:3000/api/v1/content",{
                    headers: {
                        "token": localStorage.getItem("token")
                    }
                }).then((response) => {
                    setContent(response.data.content)
                }) .catch((e) => {
                    console.error(e);
                })

            }  catch(e){
                console.error(e);
            }
        }
        fetchContent();
        
    }, [modalOpen])
    return contents;
}