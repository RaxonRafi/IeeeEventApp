# IEEE Event App

A Node.js/Express.js application for managing IEEE events with user authentication, event management, and blog functionality.

## 🚀 Features

- User authentication and authorization with JWT
- Event management (CRUD operations)
- Blog system with comments, likes, and dislikes
- Role-based access control (admin, moderator, member)
- Database integration with Prisma ORM
- TypeScript support
- Input validation with Zod

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) database server
- [Git](https://git-scm.com/)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RaxonRafi/IeeeEventApp.git
   cd IeeeEventApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Database Configuration
   DATABASE_URL="mysql://username:password@localhost:3306/ieee_event_db"
   
   # Server Configuration
   PORT=3000
   
   # JWT Configuration
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   ```

   **Note**: Replace the database connection details with your actual MySQL credentials:
   - `username`: Your MySQL username
   - `password`: Your MySQL password
   - `localhost:3306`: Your MySQL host and port
   - `ieee_event_db`: Your database name

## 🗄️ Database Setup

### Option 1: Local MySQL Database

1. **Create a MySQL database**
   ```sql
   CREATE DATABASE ieee_event_db;
   ```

2. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev
   ```

3. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

### Option 2: Using Prisma Studio (Visual Database Management)

1. **Open Prisma Studio**
   ```bash
   npx prisma studio
   ```
   This will open a web interface at `http://localhost:5555` where you can view and manage your database.

### Database Schema

The application uses the following main models:
- **Users**: User accounts with roles (admin, moderator, member)
- **Event**: Event information with details, speakers, agenda, etc.
- **Blog**: Blog posts with content management
- **Comment**: Comments on blog posts
- **Like/Dislike**: User interactions with blog posts

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server with hot-reload using `ts-node-dev`. The server will run on `http://localhost:3000` (or the PORT specified in your `.env` file).

### Production Mode

1. **Build the TypeScript code**
   ```bash
   npx tsc
   ```

2. **Start the server**
   ```bash
   node dist/server.js
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma client
- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma migrate reset` - Reset database and run all migrations

## 📁 Project Structure

```
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma      # Database schema definition
│   └── migrations/        # Database migration files
├── src/
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── interfaces/        # TypeScript interfaces
│   ├── middlewares/       # Express middlewares
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── validations/      # Input validation schemas
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/:id` - Get blog by ID
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

## 🧪 Testing

Currently, no tests are configured. To add tests:

1. Install testing dependencies:
   ```bash
   npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
   ```

2. Add test scripts to `package.json`:
   ```json
   "scripts": {
     "test": "jest",
     "test:watch": "jest --watch"
   }
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify your MySQL server is running
   - Check DATABASE_URL in `.env` file
   - Ensure the database exists

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill the process using the port: `netstat -ano | findstr :3000`

3. **Prisma Client Error**
   - Run `npx prisma generate` to regenerate the client
   - Ensure migrations are up to date: `npx prisma migrate dev`

4. **Environment Variables Not Loaded**
   - Verify `.env` file is in the root directory
   - Check that all required variables are set
   - Restart the development server

### Migration Issues

If you encounter migration issues:

```bash
# Reset database and migrations
npx prisma migrate reset

# Deploy migrations
npx prisma migrate dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Happy Coding! 🚀**