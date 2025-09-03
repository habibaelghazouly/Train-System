# Train System 

A backend for managing train trips , trains and stations.

## Stack
- Node.js / Express
- Prisma (PostgreSQL)
- TypeScript
- Jest + SuperTest (integration & unit tests)

## Project Structure
```
Train-System/
├── controllers/
│   ├── stations.controller.ts
│   ├── trains.controller.ts
│   └── trips.controller.ts
├── routes/
│   └── trips.routes.ts
├── services/
│   ├── stations.service.ts
│   ├── trains.service.ts
│   └── trips.service.ts
├── __tests__/
│   ├── controllers/
│   │   ├── stations.controller.test.ts
│   │   ├── trains.controller.test.ts
│   │   └── trips.controller.test.ts
│   └── services/
│       ├── stations.service.test.ts
│       └── trips.service.test.ts
├── prisma/
│   └── (schema / migrations)
├── Index.ts
├── prisma.ts
├── jest.config.js
├── package.json
└── README.md
```
## Setup
```bash
npm install
npx prisma generate
# (If DB not migrated yet)
npx prisma migrate dev --name init
```

## Environment
Create `.env`:
```
DATABASE_URL="postgresql://user:pass@localhost:5432/rail"
```

## Testing
```bash
# All tests
npm test
# Single file
npx jest __tests__/controllers/trips.controller.test.ts
```

## Available Scripts
- dev: run with nodemon
- test: run jest (ts-jest preset)


## Testing Notes
- Integration tests spy on services.
- Services unit tests mock `../../prisma`.
- Keep response shape consistent (array vs { success, data }).

## Prisma
Update schema:
```bash
npx prisma format
npx prisma migrate dev --name <change>
```
Studio (DB inspect):
```bash
npx prisma studio
```

## Error Handling
- 400: validation / bad id
- 404: entity not found 
- 500: service / DB errors
