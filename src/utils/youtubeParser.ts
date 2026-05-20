/**
 * Utility to parse all forms of YouTube links and extract the video ID.
 * Supports:
 * - https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * - https://youtu.be/dQw4w9WgXcQ
 * - https://www.youtube.com/embed/dQw4w9WgXcQ
 * - https://youtube.com/shorts/dQw4w9WgXcQ
 */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2] && match[2].length === 11) {
      return match[2];
    }
  } catch (e) {
    console.error("Error parsing YouTube URL:", e);
  }
  return null;
}

/**
 * Returns the automatic high-quality YouTube thumbnail for a video URL.
 */
export function getYouTubeThumbnail(url: string): string {
  const fileId = getYouTubeId(url);
  if (fileId) {
    return `https://img.youtube.com/vi/${fileId}/maxresdefault.jpg`;
  }
  // Return a decent fallback image search
  return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80";
}

/**
 * Returns the standard YouTube embed link with custom security query parameters.
 */
export function getYouTubeEmbedUrl(url: string): string {
  const fileId = getYouTubeId(url);
  if (fileId) {
    return `https://www.youtube.com/embed/${fileId}?rel=0`;
  }
  return url;
}
