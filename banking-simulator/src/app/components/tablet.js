function Tablet({customerName, accountNumber, accountBalance}) {
  return (
    <div className="bg-blue-400 h-full w-full font-[ZZZFont]">
      <div className="bg-blue-200 overflow-hidden">
        <div className="flex justify-center p-1 text-xl">
          Name: {customerName}
        </div>
        <div className="flex justify-center p-1 text-xl">
          Account Number: {accountNumber}
        </div>
        <div className="flex justify-center p-1 text-xl">
          Balance: ${accountBalance}
        </div>
      </div>
      <div className="flex flex-col justify-center w-full">
        <button className="bg-blue-600 text-white rounded-md text-3xl p-4 hover:cursor-pointer hover:brightness-125 my-2 mt-3 mx-2">Withdraw</button>
        <button className="bg-blue-600 text-white rounded-md text-3xl p-4 hover:cursor-pointer hover:brightness-125 mb-2 mx-2">Deposit</button>
      </div>
      <div className="flex justify-center rounded-xl items-center overflow-hidden mt-3">
        <input type="number" min={0} className=" w-[80%] h-[80px] text-3xl bg-white rounded-xl"></input>
      </div>
    </div>
  )
}

export default Tablet
