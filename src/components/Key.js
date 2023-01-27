import React,{useContext} from 'react'
import { AppContext } from '../App';

function Key({keyval,bigkey,disabled}) {
  
  const{onselectletter,ondelete,onenter}=useContext(AppContext);
  
    
  const selectLetter=()=>{
    
    if(keyval==="ENTER"){
      onenter();
    }
     
    else if(keyval==="DELETE") {
        ondelete();
    }
      
    else {
      onselectletter(keyval);

    }
  }
 
    return (
    <div className='key' id={bigkey ? "big": disabled && "disabled"} onClick={selectLetter}>{keyval}</div>
  )
}

export default Key