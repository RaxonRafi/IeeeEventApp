// src/controllers/event.controller.ts
import { Request, Response, NextFunction } from "express";
import { EventService } from "../services/event.service";
import { sendResponse } from "../utils/sendResponse";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await EventService.createEvent(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Event created successfully",
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await EventService.getAllEvents(req.query);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Events fetched successfully",
      data: events,
      meta: { total: events.length }
    });
  } catch (err) {
    next(err);
  }
};

const getSingleEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const event = await EventService.getSingleEvent(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Event fetched successfully",
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const event = await EventService.updateEvent(id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Event updated successfully",
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const event = await EventService.deleteEvent(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Event deleted successfully",
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

export const EventController = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
