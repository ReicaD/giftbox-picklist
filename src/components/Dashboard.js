import React, { useState, useEffect } from 'react';
import ordersData from '../data/orders.json';
import boxContents from '../data/boxContents.json';

const Dashboard = () => {
  const [pickList, setPickList] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const generatePickList = () => {
      const itemCounts = {};
      let orderCount = 0;
      let itemCount = 0;

      ordersData.forEach(order => {
        if (order.orderDate === selectedDate) {
          orderCount++;
          
          order.lineItems.forEach(lineItem => {
            const items = boxContents[lineItem.productId];
            if (items) {
              items.forEach(item => {
                itemCounts[item.productName] = (itemCounts[item.productName] || 0) + item.quantity;
                itemCount += item.quantity;
              });
            }
          });
        }
      });

      const pickListArray = Object.entries(itemCounts)
        .map(([productName, quantity]) => ({ productName, quantity }))
        .sort((a, b) => a.productName.localeCompare(b.productName));

      setPickList(pickListArray);
      setTotalOrders(orderCount);
      setTotalItems(itemCount);
    };

    generatePickList();
  }, [selectedDate]);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#E1F5FE',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    companyName: {
      fontSize: '48px',
      color: '#0D47A1',
      margin: '0 0 10px 0',
      fontWeight: 'bold'
    },
    title: {
      fontSize: '32px',
      color: '#1565C0',
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
      border: '2px solid #4FC3F7',
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
      <div style={styles.header}>
        <h1 style={styles.companyName}>Cozey</h1>
        <h2 style={styles.title}>🎁 Warehouse Pick List Dashboard</h2>
      </div>

      <div style={styles.controls}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={styles.dateInput}
        />
      </div>

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

      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          Items to Pick - {new Date(selectedDate).toLocaleDateString()}
        </div>
        
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