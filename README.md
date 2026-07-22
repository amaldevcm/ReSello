# ReSello

A peer-to-peer marketplace for reselling electronics — think eBay, but scoped to a university community. Students list gear they no longer need and buy from peers on the same campus, instead of shipping through a general marketplace.

Built on the MEAN stack (MongoDB, Express, Angular, Node.js) as a personal upskilling project. Still under active development — see [Features](#features) below for what's implemented so far.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Angular 17, Angular Material, Tailwind CSS |
| Backend | Node.js, Express 4 |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt |
| File storage | AWS S3 (presigned URLs for image upload) |

## Features

**Implemented**
- User registration & login (JWT-based sessions, bcrypt password hashing)
- Buyer/seller roles per user
- Item listings — create, edit, delete, browse, categorize
- Image upload for listings via S3 presigned URLs
- Seller dashboard with listing management and basic sales analytics
- Single-item order placement ("Buy Now"), which marks the item sold

**Not yet implemented**
- Payment processing
- Order history / tracking view
- Reviews & ratings submission
- Buyer–seller messaging
- Notifications
- Wishlist / favorites
- Admin moderation tools
- Password reset & email verification

## Project structure

```
ReSello/
├── Backend/                 # Express API
│   ├── app.js                # entry point, route mounting, S3 endpoints
│   ├── Routes/                # userRoutes, itemRoutes, categoryRoutes, orderRoutes
│   ├── Middleware/auth.js     # JWT verification middleware
│   └── database/
│       ├── mongoose.js        # DB connection
│       └── Models/             # User, Item, Category, Order, Payment, Review
├── Frontend/                 # Angular app
│   └── src/app/
│       ├── accountComponent/   # login / signup
│       ├── homeComponent/      # browse feed, item detail, cart
│       ├── dashboardComponent/ # profile, listings, analytics
│       ├── itemComponent/      # item CRUD views
│       ├── userComponent/      # user CRUD views
│       └── app-common/         # shared CommonService (HTTP, auth state, S3 upload)
```

## Getting started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB database (Atlas or local)
- An AWS S3 bucket (for listing images)

### 1. Clone the repo
```bash
git clone https://github.com/amaldevcm/ReSello.git
cd ReSello
```

### 2. Backend setup
```bash
cd Backend
npm install
```

Create a `Backend/.env` file:
```
NODE_ENV=development
DB_URL=your-mongodb-connection-string
JWT_SECRET=your-jwt-signing-secret
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_BUCKET_NAME=your-s3-bucket-name
AWS_REGION=your-aws-region
```

Run the server:
```bash
node app.js
```
The API listens on `http://localhost:3000` by default.

### 3. Frontend setup
```bash
cd Frontend
npm install
npm start
```
The app serves on `http://localhost:4200` by default and expects the API at the URL configured in `Frontend/src/environments/environment.ts`.

## Available scripts

**Frontend** (`Frontend/`)
| Command | Description |
|---|---|
| `npm start` | Run the dev server (`ng serve`) |
| `npm run build` | Production build |
| `npm test` | Run unit tests |
| `npm run lint` | Lint the codebase |
| `npm run e2e` | Run end-to-end tests |

**Backend** (`Backend/`)
| Command | Description |
|---|---|
| `node app.js` | Start the API server |
