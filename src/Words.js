import wordbank from "./wordle-bank.txt";
export const boarddefault=[
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
];

export const generateWordset=async()=>{
    let wordset;
    let todayword;

    await fetch(wordbank)
    .then((response)=>response.text()) 
    .then((result)=>{
        const wordarr=result.split("\r\n");
        todayword=wordarr[Math.floor(Math.random()*wordarr.length)];
        wordset=new Set(wordarr);
    });
    return {wordset,todayword};
}