import React, { useState } from 'react';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [phone_number, setPhoneNumber] = useState('254');
  const [paymentMessage, setPaymentMessage] = useState('');

  const handlePayment = async () => {
    try {
      const response = await fetch('https://daraja-api-nv0m.onrender.com/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          phone_number: phone_number,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Handle the payment response, for now, just log it
        console.log('Payment response:', responseData);

        // Update the UI with a success message or handle it as needed
        setPaymentMessage('Payment prompt sent successfully');
        resetForm();
      } else {
        // Handle the case when the server returns an error
        setPaymentMessage('Payment failed. Please try again.');
      }
    } catch (error) {
      // Handle fetch-related errors
      console.error('Error processing payment:', error);
      setPaymentMessage('Payment failed. Please try again.');
    }
  };

  const resetForm = () => {
    setAmount('');
    setPhoneNumber('254');
    setPaymentMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>Make a Donation via MPESA</h2>
      <form style={{ width: '300px' }}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <button type="button" onClick={handlePayment}>
          Make Payment
        </button>
      </form>
      {paymentMessage && <p style={{ color: 'green' }}>{paymentMessage}</p>}
    </div>
  );
};

export default Donation;
