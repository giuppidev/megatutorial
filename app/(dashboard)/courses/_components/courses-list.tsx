import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Database } from "@/types/supabase";
import { VideoPlayer } from "./video-player";

interface CoursesListProps {
  lessons: Database["public"]["Tables"]["lessons"]["Row"][];
}

export const CoursesList = ({ lessons }: CoursesListProps) => {
  return (
    <Accordion type="single" collapsible defaultValue={lessons[0].title}>
      {lessons.map((lesson) => (
        <AccordionItem value={lesson.title} key={lesson.id}>
          <AccordionTrigger>{lesson.title}</AccordionTrigger>
          <AccordionContent>
            <VideoPlayer videoId={lesson.video_id || ""} />
            <span>{lesson.description}</span>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
