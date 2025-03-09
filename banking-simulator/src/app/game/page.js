"use client";
import CustomerBooth from "../components/CustomerBooth";
import DialogueBox from "../components/dialoguebox";
import Tablet from "../components/tablet";
import Desk from "../components/desk";

import { useState, useEffect} from 'react'

export default function Home() {

      const key = process.env.NEXT_PUBLIC_API_KEY
      //Get ALL Customers      FOR MAIN AND FOR ROTATION OF CUSTOMERS
      const [customerList, setCustomerList] = useState([]);
      const [currentCustomer, setCurrentCustomer] = useState(0);
      const [customerExists, customerArrival] = useState(0);
      const [customerMood, setCustomerMood] = useState("");
    
      useEffect(() => {
            const fetchCustomersList = () => {
              fetch(`http://api.nessieisreal.com/customers?key=${key}`)
              .then(res => res.json())
              .then(data => {setCustomerList(data); console.log("Customer list updated" )})
              .catch(err => console.log(err))
            }

            fetchCustomersList();

            const timer = setInterval(fetchCustomersList, 10000);  //Update every 10 second
            return () => clearInterval(timer); //clean up
      },[])


      const handleNextCustomer = () => {
        if (customerList.length === 0) return;
        console.log(currentCustomer)
        setCurrentCustomer((currentCustomer + 1) % customerList.length); //Loops back to first customer
      };
      

    return (
<div className="flex items-center justify-center min-h-screen py-50 bg-gray-100"
      style={{
        backgroundImage: "url('/img/bank_background_texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
>
        
        {/* Invisible Container that Controls Everything Inside */}
        <div 
          id="game-container" 
          className="relative w-[1200px] h-[800px] scale-100 md:scale-90 lg:scale-75 xl:scale-120 transition-transform duration-300 flex flex-col items-center"
        >
        <div className="flex justify-center">
          <div className={customerExists ? "flex absolute rounded-2xl overflow-hidden w-[800px] h-[130px] opacity-[80%] mt-0 z-10 animate-fadeIn"
            : "flex absolute rounded-2xl overflow-hidden w-[800px] h-[130px] opacity-75 mt-0 z-10 animate-fadeOut"
          }>
            <DialogueBox/>
          </div>
        </div>
          {/* Inspector's Booth (Blue Holographic Screen) */}
          <CustomerBooth parentFunction={handleNextCustomer} parentFunction2={customerArrival} customerMood={customerMood}/>

          {/* Instruction Panel (Right of Booth, No Gap, Aligned at the Top) */}
          <div className="absolute left-[calc(75%)] top-20 w-[15%] h-[25%] bg-yellow-300 shadow-md flex items-center justify-center">
            <p className="text-lg font-semibold text-gray-700">Instruction</p>a
          </div>

          {/* Desk (Trapezoid Shape) */}
          <Desk/>
          
          {/* Handles Next customer logic */}
          <button onClick={handleNextCustomer} className="w-20 text-black"> NEXT ! </button>
          <div className ="text-black"> {customerList[currentCustomer]?._id} </div>

          {/* Document System (Transparent Light Blue Box at Bottom Right of Desk) */}
          <div className={customerExists ? "absolute bottom-37 right-0 w-[35%] h-[42%] border-4 border-white rounded-2xl overflow-hidden shadow-md flex animate-fadeUp" 
          : "absolute bottom-37 right-0 w-[35%] h-[42%] border-4 border-white rounded-2xl overflow-hidden shadow-md flex animate-fadeOut"}>
            <Tablet customerId={customerList[currentCustomer]} apiKey={key} customerRequest={100} requestType={"deposit"}setCustomerMood={setCustomerMood}/>
          </div>
        </div>

        {/* Tailwind Custom Styles for Trapezoid */}
              
        <style jsx>{`

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.85;
          }
        }
        @keyframes fadeUp {
          from {
            transform: translateX(0) translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0);
            opacity: 0.85;
          }
        }
        @keyframes fadeOut {
          from {
            transform: translateX(0);
            opacity: 0.85;
          }
          to {
            transform: translateX(0);
            opacity: 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
        .animate-fadeUp {
          animation: fadeUp 1s ease-in-out forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 1s ease-in-out forwards;
        }`}
        </style>
      </div>
    );
}