# DevCommunity

DevCommunity is a full-stack developer community platform built with Next.js, MongoDB, Mongoose, Auth.js, and Tailwind CSS.

It allows developers to discover technical communities, publish blogs, join discussions, save useful posts, and build public developer profiles.

## Live Demo

https://devcommunity-eta.vercel.app

## Features

- GitHub authentication with Auth.js
- Google authentication with Auth.js
- Email/password registration and login
- Public developer profiles
- Profile settings with bio, username, and skills
- Create, edit, and delete blog posts
- Join and leave developer communities
- Search and filter blogs
- Search and filter communities
- Server-side pagination
- Comments on blog posts
- Comment editing and deletion with ownership checks
- Bookmarks
- Personalized dashboard
- Trending topics
- Responsive navigation
- Loading, error, empty, and not-found states
- Server-side validation using Zod
- MongoDB indexes for common queries
- Production deployment with Vercel

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js Route Handlers
- Node.js runtime
- Auth.js
- Zod

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Vercel
- GitHub

## Application Architecture

DevCommunity uses the Next.js App Router.

The application follows a full-stack architecture where frontend and backend logic live inside the same Next.js project.

```text
Browser
   ↓
Next.js Pages / Client Components
   ↓
Server Components / Route Handlers
   ↓
Authentication + Validation
   ↓
Mongoose
   ↓
MongoDB Atlas
