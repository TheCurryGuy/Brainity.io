import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { YouTubeEmbed } from 'react-social-media-embed';
import { YouTube } from "../icons/Youtube";
import { TwitterIcon } from "../icons/TwitterIcon";
import { ContentIcon } from "../icons/ContentIcon";
import axios from "axios";
import React,{ useState, useEffect, ErrorInfo } from "react";

// Define types for the props
interface CardProps {
  title: string;
  link: string;
  description: string;
  type: "youtube" | "twitter" | "content";
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

// Error Boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('Error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong while rendering the Twitter embed.</div>;
    }
    return this.props.children;
  }
}

// Twitter Embed Component
const TwitterEmbed = ({ url }: { url: string }) => {
  const [XEmbed, setXEmbed] = useState<React.ComponentType<{ url: string }> | null>(null);

  useEffect(() => {
    import('react-social-media-embed').then((module) => {
      setXEmbed(() => module.XEmbed);
    }).catch((error) => {
      console.error('Failed to load XEmbed:', error);
    });
  }, []);

  if (!XEmbed) {
    return <div>Loading Twitter embed...</div>;
  }

  return (
    <ErrorBoundary>
      <XEmbed url={url} />
    </ErrorBoundary>
  );
};

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
            <TwitterEmbed url={link || "null"} />
            <h1 className="pt-4">Your Note - </h1>
            <p className="text-sm text-gray-600 break-words">
              {description}
            </p>
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