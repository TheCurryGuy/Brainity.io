import { useEffect, useContext, useState } from 'react';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { Sidebar } from '../components/Sidebar';
import useContent from '../hooks/useContent';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../Context API/StateContext';
import { Button } from '../components/Button';
import { ShareIcon } from '../icons/ShareIcon';
import { PlusIcon } from '../icons/PlusIcon';
import axios from 'axios';
import ChatBrain from './ChatBrain';

async function ShareBrain() {
  try {
    const response = await axios.post("https://brainity-server.vercel.app/api/v1/brain/share", 
      { share: true }, 
      {
        headers: {
          "token": localStorage.getItem("token")
        }
      }
    );

    const ShareUrl = `https://brainity.vercel.app/share/${response.data.hash}`;
    await navigator.clipboard.writeText(ShareUrl);
    alert("Share link copied to clipboard!");
    return true;
  } catch (error) {
    console.error("Error sharing brain:", error);
    alert("Failed to generate share link.");
    return false;
  }
}

async function deleteShare() {
  try {
    await axios.post("https://brainity-server.vercel.app/api/v1/brain/share", 
      { share: false }, 
      {
        headers: {
          "token": localStorage.getItem("token")
        }
      }
    );
    alert("Shared link deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error deleting share:", error);
    alert("Failed to delete share link.");
    return false;
  }
}

function Dashboard() {
  const { setModal, isDashboard, isTwitter, isContent, isYoutube, isNote, isChat } = useContext(StateContext);
  const contents = useContent();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState<string>('Share Brain');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert("You need to login in order to access");
      navigate('/signin');
    }
  }, [token, navigate]);

  const handleShareButtonClick = async () => {
    if (buttonText === 'Share Brain') {
      const success: boolean = await ShareBrain();
      if (success) {
        setButtonText('Delete Share');
      }
    } else {
      const success: boolean = await deleteShare();
      if (success) {
        setButtonText('Share Brain');
      }
    }
  };

  return (
    <div className='flex bg-[#F9FBFC] min-h-screen'>
      <Sidebar />
      {isChat && 
        <div className='flex max-h-screen flex-col ml-3 mr-3 w-full md:ml-0 md:mr-0'>
          <ChatBrain />
        </div>
      }

      {!isChat && (
        <div className='flex max-h-screen flex-col ml-9 mr-9 md:ml-0 md:mr-0 w-full'>
          <div className='flex justify-between md:flex-row flex-col items-center mt-14 md:mt-10 mb-10 md:mb-14'>
            <h1 className='text-4xl md:mb-0 mb-4 md:ml-10'>All Notes</h1>
            <div className='flex gap-2 md:mr-10'>
              <Button startIcon={<ShareIcon size='lg' />} size='md' variant='secondary' text={buttonText} onClick={handleShareButtonClick}></Button>
              <Button startIcon={<PlusIcon size='lg' />} size='md' variant='primary' text='Add Content' onClick={() => setModal(true)}></Button>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-center flex-wrap pb-2 gap-4 md:gap-8'>
              {isDashboard && (
                contents.length === 0 ? (
                  <p className='text-3xl'>Sorry! No contents yet...</p>
                ) : (
                  contents.map(({ _id, title, link, description, type }, index) => (
                    <Card key={index} _id={_id} description={description} title={title} link={link} type={type} />
                  ))
                )
              )}

              {isTwitter && (
                contents.filter(({ type }) => type === "twitter").length === 0 ? (
                  <p className='text-3xl'>Sorry! No contents yet...</p>
                ) : (
                  contents
                    .filter(({ type }) => type === "twitter")
                    .map(({ _id, title, link, description, type }, index) => (
                      <Card key={index} _id={_id} description={description} title={title} link={link} type={type} />
                    ))
                )
              )}

              {isContent && (
                contents.filter(({ type }) => type === "links").length === 0 ? (
                  <p className='text-3xl'>Sorry! No contents yet...</p>
                ) : (
                  contents
                    .filter(({ type }) => type === "links")
                    .map(({ _id, title, link, description, type }, index) => (
                      <Card key={index} _id={_id} description={description} title={title} link={link} type={type} />
                    ))
                )
              )}

              {isYoutube && (
                contents.filter(({ type }) => type === "youtube").length === 0 ? (
                  <p className='text-3xl'>Sorry! No contents yet...</p>
                ) : (
                  contents
                    .filter(({ type }) => type === "youtube")
                    .map(({ _id, title, link, description, type }, index) => (
                      <Card key={index} _id={_id} description={description} title={title} link={link} type={type} />
                    ))
                )
              )}

              {isNote && (
                contents.filter(({ type }) => type === "note").length === 0 ? (
                  <p className='text-3xl'>Sorry! No contents yet...</p>
                ) : (
                  contents
                    .filter(({ type }) => type === "note")
                    .map(({ _id, title, description, type }, index) => (
                      <Card key={index} _id={_id} description={description} title={title} type={type} />
                    ))
                )
              )}
            </div>
          </div>
          <CreateContentModal />
        </div>
      )}
    </div>
  );
}

export default Dashboard;