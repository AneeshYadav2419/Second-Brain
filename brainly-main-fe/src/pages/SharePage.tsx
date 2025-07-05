import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
import { Card } from "../components/Cards";


export default function SharePage() {
    const [contents, setContents] = useState([]);

    const {shareLink} = useParams();
    console.log(shareLink);


    async function getItem() {
        const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        setContents(res.data.content)
    }
    useEffect(() => {
        getItem();

    }, [])
    return (
        <div className="flex flex-wrap">{contents.map(({ type, link, title }) =>
            <Card
                type={type} link={link} title={title}
            />
        )}</div>
    )
}
