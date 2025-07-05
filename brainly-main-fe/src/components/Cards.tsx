import { XEmbed } from "react-social-media-embed";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  function getYouTubeEmbedLink(link: string): string {
    try {
      const url = new URL(link);

      if (url.hostname === "youtu.be") {
        const videoId = url.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (url.hostname.includes("youtube.com")) {
        const videoId = url.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }

      return "";
    } catch {
      return "";
    }
  }

  let ytLink = "";
  if (type === "youtube") {
    ytLink = getYouTubeEmbedLink(link);
  }

  return (
  <div className="p-4 bg-white rounded-xl border border-gray-200 w-80 h-[320px] flex flex-col shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center text-md flex-1 min-w-0">
        <div className="text-gray-500 pr-2 flex-shrink-0">
          <ShareIcon />
        </div>
        <span className="truncate">{title}</span>
      </div>
      <div className="flex items-center flex-shrink-0 ml-2">
        <div className="pr-2 text-gray-500">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ShareIcon />
          </a>
        </div>
        <div className="text-gray-500">
          <ShareIcon />
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-hidden">
      {type === "youtube" && (
        <iframe
          className="w-full h-full rounded-md"
          src={ytLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}

      {type === "twitter" && (
        <div className="h-full overflow-auto border rounded-md bg-gray-50 p-2">
          <XEmbed url={link} />
        </div>
      )}
    </div>
  </div>
);

}
