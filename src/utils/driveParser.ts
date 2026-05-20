/**
 * Utility to parse standard Google Drive sharing URLs and convert them
 * into raw, direct file URLs suited for standard <img> and <video> HTML elements.
 */
export function getDirectDriveUrl(url: string): string {
  if (!url) return '';

  // Return immediately if it's already a direct Unsplash/Mixkit structure or not Google Drive
  if (!url.includes('drive.google.com')) {
    return url;
  }

  try {
    // Extract file ID using regex
    // Formats supported:
    // - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // - https://drive.google.com/open?id=FILE_ID
    // - https://docs.google.com/file/d/FILE_ID/edit
    let fileId = '';
    const matchD = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const matchIdQuery = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (matchD && matchD[1]) {
      fileId = matchD[1];
    } else if (matchIdQuery && matchIdQuery[1]) {
      fileId = matchIdQuery[1];
    }

    if (fileId) {
      // For images, googleusercontent is ultra-fast, bypasses virus scanners and has high reliability:
      // We default to returning the image-optimized link. If it's a known video file, or specified as type,
      // developers can use docs.google.com/uc
      return `https://docs.google.com/uc?export=view&id=${fileId}`;
    }
  } catch (error) {
    console.error('Error parsing Google Drive URL:', error);
  }

  return url;
}

/**
 * Specifically converts Google Drive links to streamable video urls
 */
export function getStreamableVideoUrl(url: string): string {
  if (!url) return '';
  if (!url.includes('drive.google.com')) return url;

  const matchD = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (matchD && matchD[1]) {
    return `https://docs.google.com/uc?export=download&id=${matchD[1]}`;
  }
  return url;
}

/**
 * Checks if a given URL is a Google Drive URL
 */
export function isGoogleDriveUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('drive.google.com');
}

/**
 * Converts Google Drive sharing URL into an embedded preview URL suitable for iframes.
 */
export function getDriveEmbedUrl(url: string): string {
  if (!url) return '';
  
  try {
    let fileId = '';
    const matchD = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const matchIdQuery = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (matchD && matchD[1]) {
      fileId = matchD[1];
    } else if (matchIdQuery && matchIdQuery[1]) {
      fileId = matchIdQuery[1];
    }

    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  } catch (e) {
    console.error('Error generating Google Drive embed URL:', e);
  }
  return url;
}

