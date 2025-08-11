# Blogfolio

## About Blogfolio

Blogfolio is a an outlet for me (Anthony "TJ" Allen) to post blogs about my learning experiences in all sorts of knowledge avenues and serves as a means for other curious individuals to follow along as I:
- Learn new coding tools and techniques
- Learn about formal logic
- Do thought experiments with AI
- Try to logic my way into `Faith`
- And all sorts of various ideas

## Formatting and Variable Standards:
1) Import Order:
    * /* Libraries */ - React, external libraries
    * /* Components */ - Internal component imports
    * /* Types */ - Type imports
    * /* Content Imports */ - For content files
    * /* Mock Data */ - For data arrays

2) Styled Components:
    * Properties aligned with first letter of component name
    * Consistent 2-space indentation
    * Proper semicolons

3) Component Structure:
    * /* Main Component */ comment before the main function

    * Consistent spacing and formatting

4) General Formatting:
    * Consistent semicolon usage
    * Proper spacing between sections
    * Clean, readable structure

5) Variable Names:
    * Booleans must have "is", "has", or any other boolean-specific wordage

## Roadmap
# Phase 1: Frontend Foundation (Days 1-12)

## Day 1: Project Setup & Architecture Planning
- [x] Initialize React project with TypeScript (`create-react-app` or Vite)
- [x] Set up project structure and folder organization
- [x] Install and configure CSS-in-JS library (Styled Components or Emotion)
- [x] Set up ESLint, Prettier, and TypeScript configurations
- [x] Set up Git repository and initial commit
- [x] Setup Video Background
- [x] Create `<Layout />` component to standardize global components (ie. Header, Footer) pt1 
- [x] Create rough idea for wireframes (pt 1)

## Day 2: Core Components & Routing
- [x] Install and configure React Router
~- [ ] Create main layout components (Header, Footer, Sidebar)~
- [x] Create skeleton for BlogPage
~- [ ] Expand `<Layout />` component to standardize global components (ie. Header, Footer) pt1~
- [x] Set up basic routing structure (Home, Blog, About, Contact)
- [x] Style core layout components with CSS-in-JS
- [x] Test responsive design basics
- [x] Refine Wireframes to conclude layout of "Home" (pt 2)
- [x] Create the "basic" wireframe for a blog Post card (pt4) 
- [x] Refactor BlogPage
- [x] Refactor BlogCard

## Day 3: Markdown Integration
- [x] Research and choose markdown processor (react-markdown or marked)
- [x] Install markdown dependencies and syntax highlighting
- [x] Create markdown renderer component with TypeScript
- [x] Test markdown rendering with sample content
- [ ] Create BlogHeader
- [ ] Animate it shrinking
- [ ] Add support for code blocks with syntax highlighting
- [ ] Handle markdown metadata (frontmatter parsing)
- [ ] Continue to Refine Wireframes to conclude layout of "Home" (pt 3)

## Day 4: Blog Post Components
- [ ] Somehow fix the video to loop properly
- [ ] Create BlogPost interface and types
- [ ] Build BlogPostCard component for listing view
- [ ] Create BlogPostDetail component for individual posts
- [ ] Implement blog post metadata display (date, author, tags)
- [ ] Style blog components with responsive design
- [ ] Add loading states and error handling

## Day 5: Blog Listing & Navigation
- [x] Create layout for Blog Post Page 
- [ ] Create blog listing page with pagination
- [ ] Implement search functionality (client-side initially)
- [ ] Add filtering by categories/tags
- [ ] Create breadcrumb navigation
- [ ] Add sorting options (date, popularity, alphabetical)
- [ ] Style pagination and filter components

## Day 6: Static Content Management
- [ ] Set up content folder structure for markdown files
- [ ] Create sample blog posts in markdown format
- [ ] Implement dynamic content loading from file system
- [ ] Add content validation and error handling
- [ ] Create content management utilities
- [ ] Test content loading and rendering

## Day 7: Advanced Styling & Theming
- [ ] Create wireframe for Mobile Navigation of website (floating menu button)
- [ ] Create comprehensive design system with CSS-in-JS
- [ ] Implement dark/light theme toggle
- [ ] Add animations and transitions
- [ ] Ensure accessibility compliance (ARIA labels, keyboard navigation)
- [ ] Optimize for mobile-first responsive design
- [ ] Create reusable styled components library
- [ ] Implement Floating Menu (Start)

