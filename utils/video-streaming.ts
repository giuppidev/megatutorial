import path from "path";

export function getVideoPath(videoId: string): string {
  return new URL(
    path.join(
      process.env.NEXT_PUBLIC_VIDEO_STREAMING_LIBRARY_ID || "",
      videoId
    ),
    process.env.NEXT_PUBLIC_VIDEO_STREAMING_BASE_URL
  ).href;
}
