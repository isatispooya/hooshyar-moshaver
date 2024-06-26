import React, { useState } from 'react';

import { Button } from '@mui/material';

const ReservationInvoice = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [totalAmount, setTotalAmount] = useState(800000); 
  const [customer, setCustomer] = useState(-800000); 
  const [add, setAdd] = useState(100000); 



  const applyDiscount = () => {
    if (discountCode === 'CUSTOMER') {
      setTotalAmount(totalAmount - 80000); 
      setCustomer(totalAmount - -80000)
      setAdd(totalAmount - 100000)

      setDiscountApplied(true);
    } else {
      alert('کد تخفیف نامعتبر است.');
    }
  };

  const handlePayment = () => {
    alert('پرداخت با موفقیت انجام شد.');
  };

  return (
    <div>
      <h2>پیش فاکتور </h2>
      <p>مبلغ قابل پرداخت: {totalAmount.toLocaleString()} تومن</p>
      <p> تخفیف ویژه مشتریان: {customer.toLocaleString()} تومن</p>
      
      <p>ارزش افزوده: {add.toLocaleString()} تومن</p>

      {!discountApplied && (
        <div>
          <input
            type="text"
            placeholder="کد تخفیف"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <Button onClick={applyDiscount}>اعمال تخفیف</Button>
        </div>
      )}
      
      <Button onClick={handlePayment}>پرداخت</Button>
    </div>
  );
};

export default ReservationInvoice;
