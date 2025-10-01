import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const createEvent = async (payload: any) => {
    return await prisma.event.create({
      data: {
        title: payload.title,
        subtitle: payload.subtitle,
        description: payload.description,
        image_url: payload.image_url,
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
  

const getAllEvents = async (queryParams: any = {}) => {
  const { tags, venue, date, search, limit, offset, page, pageSize } = queryParams;
  
  // Handle pagination - support both offset/limit and page/pageSize patterns
  const take = limit ? parseInt(limit) : (pageSize ? parseInt(pageSize) : undefined);
  const skip = offset ? parseInt(offset) : (page && pageSize ? (parseInt(page) - 1) * parseInt(pageSize) : undefined);
  
  // Build where clause dynamically
  const whereClause: any = {};
  
  // Filter by tags (multiple tags support)
  if (tags) {
    const tagArray = Array.isArray(tags) ? tags : tags.split(',');
    whereClause.tags = {
      some: {
        name: {
          in: tagArray
        }
      }
    };
  }
  
  // Filter by venue
  if (venue) {
    whereClause.venue = {
      contains: venue,
      mode: 'insensitive'
    };
  }
  
  // Filter by date
  if (date) {
    whereClause.date = {
      gte: new Date(date)
    };
  }
  
  // Search in title and description
  if (search) {
    whereClause.OR = [
      {
        title: {
          contains: search,
          mode: 'insensitive'
        }
      },
      {
        description: {
          contains: search,
          mode: 'insensitive'
        }
      }
    ];
  }

  // Get total count for pagination metadata
  const totalCount = await prisma.event.count({
    where: whereClause,
  });

  // Get the actual data
  const events = await prisma.event.findMany({
    where: whereClause,
    include: {
      highlights: true,
      speakers: true,
      agendaItems: true,
      tags: true,
    },
    orderBy: {
      date: "desc",
    },
    take: take,
    skip: skip,
  });

  // Calculate pagination metadata
  const currentPage = page ? parseInt(page) : (skip && take ? Math.floor(skip / take) + 1 : 1);
  const totalPages = take ? Math.ceil(totalCount / take) : 1;
  const hasNextPage = take ? (skip || 0) + take < totalCount : false;
  const hasPrevPage = (skip || 0) > 0;

  return {
    data: events,
    pagination: {
      total: totalCount,
      count: events.length,
      currentPage,
      totalPages,
      hasNextPage,
      hasPrevPage,
      limit: take,
      offset: skip,
    }
  };
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
  // Use a transaction to ensure all related records are deleted properly
  return await prisma.$transaction(async (tx) => {
    // Delete related records first to avoid foreign key constraint violations
    await tx.highlight.deleteMany({
      where: { eventId: id },
    });
    
    await tx.speaker.deleteMany({
      where: { eventId: id },
    });
    
    await tx.agendaItem.deleteMany({
      where: { eventId: id },
    });
    
    // Disconnect tags (many-to-many relationship)
    await tx.event.update({
      where: { id },
      data: {
        tags: {
          set: [], // Remove all tag connections
        },
      },
    });
    
    // Finally delete the event
    return await tx.event.delete({
      where: { id },
    });
  });
};

export const EventService = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
