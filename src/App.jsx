import {useState} from 'react';

function Square({value, onSquareClick}){
  return(
    <button className="bg-slate-200 border-gray-300 h-20 w-20 m-1 text-3xl" onClick={onSquareClick}>{value}</button>
  )
}

function Board({xIsNext, squares, onPlay}){
  const winner = calculateWinner(squares);
  let status;
    if(winner){
      status = `Winner : ${winner}`
    } else{
      status = "Up Next :" + (xIsNext ? "✖" : "🔘")
    }

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "✖";
    } else{
      nextSquares[i] = "🔘";
    }
    onPlay(nextSquares);
  }
    return (
       <>
          <div className="m-1">
            <h1 className="m-1 w-64 text-xl font-semibold mb-2">{status}</h1>
            <div className="flex">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
              <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
              <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="flex">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
              <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
              <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="flex">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
              <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
              <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
          </div>
       </>
    );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(move){
    setCurrentMove(move);
    setXIsNext(move % 2 == 0)
  }

  function onReset(){
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = `Go to the move no ${move}`
    } else{
      description = `Start the Game Now`
    }
    return(
      <li key={description}>
        <button className="w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-sm shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-400 m-1" onClick={()=> jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return(
    <>
      <div className="flex flex-col sm:flex-row justify-start lg:justify-center items-start h-screen p-5 ">
        <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div>
        <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-sm shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-gray-900 m-1" onClick={onReset}>Reset</button>
        <ol className="flex flex-col flex-wrap justify-center items-center">
          {moves}
        </ol>
        </div>
      </div>
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null;
}