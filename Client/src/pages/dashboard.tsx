
import { useEffect, useContext } from 'react'
import { ButtonPair } from '../components/ButtonPair'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/Sidebar'
import useContent from '../hooks/useContent'
import { useNavigate } from 'react-router-dom'
import { StateContext } from '../Context API/StateContext'

function Dashboard() {
  const {setModal, isDashboard, isTwitter, isContent, isYoutube, isNote} = useContext(StateContext)
  const contents = useContent();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (!token) {
      alert("You need to login in order to access")
      navigate('/signin');
    }
  }, [token, navigate]);


  return <div className='flex bg-[#F9FBFC]'>
    
    <Sidebar/>
    <div className=' flex flex-col ml-10 mr-15 w-full'>
      <div className='flex justify-between items-center mt-10 mb-14'>
        <h1 className=' text-4xl'>All Notes</h1>
        <ButtonPair calling = {() => setModal(true)}/>
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-evenly flex-wrap pb-2'>
        {isDashboard && (
          contents.length === 0 ? (
            <p className=' text-3xl'>Sorry! No contents yet...</p> 
            ) : (
              contents.map(({ title, link, description, type }, index) => (
                <Card key={index} description={description} title={title} link={link} type={type} />
              ))
            )
          )}

          {isTwitter && (
            contents.filter(({ type }) => type === "twitter").length === 0 ? (
              <p className=' text-3xl'>Sorry! No contents yet...</p> 
            ) : (
              contents
                .filter(({ type }) => type === "twitter")
                .map(({ title, link, description, type }, index) => (
                  <Card key={index} description={description} title={title} link={link} type={type} />
                ))
            )
          )}

          {isContent && (
            contents.filter(({ type }) => type === "content").length === 0 ? (
              <p className=' text-3xl'>Sorry! No contents yet...</p> 
            ) : (
              contents
                .filter(({ type }) => type === "content")
                .map(({ title, link, description, type }, index) => (
                  <Card key={index} description={description} title={title} link={link} type={type} />
                ))
            )
          )}

          {isYoutube && (
            contents.filter(({ type }) => type === "youtube").length === 0 ? (
              <p className=' text-3xl'>Sorry! No contents yet...</p> 
            ) : (
              contents
                .filter(({ type }) => type === "youtube")
                .map(({ title, link, description, type }, index) => (
                  <Card key={index} description={description} title={title} link={link} type={type} />
                ))
            )
          )}

          {isNote && (
            contents.filter(({ type }) => type === "note").length === 0 ? (
              <p className=' text-3xl'>Sorry! No contents yet...</p> 
            ) : (
              contents
                .filter(({ type }) => type === "note")
                .map(({ title, description, type }, index) => (
                  <Card key={index} description={description} title={title} type={type} />
                ))
            )
          )}
        </div>
      </div>
      <CreateContentModal/>
    </div>
  </div>
}

export default Dashboard

