


import { useMemo } from "react";
import { XEmbed } from "react-social-media-embed";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Delete } from "../icons/Delete";
import { TwitterIcon } from "../icons/TwitterIcon";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../config";
import { LinkedIn } from "../icons/LinkedIn";
import { External } from "../icons/External";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "linkedin";
  id: string;
  refresh: () => void;
}

export function Card({ title, link, type, id, refresh }: CardProps) {
  // Stable card height & preview area height
  const CARD_HEIGHT = 300;
  const PREVIEW_HEIGHT = 210;

  // ---- YouTube embed URL ----
  const ytEmbedUrl = useMemo(() => {
    if (type !== "youtube") return "";
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
  }, [type, link]);

  // ---- LinkedIn embed URL ----
  const liEmbedUrl = useMemo(() => {
    if (type !== "linkedin") return "";
    try {
      const url = new URL(link);

      // Already an embed URL?
      if (url.hostname.includes("linkedin.com") && url.pathname.startsWith("/embed/")) {
        return url.toString();
      }

      // Pattern 1: /posts/...-activity-<digits>-...
      // e.g. https://www.linkedin.com/posts/user_some-title-activity-7123456789012345678-abcdef
      const activityMatch = url.pathname.match(/\/posts\/[^/]*-activity-(\d+)/i);
      if (activityMatch?.[1]) {
        const id = activityMatch[1];
        return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}`;
      }

      // Pattern 2: /feed/update/urn:li:(activity|share|ugcPost):<id>
      // e.g. https://www.linkedin.com/feed/update/urn:li:activity:7123456789012345678
      const urnMatch = url.pathname.match(/\/feed\/update\/urn:li:(activity|share|ugcPost):([A-Za-z0-9:-]+)/i);
      if (urnMatch?.[1] && urnMatch?.[2]) {
        const urnType = urnMatch[1];
        const id = urnMatch[2];
        return `https://www.linkedin.com/embed/feed/update/urn:li:${urnType}:${id}`;
      }

      // Pattern 3: some links put the URN in the search part (?update=urn:li:activity:...)
      const updateParam = url.searchParams.get("update");
      if (updateParam && /urn:li:(activity|share|ugcPost):/i.test(updateParam)) {
        return `https://www.linkedin.com/embed/feed/update/${updateParam}`;
      }

      // Fallback: no valid public post pattern
      return "";
    } catch {
      return "";
    }
  }, [type, link]);

  async function handleDelete() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/brain/delete-item`, {
        data: { id },
      });
      toast.success("Item deleted");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Couldn't delete. Please try again.");
    }
  }

  return (
    <div
      className="p-4 bg-white rounded-xl border border-gray-200 w-full flex flex-col shadow-sm"
      style={{ height: CARD_HEIGHT }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3 gap-2">
        <div className="flex items-center text-md flex-1 min-w-0 gap-2">
          <div className="text-gray-500 shrink-0">
            {type === "twitter" && <TwitterIcon />}
            {type === "youtube" && <YoutubeIcon />}
            {type === "linkedin" && <LinkedIn />}
          </div>
          <span className="truncate" title={title}>
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700"
            aria-label="Open in new tab"
            title="Open in new tab"
          >
            <External />
          </a>

          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-600"
            aria-label="Delete"
            title="Delete"
            type="button"
          >
            <Delete />
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div
        className="relative rounded-md bg-gray-50 border overflow-hidden"
        style={{ height: PREVIEW_HEIGHT }}
      >
        {type === "youtube" && ytEmbedUrl && (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={ytEmbedUrl}
            title="YouTube video"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {type === "twitter" && (
          <div className="absolute inset-0 overflow-auto p-2">
            <XEmbed url={link} width="100%" />
          </div>
        )}

        {type === "linkedin" && (
          <>
            {liEmbedUrl ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={liEmbedUrl}
                title="LinkedIn post"
                frameBorder={0}
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 overflow-auto p-3">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:underline"
                >
                  View on LinkedIn
                </a>
                <p className="mt-2 text-xs text-gray-500">
                  (This link may be private or not embeddable.)
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
