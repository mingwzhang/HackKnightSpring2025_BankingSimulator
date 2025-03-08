'use client'
import { useState, useEffect} from 'react'


export default function Tablet({ customerId , apiKey}) {

      //Get customer account info for tablet        ONCE THE TABLET HAS CUSTOMER'S ID, FIND INFO TO THEIR ACCOUNT
    const [customerAccount, setCustomerAccount] = useState([])
  
    useEffect(() => {
  
        if(!customerId?._id){                                //If there are no customerid api will not call
              console.log("No Customer ID")
              setCustomerAccount([]);    //Empty the list
              return;
        }
  
        fetch(`http://api.nessieisreal.com/customers/${customerId._id}/accounts?key=${apiKey}`)
        .then(res => res.json())
        .then(data => setCustomerAccount(data))
        .catch(err => console.log(err))
    },[customerId])

  
  return (
    <div className="bg-blue-400 h-full w-full font-[ZZZFont]">
      
      <div className="bg-blue-200 overflow-hidden text-black">
        <div className="flex justify-center p-1 text-xl">
          Name: {customerId?.first_name} {" "} {customerId?.last_name}
        </div>
        <div className="flex justify-center p-1 text-xl">
          Account #: {customerAccount[0]?.account_number}
        </div>
        <div className="flex justify-center p-1 text-xl">
          Balance: ${customerAccount[0]?.balance}
        </div>
      </div>

      <div className="flex flex-col justify-center w-full">
        <button className="bg-blue-600 text-white rounded-md text-2xl p-3 hover:cursor-pointer hover:brightness-125 my-2 mt-3 mx-2">Withdraw</button>
        <button className="bg-blue-600 text-white rounded-md text-2xl p-3 hover:cursor-pointer hover:brightness-125 mb-2 mx-2">Deposit</button>
      </div>
      <div className="flex justify-center rounded-xl items-center overflow-hidden text-3xl mt-2">
        $<input type="number" min={0} className=" w-[70%] h-[55px] bg-white ml-1 rounded-xl"></input>
      </div>
    </div>
  )
}
