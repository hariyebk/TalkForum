import TopicList from "@/components/topic/TopicList";
import TopicPostForm from "@/components/topic/TopicPostForm";
import { Divider } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="grid grid-cols-4 gap-4 p-4 mt-5 mx-10">
      <div className="col-span-3">
          <h1 className="text-xl m-2"> Top Posts </h1>
      </div>
      <div className="border border-slate-500 rounded-lg shadow-md px-5 py-4">
          <TopicPostForm />
          <Divider className="mt-5" />
          <h2 className="text-lg font-bold ml-2 mt-2"> Topics </h2>
          <TopicList />
      </div>
    </main>
  )
}
