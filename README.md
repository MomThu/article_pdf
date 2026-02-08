# Article PDF Management System

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

### Overview

Article PDF Management System is a full-stack web application built with Next.js and TypeScript that allows users to browse, purchase, and download academic articles in PDF format. The system includes features for user authentication, article management, shopping cart, and payment processing.

### Features

- 🔐 **User Authentication**: Secure login and registration using NextAuth.js
- 📄 **Article Management**: Browse and search academic articles with detailed information
- 👥 **Author Profiles**: View author information and their publications
- 🛒 **Shopping Cart**: Add articles to cart and manage purchases
- 💳 **Payment System**: Process payments and manage orders
- 📱 **PDF Viewer**: View PDF documents directly in the browser
- 👨‍💼 **Admin Panel**: Manage articles, authors, and users
- 🔒 **HTTPS Support**: Secure communication with SSL/TLS certificates
- 📧 **Email Notifications**: Send notifications to users

### Technology Stack

**Frontend:**
- Next.js (React Framework)
- TypeScript
- Ant Design (UI Components)
- TailwindCSS
- React PDF Viewer
- React Hook Form

**Backend:**
- Node.js
- Express (via Next.js Custom Server)
- Sequelize ORM with TypeScript
- MySQL Database
- NextAuth.js (Authentication)

**Infrastructure:**
- HTTPS Server with custom certificates
- AWS S3 (File Storage)
- Nodemailer (Email Service)

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MomThu/article_pdf.git
cd article_pdf
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create HTTPS certificates for local development:
```bash
mkdir https_cert
cd https_cert
# Generate self-signed certificates using openssl or mkcert
mkcert localhost
# or
openssl req -x509 -out localhost.pem -keyout localhost-key.pem -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost'
```

4. Set up environment variables:
Create a `.env` file in the root directory with the following configuration:

```env
# Database Configuration
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASS=your_password
DATABASE_NAME=articles

# Authentication
SECRET=your_random_secret_string
NEXTAUTH_URL='https://localhost:3000'

# Node Configuration
NODE_TLS_REJECT_UNAUTHORIZED=0

# PDF Server
PDF_SERVER='https://localhost:8000/api/pdf'

# Email Configuration
ADMIN_EMAIL="your-email@gmail.com"
PASSWORD_EMAIL="your-app-password"
```

5. Create the MySQL database:
```bash
mysql -u root -p
CREATE DATABASE articles;
exit;
```

### Running the Application

**Development Mode:**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `https://localhost:3000`

**Production Mode:**
```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

### Project Structure

```
article_pdf/
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   ├── article/       # Article pages
│   ├── author/        # Author pages
│   ├── cart/          # Shopping cart
│   ├── component/     # Reusable components
│   └── ...
├── models/            # Sequelize models
├── controllers/       # Business logic controllers
├── services/          # Service layer
├── middleware/        # Custom middleware
├── config/            # Configuration files
├── public/            # Static assets
├── server.ts          # Custom HTTPS server
├── connectDB.ts       # Database connection
└── ...
```

### Database Models

- **Article**: Academic articles with title, abstract, price, and publish date
- **Author**: Author information and profiles
- **Customer**: User accounts and authentication
- **Order**: Purchase transactions
- **Cart**: Shopping cart items
- **Pdf**: PDF file metadata and storage
- **ArticleAuthor**: Many-to-many relationship between articles and authors
- **ArticlePermission**: User permissions for accessing articles

### API Endpoints

- `/api/article` - Article CRUD operations
- `/api/author` - Author management
- `/api/cart` - Shopping cart operations
- `/api/customer` - User management
- `/api/authentication` - Login/Register
- `/api/pdf` - PDF file operations
- `/api/upload` - File upload handling

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

This project is private and proprietary.

---

## Tiếng Việt

### Tổng quan

Hệ thống Quản lý Bài báo PDF là một ứng dụng web full-stack được xây dựng bằng Next.js và TypeScript, cho phép người dùng duyệt, mua và tải xuống các bài báo học thuật ở định dạng PDF. Hệ thống bao gồm các tính năng xác thực người dùng, quản lý bài báo, giỏ hàng và xử lý thanh toán.

### Tính năng

- 🔐 **Xác thực người dùng**: Đăng nhập và đăng ký bảo mật sử dụng NextAuth.js
- 📄 **Quản lý bài báo**: Duyệt và tìm kiếm bài báo học thuật với thông tin chi tiết
- 👥 **Hồ sơ tác giả**: Xem thông tin tác giả và các công trình của họ
- 🛒 **Giỏ hàng**: Thêm bài báo vào giỏ và quản lý giao dịch mua
- 💳 **Hệ thống thanh toán**: Xử lý thanh toán và quản lý đơn hàng
- 📱 **Trình xem PDF**: Xem tài liệu PDF trực tiếp trên trình duyệt
- 👨‍💼 **Bảng điều khiển Admin**: Quản lý bài báo, tác giả và người dùng
- 🔒 **Hỗ trợ HTTPS**: Giao tiếp bảo mật với chứng chỉ SSL/TLS
- 📧 **Thông báo Email**: Gửi thông báo đến người dùng

### Công nghệ sử dụng

**Frontend:**
- Next.js (React Framework)
- TypeScript
- Ant Design (Thư viện UI)
- TailwindCSS
- React PDF Viewer
- React Hook Form

**Backend:**
- Node.js
- Express (thông qua Next.js Custom Server)
- Sequelize ORM với TypeScript
- Cơ sở dữ liệu MySQL
- NextAuth.js (Xác thực)

**Hạ tầng:**
- HTTPS Server với chứng chỉ tùy chỉnh
- AWS S3 (Lưu trữ file)
- Nodemailer (Dịch vụ Email)

### Yêu cầu hệ thống

- Node.js (phiên bản 14 trở lên)
- MySQL (phiên bản 5.7 trở lên)
- npm hoặc yarn package manager

### Cài đặt

1. Clone repository:
```bash
git clone https://github.com/MomThu/article_pdf.git
cd article_pdf
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Tạo chứng chỉ HTTPS cho môi trường phát triển:
```bash
mkdir https_cert
cd https_cert
# Tạo chứng chỉ tự ký sử dụng openssl hoặc mkcert
mkcert localhost
# hoặc
openssl req -x509 -out localhost.pem -keyout localhost-key.pem -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost'
```

