# E-Commerce Application Frontend

The **E-Commerce Application Frontend** is designed to provide an intuitive and responsive user interface for customers, vendors, and administrators. Built with modern web technologies, it ensures a seamless shopping experience while maintaining scalability and performance.

## Live URL

   https://ecommerceclient1.netlify.app

## Backend Repository Link

   https://github.com/ManikHossainDev/E-Commerce-Server.git

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React-based framework for server-side rendering and static site generation).
- **State Management**: [Redux](https://redux.js.org/) (for centralized state management).
- **UI Framework**: [NextUI](https://nextui.org/) (for modern and responsive UI components).
- **Styling**: [TailwindCSS](https://tailwindcss.com/) (for utility-first CSS).

---

## Key Features

### Home Page
- Displays all products from various vendors with infinite scrolling.
- Advanced filtering and searching (e.g., price range, category, keyword).
- Scroll-to-top button for better navigation.
- Category listing with clickable links to filter products on the "All Products" page.
- Flash sale section redirecting to a dedicated flash sale page.

### Product Details Page
- Detailed product information including name, price, images, description, and category.
- Related products section showcasing similar items.
- Display vendor shop details with a clickable link to the shop page.
- Customer reviews and ratings.

### Shop Page
- Vendor shop details with a list of vendor-specific products.
- Options for users to follow/unfollow shops.
- Follower count display.

### Cart Functionality
- Supports products from one vendor at a time.
- Warning prompt when adding products from a different vendor, with options to replace or retain the cart.
- Displays product details, pricing, and total cost.

### Checkout
- Apply coupon codes for discounts.
- Integrates with [Aamarpay](https://aamarpay.com/) for payment processing.

### Order History
- **For Vendors**: Detailed list of orders placed for their shop.
- **For Customers**: Purchase history with product and order details.

### Recent Products Page
- Displays the last 10 products viewed by the user.

### Comparison Feature
- Allows comparison of up to three products from the same category.
- Displays attributes like price, category, and ratings for comparison.

### Responsive Design
- Mobile-first, responsive design to ensure usability across all devices.

### Authentication
- **Signup**: Option to register as a customer or vendor.
- **Login**: Secure JWT-based authentication.
- **Password Management**: Change and reset password functionality via email.

### Vendor Dashboard
- Manage shop information and product listings.
- View and respond to customer reviews.
- Paginated product and order listings for scalability.

---

## Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd ecommerce-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Access the application at `http://localhost:3000`.



## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase using ESLint.




## Contact

For any queries or support, please contact [se.manik.js@gmail.com     ].
