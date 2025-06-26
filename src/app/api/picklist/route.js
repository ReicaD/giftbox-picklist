import { NextResponse } from 'next/server';
import orders from '../../../data/orders.json';
import boxProducts from '../../../data/box_products.json';

export async function GET(request) {
  try {
    // Get date from query params or use current date
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    // Filter orders for the specified date
    const dateOrders = orders.orders.filter(order => order.orderDate === date);

    // Initialize pick list quantities
    const pickList = {};

    // Process each order
    dateOrders.forEach(order => {
      order.lineItems.forEach(item => {
        const boxType = item.productId;
        
        // Get products for this box type
        const boxContents = boxProducts[boxType]?.products || [];
        
        // Add each product to pick list
        boxContents.forEach(product => {
          if (!pickList[product.productName]) {
            pickList[product.productName] = 0;
          }
          pickList[product.productName] += product.quantity;
        });
      });
    });

    // Convert to array format for frontend
    const pickListArray = Object.entries(pickList).map(([product, quantity]) => ({
      product,
      quantity
    }));

    return NextResponse.json({
      date,
      totalOrders: dateOrders.length,
      pickList: pickListArray
    });

  } catch (error) {
    console.error('Error generating pick list:', error);
    return NextResponse.json(
      { error: 'Failed to generate pick list' },
      { status: 500 }
    );
  }
} 