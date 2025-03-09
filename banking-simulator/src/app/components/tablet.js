'use client';
import { useState, useEffect } from 'react';
import chat from "../dialogue/chat.json";

export default function Tablet({ customerId, currentCustomer, customerRequest, requestType, setCustomerMood, buttonsDisabled, setButtonsDisabled }) {
  
  // Hardcoded account information based on customer
  const hardcodedAccounts = {
    "Alex": { account_number: "123456789", balance: 1000 },
    "Cassandra": { account_number: "987654321", balance: 500 },
    "Hector": { account_number: "555333222", balance: 2000 },
    "Tom": { account_number: "111222333", balance: 1500 },
    "Reder": { account_number: "999888777", balance: 2500 },
    "Aramaki": { account_number: "777666555", balance: 4000 },
    "Veronica": { account_number: "666555444", balance: 340 },
    "Tim": { account_number: "444333222", balance: 210 },
    "Grace": { account_number: "333222111", balance: 2000 },
    "Skel": { account_number: "222111000", balance: 3000 },
    "John": { account_number: "101010101", balance: 100 },
    "Ellen": { account_number: "202020202", balance: 300 },
    "Kim": { account_number: "303030303", balance: 500 },
  };

  const [customerAccount, setCustomerAccount] = useState(null);
  const [inputAmount, setInputAmount] = useState(0);

  // When a new customer arrives, load their hardcoded account info
  useEffect(() => {
    if (!currentCustomer) {
      setCustomerAccount(null);
      return;
    }

    const customerName = chat[currentCustomer]?.first_name;
    if (customerName && hardcodedAccounts[customerName]) {
      setCustomerAccount(hardcodedAccounts[customerName]);
    }
  }, [currentCustomer]);

  // Simulate withdrawing money
  const handleWithdraw = () => {
    if (!customerAccount || inputAmount <= 0) return;

    if (inputAmount !== customerRequest || requestType !== "withdraw") {
      setCustomerMood("angry");
      return;
    }

    if (inputAmount > customerAccount.balance) {
      console.log("Insufficient funds");
      return;
    }

    setCustomerMood("happy");
    setCustomerAccount(prev => ({ ...prev, balance: prev.balance - inputAmount }));
  };

  // Simulate depositing money
  const handleDeposit = () => {
    if (!customerAccount || inputAmount <= 0) return;

    if (inputAmount !== customerRequest || requestType !== "deposit") {
      setCustomerMood("angry");
      return;
    }

    setCustomerMood("happy");
    setCustomerAccount(prev => ({ ...prev, balance: prev.balance + inputAmount }));
  };

  if (!customerAccount) {
    return <div className="flex bg-white w-full h-full text-black text-3xl justify-center text-center items-center">No Account Data Available</div>;
  }

  return (
    <div className="bg-blue-400 h-full w-full font-[ZZZFont]">
      <div className="bg-blue-200 overflow-hidden text-black">
        <div className="flex justify-center p-1 text-xl">
          Name: {chat[currentCustomer]?.first_name} {chat[currentCustomer]?.last_name}
        </div>
        <div className="flex justify-center p-1 text-xl">
          Account #: {customerAccount.account_number}
        </div>
        <div className="flex justify-center p-1 text-xl">
          Balance: ${customerAccount.balance}
        </div>
      </div>

      <div className="flex flex-col justify-center w-full">
        <button
          onClick={handleWithdraw}
          disabled={buttonsDisabled}
          className={`bg-blue-600 text-white rounded-md text-2xl p-3 my-2 mt-3 mx-2 disabled:opacity-50 ${buttonsDisabled ? "" : "hover:cursor-pointer hover:brightness-125"}`}
        >
          Withdraw
        </button>
        <button
          onClick={handleDeposit}
          disabled={buttonsDisabled}
          className={`bg-blue-600 text-white rounded-md text-2xl p-3 mb-2 mx-2 disabled:opacity-50 ${buttonsDisabled ? "" : "hover:cursor-pointer hover:brightness-125"}`}
        >
          Deposit
        </button>
      </div>

      <div className="flex justify-center rounded-xl items-center overflow-hidden text-3xl mt-2">
        $<input
  type="text"  // Use "text" to prevent leading zeros, then validate input
  value={inputAmount === 0 ? "" : inputAmount}  // Show empty initially
  onChange={(e) => {
    let value = e.target.value;

    // Prevent non-numeric input
    if (!/^\d*$/.test(value)) return;

    // Prevent leading zeros (except if value is empty)
    if (value.startsWith("0") && value.length > 1) {
      value = value.replace(/^0+/, '');
    }

    setInputAmount(value === "" ? "" : Number(value));
  }}
  className="w-[70%] h-[55px] bg-white ml-1 rounded-xl p-2 text-black"
/>

      </div>
    </div>
  );
}
