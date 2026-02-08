# Article PDF Management System

A full-stack web application for browsing, purchasing, and managing academic articles in PDF format.

## Features

- User authentication and authorization
- Article browsing and search
- Shopping cart and payment processing
- PDF viewer and download
- Admin panel for content management
- Author profile pages

## Tech Stack

- **Frontend:** Next.js, TypeScript, Ant Design, TailwindCSS
- **Backend:** Node.js, Sequelize ORM, MySQL
- **Auth:** NextAuth.js
- **Storage:** AWS S3

## Prerequisites

- Node.js v14+
- MySQL v5.7+
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MomThu/article_pdf.git
cd article_pdf
```

2. Install dependencies:
```bash
npm install
```

3. Create HTTPS certificates:
```bash
mkdir https_cert
cd https_cert
mkcert localhost
```

4. Set up environment variables in `.env`:
```env
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASS=your_password
DATABASE_NAME=articles

SECRET=your_random_secret_string
NEXTAUTH_URL='https://localhost:3000'

PDF_SERVER='https://localhost:8000/api/pdf'

ADMIN_EMAIL="your-email@gmail.com"
PASSWORD_EMAIL="your-app-password"
```

5. Create database:
```bash
mysql -u root -p
CREATE DATABASE articles;
```

## Usage

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

Visit `https://localhost:3000`

## License

Private and proprietary.
