const parts = [
  "contentDetails",
  "id",
  "liveStreamingDetails",
  "localizations",
  "player",
  "recordingDetails",
  "snippet",
  "statistics",
  "status",
  "topicDetails",
  // "processingDetails",
  // "suggestions",
  // "fileeDetails",
];

export async function getVideoData(id: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=${parts.join(
        ","
      )}&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data.items.length === 0) {
      return { error: "Couldn't find a video with id " + id };
    }
    return data;
  } catch (err) {
    console.error(err);
  }
}
