import { z } from "zod";

export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  venue: z.string(),
  attendeesCount: z.number(),
  prerequisites: z.string().optional(),
  registrationFee: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const HighlightSchema = z.object({
  id: z.number(),
  text: z.string(),
  eventId: z.number(),
});
export const SpeakerSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  imageUrl: z.string().url().optional(),
  eventId: z.number(),
});

export const AgendaItemSchema = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  topic: z.string(),
  eventId: z.number(),
});
export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
});
