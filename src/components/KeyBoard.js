import React,{useContext,useCallback, useEffect} from 'react'
import { AppContext } from '../App';
import Key from "./Key";

function KeyBoard() {
  const keys1=["Q","W","E","R","T","Y","U","I","O","P"];
  const keys2=["A","S","D","F","G","H","J","K","L"];
  const keys3=["Z","X","C","V","B","N","M"];

  const {onenter,ondelete,onselectletter,disabled}=useContext(AppContext);

  const handlekeyboard=useCallback((event)=>{
    
    if(event.key==='Enter'){
      onenter();
    }

    else if(event.key==='Backspace'){
       ondelete();
    }
     else{
      keys1.forEach((key)=>{
         if(event.key.toLowerCase()===key.toLowerCase()){
          onselectletter(key);
         }  
      });

      keys2.forEach((key)=>{
        if(event.key.toLowerCase()===key.toLowerCase()){
         onselectletter(key);
        }  
     });

     keys3.forEach((key)=>{
      if(event.key.toLowerCase()===key.toLowerCase()){
       onselectletter(key);
      }  
   });
     }
      
     
  })

  useEffect(()=>{
    document.addEventListener("keydown",handlekeyboard);
    
    return ()=>{
      document.removeEventListener("keydown",handlekeyboard);
    }

  },[handlekeyboard]);

  return (
    <div className='keyboard' onKeyDown={handlekeyboard}>
       <div className='line1'>
         {keys1.map((key)=>{
           return <Key keyval={key} disabled={disabled.includes(key)}/>
         })}
       </div>

       <div className='line2'>
       {keys2.map((key)=>{
           return <Key keyval={key} disabled={disabled.includes(key)}/>
         })}
       </div>

       <div className='line3'>
       <Key keyval={"DELETE"} bigkey/>
       {keys3.map((key)=>{
            return <Key keyval={key} disabled={disabled.includes(key)}/>
         })}
         <Key keyval={"ENTER"} bigkey/>
       </div>
      </div>
  )
}

export default KeyBoard