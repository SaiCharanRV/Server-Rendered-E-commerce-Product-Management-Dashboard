# Server-Rendered E-commerce Product Management Dashboard

A full-stack, server-side rendered administrative dashboard built with Next.js for managing products in an e-commerce system. This application leverages SSR for optimal performance, SEO benefits, and provides a complete product management solution with authentication, analytics, and cloud-based image storage.


### 🔐 Authentication & Authorization

- **User Registration & Login**: Secure authentication system for general users
- **Admin Registration with Secret Key**: Protected admin onboarding (only accessible to existing admins)
- **Role-Based Access Control**: Separate dashboards for admins and users
- **Password Encryption**: Secure password hashing using bcryptjs

### 📦 Product Management (Full CRUD)

- **Create Products**: Multi-step form with comprehensive validation using zod
- **Read Products**: Server-side rendered product listings
- **Update Products**: Edit product details including price, stock, and images
- **Delete Products**: Soft delete functionality preserving order history
- **Image Upload**: Cloud-based image storage via Cloudinary
- **Inventory Tracking**: Real-time stock level monitoring using recharts
- **Product Search & Filter**: Efficient product discovery

### 📊 Order Management

- **Place Orders**: Users can order products with quantity selection
- **Order Tracking**: View all orders with status (pending/delivered)
- **Order History**: Complete order records with product details

### 📈 Interactive Dashboard

- **Sales Analytics**: Real-time revenue and sales metrics
- **Inventory Distribution**: Pie chart showing product value distribution using recharts
- **Product Sales Chart**: Bar graph of quantity sold per product
- **Key Metrics Cards**:
  - Total Inventory Cost
  - Total Units in Stock
  - Total Revenue Generated
- **Top 5 High-Value Assets**: Ranked by unit price

### 🎨 UI/UX Features

- **Professional Sidebar Navigation**: Easy access to all sections
- **Modern Gradient UI**: Clean, contemporary design with Tailwind CSS
- **Loading States**: Smooth user experience with loading indicators
- **Form Validation Feedback**: Real-time error messages
- **Toast Notifications**: Success/error alerts for user actions

---

## 🛠 Tech Stack

### Frontend

- **Next.js 14.1.1**: React framework with server-side rendering
- **React 18.2.3**: UI library
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Recharts 3.6.0**: Interactive data visualization
- **Lucide React**: Modern icon library

### Backend & Database

- **Next.js API Routes**: Serverless API endpoints
- **PostgreSQL**: Relational database
- **Prisma ORM 7.2.0**: Type-safe database client
- **Supabase**: PostgreSQL hosting and management

### Security & Validation

- **bcryptjs**: Password hashing
- **Zod 4.3.5**: Schema validation for forms and API
- **Environment Variables**: Secure credential management

### Cloud Services

- **Cloudinary**: Image upload and storage

### Additional Tools

- **Prisma Studio**: Database GUI
- **ESLint**: Code linting
- **React Hook Form**: Form state management

---


## 🚀 Setup Instructions

### Prerequisites

- Node.js 16.13+ installed
- PostgreSQL database (local or cloud)
- Cloudinary account for image storage
- Git for version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaiCharanRV/Server-Rendered-E-commerce-Product-Management-Dashboard.git
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:5432/database"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"

   # Admin Secret (for onboarding)
   ADMIN_SECRET="your_secret_key"
   ```

4. **Set up Prisma and Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |

---

## 👤 Admin Credentials (Dummy Account)

For testing purposes, a dummy admin account has been created:

```
Email: saicharan@gmail.com
Password: saicharan123
```



## 🔄 Application Workflow

```mermaid
graph TD
    A[Admin requests dashboard] --> B[Server fetches data from PostgreSQL]
    B --> C[Server renders page with data]
    C --> D[Rendered page sent to browser]
    D --> E[Admin interacts with UI]
    E --> F{Action Type}
    F -->|Create| G[Multi-step form validation]
    F -->|Update| H[Edit product details]
    F -->|Delete| I[Soft delete product]
    F -->|View| J[Display charts & metrics]
    G --> K[Upload image to Cloudinary]
    K --> L[Save to PostgreSQL via Prisma]
    H --> L
    I --> L
    L --> M[Revalidate page cache]
    M --> N[UI updates with fresh data]
```

### Detailed Flow

1. **Authentication**: User/Admin logs in → Credentials verified against database → Session created
2. **Product Creation**: 
   - Step 1: Enter product name (Zod validation)
   - Step 2: Enter price & stock (numeric validation)
   - Step 3: Upload image (file type & size validation)
   - Submit → Image uploads to Cloudinary → Product saved to PostgreSQL
3. **Order Placement**: User selects product → Enters quantity → Order created → Stock reduced
4. **Dashboard Rendering**: Server fetches all data → Calculates metrics → Renders charts → Sends to client
5. **Product Update**: Admin edits product → Validates changes → Updates database → Revalidates page

---




###  Server-Side Rendering

All product and order data is fetched on the server:
```typescript
export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });
  return <ProductList products={products} />;
}
```



