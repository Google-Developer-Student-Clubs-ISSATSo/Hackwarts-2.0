import DayTimeLine from "./day-timeline";
import { timelineDataDay1, timelineDataDay2 } from "./timeline-data";

export default function AboutPage() {
  
  return (
    <>
      <main className=" min-h-screen flex  justify-center flex-wrap md:flex-nowrap gap-4 md:gap-8    p-4  lg:px-24  ">
       <DayTimeLine items={timelineDataDay1} date="14/n December 2024" />
       <DayTimeLine items={timelineDataDay2} date="15/n December 2024" />
      </main>
    </>
  );
}
