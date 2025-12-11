# Ticket Booking Frontend

A React TypeScript application for booking tickets/seats for shows and trips.

## Environment Setup

Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:4000
```

## Installation

```bash
npm install
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Pages

- `/` - List all available shows/trips
- `/admin` - Admin dashboard (create and manage shows)
- `/booking/:id` - Booking page with seat selection

## Features

- View available shows/trips
- Admin panel to create and manage shows
- Interactive seat selection grid
- Booking confirmation system
- User and Admin authentication

## Tech Stack

- React 18
- TypeScript
- React Router DOM
- Axios
- React Context API
