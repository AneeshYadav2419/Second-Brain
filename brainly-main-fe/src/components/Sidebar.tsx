import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

import { Logo } from "../icons/Logo";
import { Button } from "./Button";

export function Sidebar({setType}){
    return <div className="h-screen bg-white border-r w-56 fixed
    left-0 top- pl-4">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <Logo />
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
          <Button variant="normal"
          text="All Contents" onClick={
            ()=>{setType("All")}
          }></Button>

           <Button variant="normal"
          text="Twitter" onClick={
            ()=>{setType("twitter")}
          } startIcon={<TwitterIcon/>}></Button>

           <Button variant="normal"
          text="Youtube" onClick={
            ()=>{setType("youtube")}
          } startIcon={<YoutubeIcon/>}></Button>

        </div>
    </div>
}