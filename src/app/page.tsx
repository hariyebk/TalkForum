import TopicPostForm from "@/components/topic/TopicPostForm";

export default function Home() {
  return (
    <main className="grid grid-cols-4 gap-4 p-4 mt-5 mx-10">
      <div className="col-span-3">
          <h1 className="text-xl m-2"> Top Posts </h1>
      </div>
      <div>
          <TopicPostForm />
      </div>
    </main>
  )
}
