"use client";
import CustomerBooth from "../components/CustomerBooth";
import DialogueBox from "../components/dialoguebox";
import Tablet from "../components/tablet";
import Desk from "../components/desk";
import chat from "../dialogue/chat.json"

import { useState, useEffect } from 'react'

export default function Home() {
  const key = process.env.NEXT_PUBLIC_API_KEY
  //Get ALL Customers      FOR MAIN AND FOR ROTATION OF CUSTOMERS
  const [customerList, setCustomerList] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(0);
  const [customerExists, customerArrival] = useState(2);
  const [customerMood, setCustomerMood] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [textAdvance, nextText] = useState(0);

  useEffect(() => {
    const fetchCustomersList = () => {
      fetch(`http://api.nessieisreal.com/customers?key=${key}`)
        .then(res => res.json())
        .then(data => { setCustomerList(data); console.log("Customer list updated") })
        .catch(err => console.log(err))
    }

    fetchCustomersList();

    const timer = setInterval(fetchCustomersList, 10000);  //Update every 10 second
    return () => clearInterval(timer); //clean up
  }, [])


  const handleNextCustomer = () => {
    if (customerList.length === 0) return;
    console.log(currentCustomer)
    setCurrentCustomer((currentCustomer + 1) % customerList.length); //Loops back to first customer
    nextText(0);
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
      {/* Background Rectangles with 3D-like shading */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gray-700 opacity-50 z-0"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gray-500 opacity-60 z-0"></div>
      <div className="absolute top-0 left-3/4 w-1/4 h-full bg-gray-800 opacity-50 z-0"></div>
      {/* Invisible Container that Controls Everything Inside */}
      <div
        id="game-container"
        className="relative w-[1200px] h-[800px] scale-100 md:scale-90 lg:scale-75 xl:scale-120 transition-transform duration-300 flex flex-col items-center"
      >
        <div className="flex justify-center">
          <div className={customerExists == 2 ? "hidden" : customerExists ? "flex absolute rounded-2xl overflow-hidden w-[300px] h-[230px] opacity-[85%] top-[-50px] left-44 z-10 animate-fadeIn"
            : "flex absolute rounded-2xl overflow-hidden w-[300px] h-[230px] opacity-[85%] top-[-50px] left-44 z-10 animate-fadeOut"
          }>
            <button className="w-full h-full" onClick={() => {nextText((textAdvance+1) % chat[(currentCustomer) % customerList.length].text.length)}}>
              <DialogueBox currentCustomer={currentCustomer % 13} textAdvance={textAdvance}/>
            </button>
          </div>
        </div>
      {/* Inspector's Booth */}
      <CustomerBooth 
        parentFunction={handleNextCustomer} 
        parentFunction2={customerArrival} 
        customerMood={customerMood} 
        setCustomerMood={setCustomerMood}
        setButtonsDisabled={setButtonsDisabled}
        customerSprite={chat[currentCustomer].image}
      />

        {/* Instruction Panel (Now with perfectly scaled note.png) */}
        <div
          className="absolute left-[calc(76%)] top-20 w-[20%] h-[35%] shadow-md flex items-center justify-center"
          style={{
            backgroundImage: "url('/img/note.png')",
            backgroundSize: "100% 100%",  // Ensures it perfectly fits the container
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
        </div>


        {/* Desk (Trapezoid Shape) */}
        <Desk />

        {/* Handles Next customer logic */}
        <button onClick={handleNextCustomer} className="w-20 text-black"> NEXT ! </button>
        <div className="text-black"> {customerList[currentCustomer]?._id} </div>

        {/* Document System (Transparent Light Blue Box at Bottom Right of Desk) */}
        {/* Document System (Tablet) */}
        <div className={customerExists == 2 ? "hidden" : customerExists ? "absolute bottom-37 right-0 w-[35%] h-[42%] border-4 border-white rounded-2xl overflow-hidden shadow-md flex animate-fadeUp" 
                        : "absolute bottom-37 right-0 w-[35%] h-[42%] border-4 border-white rounded-2xl overflow-hidden shadow-md flex animate-fadeOut"}>
          <Tablet 
            customerId={customerList[currentCustomer]} 
            apiKey={key} 
            customerRequest={chat[currentCustomer].number} 
            requestType={chat[currentCustomer].transaction}
            setCustomerMood={setCustomerMood}
            buttonsDisabled={buttonsDisabled}
            setButtonsDisabled={setButtonsDisabled}
            currentCustomer={currentCustomer % customerList.length}
          />
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