import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { YouTubeEmbed } from 'react-social-media-embed';
import { YouTube } from "../icons/Youtube";
import { TwitterIcon } from "../icons/TwitterIcon";
import { ContentIcon } from "../icons/ContentIcon";
import axios from "axios";
import { useState, useEffect } from "react";
import TweetEmbed from 'react-tweet-embed';
import { NoteIcon } from "../icons/NoteIcon";



// Define types for the props
interface CardProps {
  title: string;
  link?: string;
  description: string;
  type: "youtube" | "twitter" | "content" | "note";
}

// Define types for the API response
interface PreviewData {
  title?: string;
  ogp?: {
    "og:image"?: string[];
    "og:title"?: string[];
    "og:description"?: string[];
  };
  seo?: {
    description?: string[];
  };
}

export function Card({ title, link, description, type }: CardProps) {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch link preview data
  const fetchPreview = async (url: string) => {
    const options = {
      method: "GET",
      url: "https://link-preview4.p.rapidapi.com/",
      params: {
        url: url,
        oembed: "false",
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_LINK_API,
        "x-rapidapi-host": "link-preview4.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setPreviewData(response.data);
    } catch (error) {
      console.error("Error fetching link preview:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch link preview data for "content" type
    if (type === "content") {
      if(link)
        fetchPreview(link);
    }
  }, [link, type]);

  return (
    <div className="bg-white rounded-md shadow-sm border-1 p-2 border-slate-100 max-h-100 overflow-auto min-w-84">
      {/* Header Section */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {type === "youtube" && <YouTube />}
          {type === "twitter" && <TwitterIcon />}
          {type === "content" && <ContentIcon />}
          {type === "note" && <NoteIcon />}
          <div className="font-medium text-gray-900">{title}</div>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <ShareIcon size="md" />
          <DeleteIcon size="md" />
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-4">
        {type === "youtube" && (
          <div>
            <YouTubeEmbed url={link || "null"} width={320} height={160} />
            <h1 className="pt-4">Your Note - </h1>
            <p className="text-sm text-gray-600 break-words">
                      {description}
            </p>
          </div>
        )}
        {type === "twitter" && (
          <div>
            {link && <TweetEmbed tweetId={link.split("/").pop()!} />}
            <h1 className="pt-4">Your Note - </h1>
            <p className="text-sm text-gray-600 break-words">
              {description}
            </p>
          </div>
        )}
        {type === "note" && (
          <div className="mt-3 p-4 h-fit">
            <h1 className="text-2xl font-semibold text-purple-900 mb-4">Your Note</h1>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-base break-words leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        )}
        {type === "content" && (
          <div className="overflow-hidden break-words max-w-74">
            {loading ? (
              <div className="p-4 text-center text-gray-600">Loading preview...</div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                {/* Preview Image */}
                {previewData?.ogp?.["og:image"]?.[0] && (
                  <img
                    src={previewData.ogp["og:image"][0]}
                    alt={previewData.ogp["og:title"]?.[0] || "Preview"}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                )}

                {/* Preview Title and Description */}
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {previewData?.ogp?.["og:title"]?.[0] || title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {previewData?.ogp?.["og:description"]?.[0] ||
                      previewData?.seo?.description?.[0] ||
                      "No Link Data"}
                  </p>
                </div>

                {/* Visit Link Button */}
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-blue-600 hover:underline mt-2"
                >
                  Visit Link
                </a>
                <h1>Your Note - </h1>
                <p className="text-sm text-gray-600 break-words">
                    {description}
                </p>

              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}