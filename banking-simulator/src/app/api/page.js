'use client'
import { useState, useEffect } from 'react'



export default function api(){

    const key = process.env.NEXT_PUBLIC_API_KEY

    /* NOTE THIS IS AN API LIBRARY, CONSIDER READING THROUGH IT TO SEE WHAT IT DOES, NOT MEANT TO WORK BY ITSELF */

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Get ALL Customers      FOR MAIN AND FOR ROTATION OF CUSTOMERS
    const [customerList, setCustomerList] = useState([])

    useEffect(() => {
        fetch(`https://api.nessieisreal.com/customers?key=${key}`)
        .then(res => res.json())
        .then(data => setCustomerList(data))
        .catch(err => console.log(err))
    },[])


    //Get customer account info for tablet        ONCE THE TABLET HAS CUSTOMER'S ID, FIND INFO TO THEIR ACCOUNT
    const [customerAccountId, setCustomerAccountId] = useState([])

    useEffect(() => {

        if(!customerAccountId){                                //If there are no customerid api will not call
            console.log("No Customers")
            return;
        }

        fetch(`https://api.nessieisreal.com/customers/${customerAccountId}/accounts?key=${key}`)
        .then(res => res.json())
        .then(data => setCustomerAccountId(data))
        .catch(err => console.log(err))
    },[])

    //getCustomerAccountinfo handler
    const getCustomerAccountInfoClickHandler = (id) =>{
        if (!id){
            console.log("No ID")
            return
        }
        setCustomerAccountId(id)
        console.log(customerAccountId)
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //Get Customer bsed on ID for the tablet    ONCE THE TABLET HAS CUSTOMER'S ID, ALSO FIND INFO OF THEIR NAME


    const [customerid, setCustomerid] = useState('')
    const [customerData, setCustomerData] = useState([])
    const [toggle, setToggle] = useState(0)              //Toggle is optional tbh

    useEffect(() => {

        if(!customerid){                                //If there are no customerid api will not call
            console.log("No Customers")
            return;
        }

        fetch(`https://api.nessieisreal.com/customers/${customerid}?key=${key}`)
        .then(res => res.json())
        .then(data => setCustomerData(data))
        .catch(err => console.log(err))
    },[toggle]);                        //API will call if customerid is changed

    // Get Customer bsed on ID for the tablet Handler

    const getCustomerInfoClickHandler = (id) =>{

        setToggle(!toggle)
        if (!id){
            return
        }
        setCustomerid(id)
        console.log(customerid)
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //WITHDRAW API BASED ON _ID

    const withdrawMoney = (customerId, amount) => {
        fetch(`https://api.nessieisreal.com/accounts/${customerId}/withdrawals?key=${key}`, {
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
        fetch(`https://api.nessieisreal.com/accounts/${customerId}/deposits?key=${key}`, {
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


    return(
        <div className="h-[1000px] w-[1000px]">

            <button onClick={() => getCustomerInfoClickHandler(/* Insert the id customer*/)} className="bg-stone-500 w-20">
                GET CUSTOMER BUTTON
            </button>
            <div className="text-white">
                {customerData?.first_name}
            </div>

            <button className="bg-stone-500 w-20">
                GET ALL CUSTOMERS BUTTON 
            </button>
            <div className="text-white">
                {customerList[0] ? customerList[0]?._id : "Nothing"}
            </div>


            <button onClick={() => getCustomerAccountInfoClickHandler()} className="bg-stone-500 w-20">
                GET CUSTOMER's ACCOUNT INFO BUTTON 
            </button>
            <div className="text-white">
                {customerAccountId[0] ? customerAccountId[0]?.balance : "Nothing"}
            </div>

            <button onClick={() => withdrawMoney("67cbbe3e9683f20dd518d74b", 1000)} className="bg-stone-500 w-20">
                WITHDRAW BUTTON
            </button>
            <div className="text-white">
            </div>

            <button onClick={() => depositMoney("67cbbe3e9683f20dd518d74b", 1000)} className="bg-stone-500 w-20">
                DEPOSIT BUTTON
            </button>
            <div className="text-white">
            </div>

            Hello
        </div>
    )
}