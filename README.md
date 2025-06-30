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

## Data Structure

### Orders (orders.json)
Customer orders containing:
- Order ID, total, date, shipping address
- Customer information
- Line items with product IDs for gift boxes

### Box Contents (boxContents.json)
Mapping of gift box IDs to individual warehouse items:
- `VALENTINE-BOX` → Red Roses, Chocolates, Love Card, Perfume
- `BIRTHDAY-BOX` → Cupcake, Gift Card, Birthday Card
- `CLIENT-GIFT-BOX` → Wine, Fruit Basket, Pen

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

The application includes 5 sample orders for January 15, 2024, demonstrating the full workflow from gift box orders to individual item pick lists. 