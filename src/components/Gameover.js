import React,{useContext} from 'react'
import { AppContext } from '../App';

function Gameover() {
    const {gameover,curattempt,correctword}=useContext(AppContext);
    return (
    <div className='gameover'>
        <h3>{gameover.guessword? "You correctly guessed" :"You failed"}</h3>
        <h3>Correct:{correctword}</h3>
        {gameover.guessword &&(
            <h3>You guessed in {curattempt.attempt}  attempts</h3>
        )}
    </div>
  )
}

export default Gameover