# Article PDF Management System

A full-stack web application for browsing, purchasing, and managing academic articles in PDF format.

> **Note:** This is a demo application for the graduation thesis: *"Applying PDF Content Protection Techniques on Websites."*

## Core Security Design (Thesis Focus)
The primary goal of this project is to protect digital assets using dynamic encryption and session-based access control.

### Advantages & Mechanisms:
* **Password-Locked PDFs:** All PDF files stored on the server are encrypted with a password.
* **Dynamic AES-256-CBC Encryption:** 
    * The file password is encrypted on the server-side using **AES-256-CBC**.
    * The encryption key is derived from the user's current **Session ID**.
    * A unique `iv_value` is generated for every request, ensuring different ciphertexts even for the same password.
* **Secure Key Exchange:** The Session ID is exchanged during the **Server-Side Rendering (SSR)** process, making it difficult for external attackers to intercept.
* **Client-Side Decryption:** The password is automatically decrypted on the client side only if the user has valid permissions, allowing the PDF viewer to display the file seamlessly.
* **Protection against Theft:** Even if a PDF file is stolen from the server or intercepted, attackers cannot open it without the session-specific password.
* **Granular Access Control:** 
    * Permissions are divided into 3 levels: **Read, Print, and Download**.
    * Text selection and copying are restricted and only enabled for users with "Download" permissions.
    * Ensures that only paid users can access specific features.

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

4. Set up environment in .env
```bash
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
