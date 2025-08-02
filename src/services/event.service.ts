import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const createEvent = async (payload: any) => {
    return await prisma.event.create({
      data: {
        title: payload.title,
        subtitle: payload.subtitle,
        description: payload.description,
        date: payload.date,
        startTime: payload.startTime,
        endTime: payload.endTime,
        venue: payload.venue,
        attendeesCount: payload.attendeesCount,
        prerequisites: payload.prerequisites,
        registrationFee: payload.registrationFee,
        highlights: {
          create: payload.highlights, // array of { text: string }
        },
        speakers: {
          create: payload.speakers, // array of { name, title, imageUrl }
        },
        agendaItems: {
          create: payload.agendaItems, // array of { startTime, endTime, topic }
        },
        tags: {
          connectOrCreate: payload.tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        highlights: true,
        speakers: true,
        agendaItems: true,
        tags: true,
      },
    });
  };
  

const getAllEvents = async () => {
  return await prisma.event.findMany({
    include: {
      highlights: true,
      speakers: true,
      agendaItems: true,
      tags: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

const getSingleEvent = async (id: number) => {
  return await prisma.event.findUnique({
    where: { id },
    include: {
      highlights: true,
      speakers: true,
      agendaItems: true,
      tags: true,
    },
  });
};

const updateEvent = async (id: number, payload: any) => {
  return await prisma.event.update({
    where: { id },
    data: payload,
  });
};

const deleteEvent = async (id: number) => {
  return await prisma.event.delete({
    where: { id },
  });
};

export const EventService = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
