import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Notification({message,type,isVisible,onClose}){

useEffect(()=>{

if(isVisible){

const timer = setTimeout(()=>{
onClose();
},4000);

return ()=>clearTimeout(timer);

}

},[isVisible,onClose]);

return(

<AnimatePresence>

{isVisible && (

<motion.div
initial={{opacity:0,x:100}}
animate={{opacity:1,x:0}}
exit={{opacity:0,x:100}}
className={`fixed top-10 right-5 z-[1000] flex items-center p-4 min-w-[300px] bg-[#0d1117] border-l-4 rounded-md shadow-2xl ${
type==="success"
? "border-green-500"
: "border-red-500"
}`}
>

<div className="flex flex-col">

<span className="text-white text-sm font-semibold">
{type==="success"?"Success":"Error"}
</span>

<span className="text-neutral-400 text-xs mt-1">
{message}
</span>

</div>

<button
onClick={onClose}
className="ml-auto text-neutral-500 hover:text-white"
>
✕
</button>

</motion.div>

)}

</AnimatePresence>

);

}