## Day 8: SEO & Performance Optimization
- [ ] Implement Floating Menu (Finish)
- [ ] Add React Helmet for meta tags and SEO
- [ ] Implement lazy loading for images and components
- [ ] Add Open Graph and Twitter Card meta tags
- [ ] Optimize bundle size with code splitting
- [ ] Add service worker for caching (optional)
- [ ] Implement sitemap generation

## Day 9: Additional Features
- [ ] Add RSS feed generation
- [ ] Implement reading time calculation
- [ ] Create table of contents for long posts
- [ ] Add social sharing buttons
- [ ] Implement related posts suggestions
- [ ] Add print-friendly styles

## Day 10: Testing & Quality Assurance
- [ ] Write unit tests for core components
- [ ] Add integration tests for routing and navigation
- [ ] Test markdown rendering with various content types
- [ ] Validate TypeScript types and interfaces
- [ ] Cross-browser testing
- [ ] Performance testing with Lighthouse

## Day 11: Content Creation & Population
- [ ] Write initial blog posts in markdown
- [ ] Create About and Contact pages
- [ ] Add proper image optimization and handling
- [ ] Populate site with real content
- [ ] Create 404 and error pages
- [ ] Add legal pages (Privacy Policy, Terms)

## Day 12: Frontend Polish & Documentation
- [ ] Final styling adjustments and bug fixes
- [ ] Create comprehensive README documentation
- [ ] Document component interfaces and usage
- [ ] Prepare for backend integration
- [ ] Create build scripts and deployment preparation
- [ ] Frontend code review and cleanup

---

# Phase 2: Backend Development (Days 13-22)

## Day 13: Backend Setup & Architecture
- [ ] Initialize Node.js project with TypeScript
- [ ] Set up Express.js server with TypeScript configuration
- [ ] Configure database (MongoDB or PostgreSQL)
- [ ] Set up environment variables and configuration
- [ ] Create project structure for backend
- [ ] Set up development and production scripts

## Day 14: Database Design & Models
- [ ] Design database schema for blog posts, users, comments
- [ ] Create database models/schemas (Mongoose or TypeORM)
- [ ] Set up database connection and error handling
- [ ] Create database migration scripts
- [ ] Add data validation and sanitization
- [ ] Test database operations

## Day 15: Authentication System
- [ ] Implement JWT-based authentication
- [ ] Create user registration and login endpoints
- [ ] Add password hashing and security measures
- [ ] Create middleware for route protection
- [ ] Implement refresh token functionality
- [ ] Add logout and session management

## Day 16: Blog Post API
- [ ] Create CRUD endpoints for blog posts
- [ ] Implement blog post creation with markdown support
- [ ] Add blog post editing and deletion
- [ ] Create public endpoints for fetching posts
- [ ] Add pagination and filtering to API
- [ ] Implement search functionality

## Day 17: Comments & User Interaction
- [ ] Create comments system with moderation
- [ ] Implement comment CRUD operations
- [ ] Add like/dislike functionality for posts
- [ ] Create user profile management
- [ ] Add comment threading (optional)
- [ ] Implement spam protection measures

## Day 18: File Upload & Media Management
- [ ] Set up file upload with Multer or similar
- [ ] Implement image resizing and optimization
- [ ] Create media management endpoints
- [ ] Add file validation and security measures
- [ ] Set up cloud storage integration (AWS S3)
- [ ] Create image serving and CDN setup

## Day 19: Analytics & Additional Features
- [ ] Implement page view tracking
- [ ] Create analytics dashboard endpoints
- [ ] Add newsletter signup functionality
- [ ] Implement email sending capabilities
- [ ] Create admin dashboard API endpoints
- [ ] Add content backup and export features

## Day 20: API Documentation & Testing
- [ ] Create API documentation with Swagger/OpenAPI
- [ ] Write comprehensive unit tests for API endpoints
- [ ] Add integration tests for authentication flow
- [ ] Test file upload and media management
- [ ] Validate error handling and edge cases
- [ ] Performance testing for API endpoints

