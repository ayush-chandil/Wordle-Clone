import "./App.css";
import React, { useEffect, useState } from 'react';
import Board from "./components/Board";
import KeyBoard from "./components/KeyBoard";
import { boarddefault, generateWordset } from "./Words";
import { createContext } from "react";
import Gameover from "./components/Gameover";

export const AppContext = createContext();

function App() {
  const [board, setboard] = useState(boarddefault);
  const [curattempt, setcurattempt] = useState({ attempt: 0, letterpos: 0 });
  const [wordset, setwordset] = useState(new Set());
  const [disabled, setdisabled] = useState([]);
  const [gameover, setgameover] = useState({ gameover: false, guessword: false })
  const [correctword, setcorrectword] = useState("");


  useEffect(() => {
    generateWordset().then((words) => {
      setwordset(words.wordset);
      setcorrectword(words.todayword.toUpperCase());
    })

  }, [])


  const onenter = () => {
    if (curattempt.letterpos !== 5) return;

    let curword = "";

    for (let i = 0; i < 5; i++) {
      curword += board[curattempt.attempt][i];
    }

    if (wordset.has(curword.toLowerCase())) {
      setcurattempt({ attempt: curattempt.attempt + 1, letterpos: 0 })
    }
    else {
      alert("Word not found");
    }

    if (curword === correctword) {
      setgameover({ gameover: true, guessword: true })
      return;
    }

    if (curattempt.attempt === 5) {
      setgameover({ gameover: true, guessword: false })
    }


  };



  const onselectletter = (keyval) => {
    if (curattempt.letterpos > 4) return;

    const newboard = [...board];
    newboard[curattempt.attempt][curattempt.letterpos] = keyval;
    setboard(newboard);
    setcurattempt({ ...curattempt, letterpos: curattempt.letterpos + 1 });
  }

  const ondelete = () => {
    if (curattempt.letterpos === 0) return;
    const newboard = [...board];
    newboard[curattempt.attempt][curattempt.letterpos - 1] = "";
    setboard(newboard);
    setcurattempt({ ...curattempt, letterpos: curattempt.letterpos - 1 });
  }

  

  return (
    <div className="App">
      <nav>
        <h1>WORDLE</h1>
      </nav>
      <AppContext.Provider value={{ board, setboard, curattempt, setcurattempt, onselectletter, ondelete, onenter, correctword, disabled, setdisabled, setgameover, gameover }}>
        <div className="game">
          <Board />
          {gameover.gameover ? <Gameover /> : <KeyBoard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