4. Thiết lập biến môi trường:
Tạo file `.env` trong thư mục gốc với cấu hình sau:

```env
# Cấu hình Database
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASS=your_password
DATABASE_NAME=articles

# Xác thực
SECRET=your_random_secret_string
NEXTAUTH_URL='https://localhost:3000'

# Cấu hình Node
NODE_TLS_REJECT_UNAUTHORIZED=0

# PDF Server
PDF_SERVER='https://localhost:8000/api/pdf'

# Cấu hình Email
ADMIN_EMAIL="your-email@gmail.com"
PASSWORD_EMAIL="your-app-password"
```

5. Tạo cơ sở dữ liệu MySQL:
```bash
mysql -u root -p
CREATE DATABASE articles;
exit;
```

### Chạy ứng dụng

**Chế độ Development:**
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại `https://localhost:3000`

**Chế độ Production:**
```bash
# Build ứng dụng
npm run build
# hoặc
yarn build

# Khởi động production server
npm start
# hoặc
yarn start
```

### Cấu trúc dự án

```
article_pdf/
├── pages/              # Trang Next.js và API routes
│   ├── api/           # API endpoints
│   ├── article/       # Trang bài báo
│   ├── author/        # Trang tác giả
│   ├── cart/          # Giỏ hàng
│   ├── component/     # Components tái sử dụng
│   └── ...
├── models/            # Sequelize models
├── controllers/       # Controllers xử lý logic
├── services/          # Service layer
├── middleware/        # Custom middleware
├── config/            # File cấu hình
├── public/            # Tài nguyên tĩnh
├── server.ts          # Custom HTTPS server
├── connectDB.ts       # Kết nối database
└── ...
```

### Các Model trong Database

- **Article**: Bài báo học thuật với tiêu đề, tóm tắt, giá và ngày xuất bản
- **Author**: Thông tin và hồ sơ tác giả
- **Customer**: Tài khoản người dùng và xác thực
- **Order**: Giao dịch mua hàng
- **Cart**: Các mục trong giỏ hàng
- **Pdf**: Metadata và lưu trữ file PDF
- **ArticleAuthor**: Quan hệ nhiều-nhiều giữa bài báo và tác giả
- **ArticlePermission**: Quyền truy cập bài báo của người dùng

### API Endpoints

- `/api/article` - Các thao tác CRUD bài báo
- `/api/author` - Quản lý tác giả
- `/api/cart` - Thao tác giỏ hàng
- `/api/customer` - Quản lý người dùng
- `/api/authentication` - Đăng nhập/Đăng ký
- `/api/pdf` - Thao tác file PDF
- `/api/upload` - Xử lý upload file

### Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo Pull Request.

### License

Dự án này là private và proprietary.
