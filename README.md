# Cozey Warehouse Pick List Application

A React-based warehouse management tool that automates the generation of consolidated pick lists for gift box orders.

## Business Problem Solved

Cozey's warehouse staff were manually processing daily orders, breaking down gift boxes into individual items, and creating pick lists. This application automates that process by:

- Taking customer orders for gift boxes (Valentine Box, Birthday Box, Client Gift Box)
- Breaking each box into individual warehouse items using predefined mappings
- Consolidating quantities across all orders for a selected date
- Generating sorted pick lists for efficient warehouse navigation

## Project Structure

```
src/
├── components/
│   └── Dashboard.js          # Main UI component and business logic
├── data/
│   ├── orders.json          # Customer order data
│   ├── boxContents.json     # Gift box to item mappings
│   └── products.json        # Product catalog (for reference)
├── App.js                   # Main app component
├── index.js                 # React app entry point
└── index.css               # Basic styling
```

## Data Structure Explained

### 📦 boxContents.json - The Magic Mapping File
This is the heart of our automation! It tells the system exactly what individual items are inside each gift box:

**VALENTINE-BOX** breaks down into:
- Red Roses Bouquet (1)
- Box of chocolates (1) 
- Love card (1)
- Women's perfume (1)

**BIRTHDAY-BOX** breaks down into:
- Birthday cupcake (1)
- $100 Visa Gift Card (1)
- Birthday card (1)

**CLIENT-GIFT-BOX** breaks down into:
- Bottle of wine (1)
- Fruit basket (1)
- Pen (1)

*When warehouse staff get an order for 3 Valentine Boxes, the system automatically knows they need to pick 3 roses, 3 chocolate boxes, 3 cards, and 3 perfumes!*

### 📋 orders.json - Customer Order Data
Real customer orders containing:
- **Order Details**: ID, total price, order date
- **Customer Info**: Name, email, shipping address  
- **Line Items**: What gift boxes they ordered (references the box IDs above)

Sample order structure:
```json
{
  "orderId": "ORD-001",
  "orderTotal": 89.99,
  "orderDate": "2024-01-15",
  "customerName": "John Smith",
  "lineItems": [
    {
      "productId": "VALENTINE-BOX",
      "productName": "Valentines Box",
      "price": 89.99
    }
  ]
}
```

### 📊 products.json - Product Catalog
Complete inventory reference with warehouse locations and details for all individual items. Used for future features like location-based picking routes.

## How It All Works Together

1. **User selects a date** → System filters orders.json for that date
2. **System finds gift boxes** in customer orders (VALENTINE-BOX, etc.)
3. **Looks up individual items** using boxContents.json mapping
4. **Consolidates quantities** across all orders (5 Valentine boxes = 5 roses, 5 chocolates, etc.)
5. **Sorts alphabetically** for efficient warehouse navigation
6. **Displays clean pick list** with totals for each item

## Key Features

- **Date-based filtering**: Select any date to generate pick lists
- **Automatic consolidation**: Combines quantities across multiple orders
- **Alphabetical sorting**: Items sorted for efficient warehouse navigation
- **Statistics dashboard**: Shows total orders, items, and unique products
- **Clean UI**: Light mid-blue theme matching Cozey branding

## Tech Stack

- **Frontend**: React 18 with hooks (useState, useEffect)
- **Styling**: Inline styles with custom theme
- **Data**: JSON files for orders and product mappings
- **Build**: Create React App with react-scripts

## Usage

1. Start the development server: `npm start`
2. Open http://localhost:3000
3. Use the date picker to select order date
4. View consolidated pick list and statistics
5. Print or export the pick list for warehouse staff

## Sample Data

The application includes 5 sample orders for January 15, 2024, demonstrating the full workflow:
- Orders contain various combinations of gift boxes
- System automatically breaks them down and consolidates quantities
- Final pick list shows exactly what warehouse staff need to collect

## What Makes This Special

This isn't just an inventory app - it's specifically designed for Cozey's gift box business model. The system understands that when customers order "Valentine Box", warehouse staff need to collect individual roses, chocolates, cards, and perfume. During busy seasons, instead of processing dozens of individual orders, staff get one clean list showing total quantities needed. 