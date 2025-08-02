import express from "express";
import { EventController } from "../controllers/event.controller";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../interfaces/user.interface";

const router = express.Router();

// Public routes
router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getSingleEvent);

// Admin/moderator-only routes
router.post("/", checkAuth(Role.admin,Role.moderator), EventController.createEvent);
router.patch("/:id", checkAuth(Role.admin,Role.moderator), EventController.updateEvent);
router.delete("/:id", checkAuth(Role.admin,Role.moderator), EventController.deleteEvent);

export const EventRoutes = router;
