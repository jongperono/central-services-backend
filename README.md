# Central Services Backend

A lightweight and fast backend API built with Hono, TypeScript, and MySQL.

## Tech Stack

- **Hono** - Ultra-fast web framework
- **TypeScript** - Type-safe development
- **MySQL2** - MySQL database client
- **Node.js** - Runtime environment

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=central_services
   DB_PORT=3306
   PORT=3000
   ```

3. **Create database:**
   ```sql
   CREATE DATABASE central_services;
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Root
- `GET /` - API information and available endpoints

### Test APIs
- `GET /api/test` - Simple test endpoint
- `GET /api/test/db` - Test database connection
- `GET /api/test/echo/:message` - Echo message with length
- `POST /api/test/data` - Test POST endpoint (send JSON body)

## Example Usage

### Test basic endpoint:
```bash
curl http://localhost:3000/api/test
```

### Test database connection:
```bash
curl http://localhost:3000/api/test/db
```

### Test echo endpoint:
```bash
curl http://localhost:3000/api/test/echo/hello
```

### Test POST endpoint:
```bash
curl -X POST http://localhost:3000/api/test/data \
  -H "Content-Type: application/json" \
  -d '{"name":"John","age":30}'
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts    # MySQL connection pool
│   ├── routes/
│   │   └── test.ts        # Test API routes
│   └── index.ts           # Main application entry
├── .env                   # Environment variables (create from .env.example)
├── .env.example           # Environment template
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Development

The server will automatically reload when you make changes to the source files thanks to `tsx watch`.

## License

ISC
