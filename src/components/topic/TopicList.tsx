import { Chip } from "@nextui-org/react"
import Link from "next/link"
import paths from "@/path"
import { db } from "@/db"
export default async function TopicList() {
    const topics = await db.topic.findMany()
    if(topics.length === 0){
        return (
            <p>
                No topics created yet
            </p>
        )
    }
    const topicList = topics.map((topic) => {
        return (
            <div key={topic.id} className="mt-5">
                <Link href={paths.topicShow(topic.slug)}>
                    <Chip color="default" size="md" radius="sm"> {topic.slug} </Chip>
                </Link>
            </div>
        )
    })
    
    return (
        <div className="mt-3 ml-5 flex flex-wrap flex-row gap-3">
            {topicList}
        </div>
    )

}
