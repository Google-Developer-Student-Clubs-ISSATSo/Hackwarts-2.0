import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineTitle,
    TimelineIcon,
    TimelineDescription,
    TimelineContent,
    TimelineTime,
  } from "@/components/ui/timeline";
  import { ITimelineElement } from "./timeline-data";
  interface IDayTimeLineProps {
    date: string;
    items: ITimelineElement[];
  }
  export default function DayTimeLine({ date, items }: IDayTimeLineProps) {
      let arr = date.split("/n");
    return (
      <>
        <div className="w-fit">
          <h1 className="text-4xl mb-4 text-center text-harryp">
          {arr[0]}
          <sup>th</sup> {arr[1]}
          </h1>
          <Timeline className="bg-white bg-opacity-10 pl-[5.25rem] md:pl-28 md:pr-12 py-5 rounded-md">
            {items.map((item) => (
              <>
                <TimelineItem key={item.id}>
                  <TimelineConnector className="bg-sunset" />
                  <TimelineHeader>
                    <TimelineTime className="text-rosewood p-2 bg-wheat rounded-sm ">
                      {item.date}
                    </TimelineTime>
                    <TimelineIcon className="bg-sunset" />
                    <TimelineTitle className="text-wheat text-xl font-bold">
                      {item.title}
                    </TimelineTitle>
                  </TimelineHeader>
                  {item.description && (
                    <TimelineContent>
                      <TimelineDescription className="text-white whitespace-pre-wrap">
                        {item.description}
                      </TimelineDescription>
                    </TimelineContent>
                  )}
                </TimelineItem>
              </>
            ))}
          </Timeline>
        </div>
      </>
    );
  }