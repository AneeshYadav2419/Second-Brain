
import { useEffect, useState } from 'react'
import '../App.css'
import { Button } from '../components/Button'
import { Card } from '../components/Cards'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const[type,setType] =  useState("All");

  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  useEffect(()=>{
    if(!token){
      navigate("/signin")
    }
  },[])

  let contents :any = [];
  let refresh : any;
  if(token){
      contents = useContent().contents;
      refresh = useContent().refresh;

  }
console.log(contents);



  useEffect(()=>{
    refresh();
  },[modelOpen])

  const filterContent =
  type === "All"? contents : contents.filter((content) => content.type === type)
  console.log(filterContent);
  

  return (
    <div>
      <Sidebar setType = {setType}/>
      <div className='p-4 ml-60 min-h-screen bg-gray-100 '>
        <CreateContentModal open={modelOpen} onClose={() => {
          setModelOpen(false);
        }} />
        <div className='flex justify-end gap-4'>

          <Button onClick={() => {
            setModelOpen(true)
          }} variant='primary' text="Add Content" startIcon={<PlusIcon />}></Button>
          <Button onClick={async () =>{
           const response =  await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              share :true
            },{
              headers:{
                "Authorization":localStorage.getItem("token")
              }
            });
            const shareUrl = `http://localhost:3000/api/v1/brain/${response.data.hash}`;
            alert(shareUrl);
  
          }}
          variant='secondary' text="Share brain" startIcon={<ShareIcon />}></Button>
          <Button   variant='secondary' text="Log Out" onClick={()=>{
            localStorage.clear();
            navigate("/signin")
          }} > 
            
          </Button>

        </div>

        <div className='flex gap-4 flex-wrap'>
          {filterContent.map(({ type, link, title }) =>
            <Card
              type={type} link={link} title={title}
            />
          )}
        </div>
      </div>

    </div>

  )
}

export default Dashboard
