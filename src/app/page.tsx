import { Playground } from "@/components/playground";
import { UrlInput } from "@/components/url-input";
import { DEFAULT_VIDEO_ID } from "@/constants/default-video-id";
import { getVideoData } from "@/utils/get-video-data";

type HomeProps = {
  searchParams: {
    id: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { id } = searchParams;

  const data = await getVideoData(id || DEFAULT_VIDEO_ID);

  return (
    <main className="py-16 flex flex-col items-center">
      <h1 className="font-bold text-4xl text-white mb-16">
        Generate PNG from a Youtube video
      </h1>
      <UrlInput />
      {data && !data.error && <Playground data={data} />}
    </main>
  );
}
