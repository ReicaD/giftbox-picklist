import React, { useState, useEffect } from 'react';
import ordersData from '../data/orders.json';
import boxContents from '../data/boxContents.json';

/**
 * Dashboard Component - Main warehouse pick list interface
 * Processes customer orders for gift boxes and generates consolidated pick lists
 * for warehouse staff to efficiently collect items for multiple orders
 */
const Dashboard = () => {
  // State management for the pick list application
  const [pickList, setPickList] = useState([]); // Final consolidated pick list
  const [selectedDate, setSelectedDate] = useState('2024-01-15'); // Date filter for orders
  const [totalOrders, setTotalOrders] = useState(0); // Count of orders for selected date
  const [totalItems, setTotalItems] = useState(0); // Total items to pick across all orders

  // Main business logic - runs whenever the selected date changes
  useEffect(() => {
    const generatePickList = () => {
      const itemCounts = {}; // Track quantities of each individual item
      let orderCount = 0;
      let itemCount = 0;

      // Process each order to build consolidated pick list
      ordersData.forEach(order => {
        // Only process orders for the selected date
        if (order.orderDate === selectedDate) {
          orderCount++;
          
          // Break down each gift box into individual warehouse items
          order.lineItems.forEach(lineItem => {
            const items = boxContents[lineItem.productId]; // Get items for this gift box
            if (items) {
              // Add each item to the consolidated count
              items.forEach(item => {
                itemCounts[item.productName] = (itemCounts[item.productName] || 0) + item.quantity;
                itemCount += item.quantity;
              });
            }
          });
        }
      });

      // Convert item counts to array and sort alphabetically for easy warehouse navigation
      const pickListArray = Object.entries(itemCounts)
        .map(([productName, quantity]) => ({ productName, quantity }))
        .sort((a, b) => a.productName.localeCompare(b.productName));

      // Update state with the generated pick list and statistics
      setPickList(pickListArray);
      setTotalOrders(orderCount);
      setTotalItems(itemCount);
    };

    generatePickList();
  }, [selectedDate]); // Regenerate pick list when date changes

  // Inline styles for the dashboard UI (using Cozey's light mid-blue theme)
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#E1F5FE', // Light blue background
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    companyName: {
      fontSize: '48px',
      color: '#0D47A1', // Dark blue for company name
      margin: '0 0 10px 0',
      fontWeight: 'bold'
    },
    title: {
      fontSize: '32px',
      color: '#1565C0', // Medium blue for title
      margin: '0 0 30px 0'
    },
    controls: {
      display: 'flex',
      gap: '20px',
      marginBottom: '30px',
      flexWrap: 'wrap'
    },
    dateInput: {
      padding: '10px',
      fontSize: '16px',
      border: '2px solid #4FC3F7', // Light blue border
      borderRadius: '5px',
      backgroundColor: 'white'
    },
    statsCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    card: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    // Color variants for statistics cards
    cardBlue: {
      backgroundColor: '#4FC3F7',
      color: 'white'
    },
    cardGreen: {
      backgroundColor: '#81C784',
      color: 'white'
    },
    cardDark: {
      backgroundColor: '#0288D1',
      color: 'white'
    },
    cardNumber: {
      fontSize: '36px',
      fontWeight: 'bold'
    },
    cardLabel: {
      fontSize: '16px',
      marginTop: '5px'
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    tableHeader: {
      backgroundColor: '#4FC3F7',
      color: 'white',
      padding: '15px',
      fontSize: '20px',
      fontWeight: 'bold'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      backgroundColor: '#0288D1',
      color: 'white',
      padding: '12px',
      textAlign: 'left',
      fontWeight: 'bold'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #eee'
    },
    quantityCell: {
      textAlign: 'right',
      fontWeight: 'bold',
      color: '#0288D1',
      fontSize: '18px'
    },
    noData: {
      textAlign: 'center',
      padding: '40px',
      color: '#666',
      fontSize: '18px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header section with company branding */}
      <div style={styles.header}>
        <h1 style={styles.companyName}>Cozey</h1>
        <h2 style={styles.title}>🎁 Warehouse Pick List Dashboard</h2>
      </div>

      {/* Date picker to filter orders */}
      <div style={styles.controls}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={styles.dateInput}
        />
      </div>

      {/* Statistics cards showing order summary */}
      <div style={styles.statsCards}>
        <div style={{...styles.card, ...styles.cardBlue}}>
          <div style={styles.cardNumber}>{totalOrders}</div>
          <div style={styles.cardLabel}>Total Orders</div>
        </div>
        <div style={{...styles.card, ...styles.cardGreen}}>
          <div style={styles.cardNumber}>{totalItems}</div>
          <div style={styles.cardLabel}>Total Items</div>
        </div>
        <div style={{...styles.card, ...styles.cardDark}}>
          <div style={styles.cardNumber}>{pickList.length}</div>
          <div style={styles.cardLabel}>Unique Products</div>
        </div>
      </div>

      {/* Main pick list table */}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          Items to Pick - {new Date(selectedDate).toLocaleDateString()}
        </div>
        
        {/* Conditional rendering: show table if items exist, otherwise show no data message */}
        {pickList.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Product Name</th>
                <th style={{...styles.th, textAlign: 'right'}}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {pickList.map((item, index) => (
                <tr key={index} style={index % 2 === 0 ? {backgroundColor: '#f9f9f9'} : {}}>
                  <td style={styles.td}>{item.productName}</td>
                  <td style={{...styles.td, ...styles.quantityCell}}>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.noData}>
            No orders found for selected date
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 