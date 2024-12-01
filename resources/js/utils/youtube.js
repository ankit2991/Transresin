export const createYT_Thumb = (videoUrl) => {
  const videoIdMatch = videoUrl.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
  );
  if (videoIdMatch) {
    const videoId = videoIdMatch[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } else {
    alert("Invalid YouTube URL");
  }
};
