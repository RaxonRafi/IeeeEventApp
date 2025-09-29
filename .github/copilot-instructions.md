# IEEE Event App - AI Coding Agent Instructions

## Architecture Overview

This is a **layered Node.js/Express API** for managing IEEE events with strict **role-based access control**. The app follows a **service-controller-route pattern** with Prisma ORM for MySQL database operations.

### Core Patterns

**Service Layer First**: All business logic lives in `/src/services/`. Controllers only handle HTTP concerns and delegate to services.
```typescript
// Controllers delegate to services, never contain business logic
const result = await EventService.createEvent(validatedData);
sendResponse(res, { statusCode: 201, success: true, data: result });
```

**Standardized Response Format**: ALL API responses use `sendResponse()` utility from `/src/utils/sendResponse.ts`:
```typescript
sendResponse(res, {
  statusCode: 200,
  success: true,
  message: "Events retrieved successfully",
  data: events,
  meta: { total: events.length } // Optional pagination metadata
});
```

**Role-Based Authorization**: Use `checkAuth(...roles)` middleware from `/src/middlewares/checkAuth.ts`. Roles: `admin`, `moderator`, `member`.
```typescript
// Only admins can delete events
router.delete('/:id', checkAuth('admin'), EventController.deleteEvent);
```

## Database & Prisma Patterns

**Complex Event Model**: Events have nested relations (speakers, agenda, highlights, tags) - always use Prisma `include` for full data:
```typescript
const event = await prisma.event.findUnique({
  where: { id },
  include: { speakers: true, agendaItems: true, highlights: true, tags: true }
});
```

**User Authentication Flow**: JWT tokens contain email, verified against database in `checkAuth` middleware. User ID and role are injected into `req.user`.

**Validation with Zod**: All input validation uses Zod schemas in `/src/validations/`. Apply via `validateRequest` middleware.

## Development Workflow

**Database Commands** (use these exact commands):
- `npx prisma migrate dev` - Apply schema changes
- `npx prisma studio` - Visual database browser at localhost:5555
- `npx prisma generate` - Regenerate client after schema changes

**Development Server**: `npm run dev` (uses ts-node-dev with hot reload)

**Environment Setup**: Copy `.env.example` to `.env`. Required vars: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`.

## Project-Specific Conventions

**Module Organization**: Each domain (auth, user, event, blog) has its own controller, service, route, and validation files.

**Error Handling**: Services throw Error objects, caught by `error.middleware.ts`. Always include descriptive error messages.

**JWT Integration**: Token verification in `checkAuth` middleware sets `req.user` with `{ id, role, email }`. Services can access authenticated user context.

**Prisma Client**: Single instance per service file. Import as `import { PrismaClient } from '@prisma/client'`.

## Key Files for Understanding

- `/src/routes/index.ts` - Central route configuration showing API structure
- `/src/middlewares/checkAuth.ts` - Authentication/authorization logic
- `/prisma/schema.prisma` - Complete data model with relationships
- `/src/config/env.ts` - Environment variable validation and type safety
- `/src/utils/sendResponse.ts` - Standardized API response format

## Common Tasks

**Adding New Endpoints**: Create controller → service → route → add to `/src/routes/index.ts`

**Database Changes**: Modify `schema.prisma` → run `npx prisma migrate dev --name descriptive_name`

**New Validation**: Add Zod schema to appropriate validation file → use `validateRequest` middleware

**Role Restrictions**: Add `checkAuth('role1', 'role2')` middleware to route definition