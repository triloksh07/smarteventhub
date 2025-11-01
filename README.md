# Smart Event Hub

A full-stack event management platform that enables administrators to create events, manage participants, and generate certificates with automated email distribution.

## 🎯 Features

- **Event Management**: Create, edit, and manage events with customizable details
- **Participant Registration**: Public registration links for event attendees
- **Certificate Generation**: Automated certificate creation with custom templates
- **Email Distribution**: Automated certificate delivery via email
- **CSV Import/Export**: Bulk participant management
- **Certificate Designer**: Visual editor for certificate customization
- **Admin Dashboard**: Comprehensive event and participant analytics
- **Secure Authentication**: Session-based admin authentication with bcrypt encryption

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **TailwindCSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Express Session** - Session management
- **PDFKit** - PDF generation for certificates
- **Resend** - Email service
- **Multer** - File upload handling
- **Node-cron** - Scheduled jobs
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 📁 Project Structure

```
smarteventhub/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── providers/     # Context providers
│   │   ├── shared/        # Shared components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Backend Express application
    ├── src/
    │   ├── config/        # Database configuration
    │   ├── controllers/   # Route controllers
    │   ├── middleware/    # Custom middleware
    │   ├── models/        # MongoDB models
    │   ├── routes/        # API routes
    │   ├── utils/         # Utility functions
    │   ├── jobs/          # Scheduled jobs
    │   └── index.js       # Server entry point
    ├── uploads/           # File upload directory
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smarteventhub
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Server Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smarteventhub
   SESSION_SECRET=your-secret-key-here
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   
   # Email configuration (Resend)
   RESEND_API_KEY=your-resend-api-key
   ```

2. **Client Environment Variables**
   
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

## 📖 API Endpoints

### Authentication
- `POST /api/auth/signup` - Admin registration
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current admin

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Participants
- `GET /api/participants/:eventId` - List event participants
- `POST /api/participants` - Add participant
- `PUT /api/participants/:id` - Update participant
- `DELETE /api/participants/:id` - Delete participant
- `POST /api/participants/import` - Bulk import via CSV

### Certificates
- `POST /api/certificates/generate` - Generate certificates
- `POST /api/certificates/send` - Send certificates via email
- `GET /api/certificates/:id` - Download certificate

## 🎨 Key Features Explained

### Certificate Designer
The certificate designer allows admins to create custom certificate templates with:
- Drag-and-drop text positioning
- Font customization
- Logo/image uploads
- Real-time preview

### Automated Scheduling
Background jobs handle:
- Scheduled certificate generation
- Automated email sending
- Database cleanup tasks

### Session Management
Secure session handling with:
- MongoDB session store
- HTTP-only cookies
- 7-day session lifetime
- CSRF protection

## 🔒 Security Features

- Helmet.js for HTTP header security
- bcrypt password hashing
- Express session with secure cookies
- CORS configuration
- Input validation and sanitization
- File upload restrictions

## 📦 Building for Production

### Build the client
```bash
cd client
npm run build
```

### Start the production server
```bash
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👥 Authors

- Your Name

## 🐛 Known Issues

- Refer to the Issues section in the repository

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

Built with ❤️ using React and Node.js
