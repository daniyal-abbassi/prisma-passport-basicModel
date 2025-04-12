# File Uploader - (TOP)

[![Node.js 20.x](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)](https://nodejs.org/en/blog/release/v20.0.0)
[![Express 5.1.0](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)](https://expressjs.com/en/changelog/5x.html)
[![Prisma 6.5.0](https://img.shields.io/badge/Prisma-6.5.0-2D3748?logo=prisma)](https://www.prisma.io/docs)
[![PostgreSQL 15+](https://img.shields.io/badge/PostgreSQL-15+-336791?logo=postgresql)](https://www.postgresql.org/docs/15/)
[![Passport.js 0.7.0](https://img.shields.io/badge/Passport.js-0.7.0-34E27A?logo=passport)](http://www.passportjs.org/docs/)
[![EJS 3.1.10](https://img.shields.io/badge/EJS-3.1.10-A91E50?logo=ejs)](https://ejs.co/#docs)
[![Tailwind CSS 4.1.3](https://img.shields.io/badge/Tailwind_CSS-4.1.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/docs)
[![Cloudinary 2.6.0](https://img.shields.io/badge/Cloudinary-2.6.0-3448C5?logo=cloudinary)](https://cloudinary.com/documentation)

![App Screenshot](/public/images/logIn.png)
![App Screenshot](/public/images/files.png)
![App Screenshot](/public/images/filestwo.png)


A secure cloud storage solution inspired by Google Drive, built with Node.js, Express, and Prisma. This application allows users to upload, organize, and share files with others.

## Features

- **User Authentication**: Secure session-based auth using Passport.js
- **File Management**: Upload, view, and download files
- **Folder System**: Create, organize, and manage folders
- **Cloud Storage**: Files stored in Cloudinary for reliability
- **Sharing**: Generate shareable links.
- **Responsive UI**: Built with Tailwind CSS for all devices - (Pre-components)

## Technologies Used

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Passport.js (Local Strategy)
- Multer (File upload handling)
- Cloudinary (Cloud storage)

### Frontend
- EJS Templates
- Tailwind CSS
- JavaScript

### DevOps
- Session storage with Prisma Session Store
- Environment variables via dotenv