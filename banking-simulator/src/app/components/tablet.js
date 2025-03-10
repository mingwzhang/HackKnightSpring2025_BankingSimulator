'use client'
import { useState, useEffect } from 'react'
import chat from "../dialogue/chat.json"


export default function Tablet({ customerId, apiKey, currentCustomer, customerRequest, requestType, setCustomerMood, buttonsDisabled, setButtonsDisabled }) {

  //Get customer account info for tablet        ONCE THE TABLET HAS CUSTOMER'S ID, FIND INFO TO THEIR ACCOUNT
  const [customerAccount, setCustomerAccount] = useState([])
  const [inputAmount, setInputAmount] = useState(0);

  useEffect(() => {

    if (!customerId?._id) {                                //If there are no customerid api will not call
      console.log("No Customer ID")
      setCustomerAccount([]);    //Empty the list
      return;
    }

    fetch(`http://api.nessieisreal.com/customers/${customerId._id}/accounts?key=${apiKey}`)
      .then(res => res.json())
      .then(data => setCustomerAccount(data))
      .catch(err => console.log(err))
  }, [customerId])

  const withdrawMoney = (customerId, amount) => {
    fetch(`http://api.nessieisreal.com/accounts/${customerId}/withdrawals?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        medium: "balance",
        transaction_date: new Date().toISOString(),
        amount: amount,
        description: "Withdrawal from account"
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to withdraw: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Withdrawal successful:", data);
      })
      .catch(error => {
        console.error("Error making withdrawal:", error);
      });
  };

  const depositMoney = (customerId, amount) => {

    console.log("Inside Depo", customerId, amount)
    fetch(`http://api.nessieisreal.com/accounts/${customerId}/deposits?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        medium: "balance",
        transaction_date: new Date().toISOString(),
        amount: amount,
        description: "deposit from account"
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to withdraw: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("deposit successful:", data);
      })
      .catch(error => {
        console.error("Error making deposit:", error);
      });
  };

  const handleWithdraw = () => {
    setInputAmount("");
    console.log("Withdraw Clicked");
    // Disable buttons immediately after clicking
    setButtonsDisabled(true);
    if (customerRequest !== inputAmount || requestType !== "withdraw") {
      console.log("Customer is Angry");
      setCustomerMood("angry");
      return;
    }
    const customerBalance = customerAccount[0]?.balance;
    if (customerBalance && inputAmount > customerBalance) {
      console.log("Insufficient funds");
      return;
    }
    setCustomerMood("happy");
    console.log("Withdrawing Amount: ", inputAmount);
    withdrawMoney(customerAccount[0]?._id, inputAmount);
  };

  const handleDeposit = () => {
    // Disable buttons immediately after clicking
    setInputAmount("");
    setButtonsDisabled(true);
    if (customerRequest !== inputAmount || requestType !== "deposit") {
      console.log("Customer is Angry");
      setCustomerMood("angry");
      return;
    }
    setCustomerMood("happy");
    console.log("Depositing amount: ", inputAmount);
    depositMoney(customerAccount[0]?._id, inputAmount);
  };

  if(!currentCustomer){
    return <div className="flex bg-white w-full h-full text-black text-3xl justify-center text-center items-center">This error only occurs with Alex, and we don't know why. Just click the emergency button. </div>
  }
  
  return (
    <div className="bg-blue-400 h-full w-full font-[ZZZFont]">

      <div className="bg-blue-200 overflow-hidden text-black">
        <div className="flex justify-center p-1 text-xl">
          {/* Name: {customerId?.first_name} {" "} {customerId?.last_name} */}
          Name: {chat[currentCustomer].first_name} {chat[currentCustomer].last_name}
        </div>
        <div className="flex justify-center p-1 text-xl">
          Account #: {customerAccount[0]?.account_number}
        </div>
        <div className="flex justify-center p-1 text-xl">
          Balance: ${customerAccount[0]?.balance}
        </div>
      </div>

      <div className="flex flex-col justify-center w-full">
        <button
          onClick={handleWithdraw}
          disabled={buttonsDisabled}
          className={`bg-blue-600 text-white rounded-md text-2xl p-3 my-2 mt-3 mx-2 disabled:opacity-50 ${buttonsDisabled ? "" : "hover:cursor-pointer hover:brightness-125"
            }`}
        >
          Withdraw
        </button>
        <button
          onClick={handleDeposit}
          disabled={buttonsDisabled}
          className={`bg-blue-600 text-white rounded-md text-2xl p-3 mb-2 mx-2 disabled:opacity-50 ${buttonsDisabled ? "" : "hover:cursor-pointer hover:brightness-125"
            }`}
        >
          Deposit
        </button>

      </div>
      <div className="flex justify-center rounded-xl items-center overflow-hidden text-3xl mt-2">
        $<input type="number" min={0} onChange={(e) => setInputAmount(Number(e.target.value))} className="w-[70%] h-[55px] bg-white ml-1 rounded-xl p-2 text-black"></input>
      </div>
    </div>
  )
}
