import React, { useContext, useEffect } from 'react'
import { AppContext } from '../App';

function Letter({ letterPos, attemptVal }) {
  const { board, correctword, curattempt,setdisabled} = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctword.toUpperCase()[letterPos] === letter;
  const almost=!correct && letter !== "" && correctword.toUpperCase().includes(letter);

   const letterstate=
    curattempt.attempt>attemptVal &&
   (correct ? "correct" :almost ? "almost":"error");
    
  useEffect(()=>{
      if(letter!=="" && !correct && !almost){
          setdisabled((prev)=>[...prev,letter]);
      }
  },[curattempt.attempt])

  return (
    <div className='letter' id={letterstate}>
      {letter}
    </div>
  )
}

export default Letter