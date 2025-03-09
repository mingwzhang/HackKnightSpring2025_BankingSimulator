import dialogue from "../dialogue/chat.json"

export default function DialogueBox({currentCustomer, textAdvance}) {
  return (
    <div className="flex h-full w-full justify-center bg-blue-200 text-black text-3xl">
      <div className="flex items-center ml-5 mt-2 p-2 font-[ZZZFont]">
        {dialogue[currentCustomer].text[textAdvance]}
      </div>
      <div className="flex items-end absolute right-6 bottom-2 animate-pulse text-4xl">
        {`▼`}
      </div>
    </div>
  )
}