## Day 21: Frontend-Backend Integration
- [ ] Update frontend to use backend APIs
- [ ] Implement authentication flow in React
- [ ] Add admin interface for content management
- [ ] Update blog rendering to use API data
- [ ] Implement real-time features (if applicable)
- [ ] Test full-stack functionality

## Day 22: Security & Performance
- [ ] Implement rate limiting and security headers
- [ ] Add input validation and sanitization
- [ ] Set up CORS properly for production
- [ ] Optimize database queries and indexing
- [ ] Add caching strategies (Redis optional)
- [ ] Security audit and vulnerability assessment

---

# Phase 3: AWS Deployment (Days 23-30)

## Day 23: AWS Account Setup & Planning
- [ ] Set up AWS account and configure billing alerts
- [ ] Plan deployment architecture (EC2, ECS, or serverless)
- [ ] Create IAM users and roles with proper permissions
- [ ] Set up AWS CLI and configure profiles
- [ ] Plan domain name and SSL certificate strategy
- [ ] Create deployment environment diagram

## Day 24: Frontend Deployment (Static Hosting)
- [ ] Build production frontend bundle
- [ ] Set up AWS S3 bucket for static hosting
- [ ] Configure S3 bucket for website hosting
- [ ] Set up CloudFront CDN distribution
- [ ] Configure custom domain with Route 53
- [ ] Set up SSL certificate with AWS Certificate Manager

## Day 25: Database Setup
- [ ] Set up Amazon RDS instance (or DocumentDB for MongoDB)
- [ ] Configure database security groups and access
- [ ] Run database migrations in production
- [ ] Set up database backups and monitoring
- [ ] Configure connection pooling and optimization
- [ ] Test database connectivity and performance

## Day 26: Backend Deployment
- [ ] Choose deployment method (EC2, ECS, or Lambda)
- [ ] Set up application server infrastructure
- [ ] Configure load balancer (Application Load Balancer)
- [ ] Set up auto-scaling groups (if using EC2/ECS)
- [ ] Configure environment variables in production
- [ ] Deploy backend application and test endpoints

## Day 27: File Storage & CDN
- [ ] Set up S3 bucket for file uploads and media
- [ ] Configure CloudFront for media delivery
- [ ] Update application to use S3 for file storage
- [ ] Set up proper S3 bucket policies and permissions
- [ ] Test file upload and serving functionality
- [ ] Optimize image delivery and caching

## Day 28: Monitoring & Logging
- [ ] Set up CloudWatch for application monitoring
- [ ] Configure log aggregation and analysis
- [ ] Set up health checks and alerts
- [ ] Implement error tracking and reporting
- [ ] Configure backup strategies for all components
- [ ] Set up performance monitoring dashboards

## Day 29: CI/CD Pipeline
- [ ] Set up GitHub Actions or AWS CodePipeline
- [ ] Create automated build and deployment process
- [ ] Configure separate staging and production environments
- [ ] Add automated testing in CI/CD pipeline
- [ ] Set up deployment rollback strategies
- [ ] Test entire deployment pipeline

## Day 30: Final Testing & Go-Live
- [ ] Complete end-to-end testing in production environment
- [ ] Performance testing and optimization
- [ ] Security scan and final vulnerability assessment
- [ ] Update DNS to point to production environment
- [ ] Final content review and publishing
- [ ] Post-launch monitoring and documentation

---

## Recommended Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **CSS-in-JS**: Styled Components or Emotion
- **Routing**: React Router v6
- **Markdown**: react-markdown with remark plugins
- **State Management**: React Context API or Zustand
- **Build Tool**: Vite or Create React App

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with TypeORM or MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **File Upload**: Multer with AWS S3
- **Testing**: Jest and Supertest

### AWS Services
- **Frontend Hosting**: S3 + CloudFront
- **Backend Hosting**: EC2 with Application Load Balancer or ECS
- **Database**: RDS (PostgreSQL) or DocumentDB (MongoDB)
- **File Storage**: S3 with CloudFront CDN
- **Domain & SSL**: Route 53 + Certificate Manager
- **Monitoring**: CloudWatch
- **CI/CD**: CodePipeline or GitHub Actions
