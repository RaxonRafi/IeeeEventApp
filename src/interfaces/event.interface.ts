export interface IHighlight {
  id: number;
  text: string;
  eventId: number;
  event?: IEvent;
}
export interface ISpeaker {
  id: number;
  name: string;
  title: string;
  imageUrl?: string;
  eventId: number;
  event?: IEvent;
}
export interface IAgendaItem {
  id: number;
  startTime: string;
  endTime: string;
  topic: string;
  eventId: number;
  event?: IEvent;
}
export interface ITag {
  id: number;
  name: string;
  events: IEvent[];
}


export interface IEvent {
  title: string;
  subtitle?: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  venue: string;
  attendeesCount: number;
  prerequisites?: string;
  registrationFee: string;
  tags: ITag[];
  highlights: IHighlight[];
  speakers: ISpeaker[];
  agendaItems: IAgendaItem[];
  createdAt: Date;
  updatedAt: Date;
}
