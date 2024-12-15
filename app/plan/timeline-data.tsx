export const timelineDataDay1 = [
  {
    id: 1,
    title: "Check-in",
    date: "2:30pm",
    description: null,
  },
  {
    id: 2,
    title: "Opening Ceromony",
    date: "3:00pm",
    description: null,
  },
  {
    id: 3,
    title: "Workshops",
    date: "3:30pm",
    description: `📋 Project Management: Learn to plan, organize, and execute projects efficiently \n
📣 Pitching: Master the techniques to effectively communicate and present your ideas \n
💡 Design Thinking: Develop innovative solutions with structured, user-focused methodologies`,
  },
  {
    id: 4,
    title: "Break",
    date: "5:00pm",
    description: null,
  },
  {
    id: 5,
    title: "Hackathon Launch",
    date: "8:00pm",
    description: null,
  },
];

export const timelineDataDay2 = [
	{
	  id: 1,
	  title: "Submission",
	  date: "8:00am",
	  description: null,
	},
	{
	  id: 2,
	  title: "Pitching",
	  date: "8:30am",
	  description: null,
	},
	{
	  id: 3,
	  title: "Closing Ceremony",
	  date: "12:00pm",
	  description:null	},
  ];

export type TimelineData = (typeof timelineDataDay1)[number];

export interface ITimelineElement {
  id: number;
  title: string;
  date: string;
  description?: string | undefined | null;
}
