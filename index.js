const gridContainer = document.querySelector('.grid-container');
const startBtn = document.querySelector('.start-btn')
const stopBtn = document.querySelector('.stop-btn')

const numRows = 40;
const numColumns = 70;
const allCells = numRows * numColumns;

let aliveCells = [];

const makeCellAlive = (e) => {
    const cell = document.querySelector(`.${e.target.className}`);
    cell.classList.add("alive");
    aliveCells.push(e.target.className);
};

const makeCellDead = (e) => {
    const cell = document.querySelector(`.${e.target.className.slice(0,-6)}`);
    aliveCells = aliveCells.filter(cell => cell != e.target.className);
    cell.classList.remove("alive");
};

const createGrid = () => {
    for (let i = 0; i < allCells; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add(`cell-${i}`);
        gridContainer.appendChild(gridItem);

        const cell = document.querySelector(`.cell-${i}`);
        cell.addEventListener("click",(e) => { 
            if(cell.classList.contains('alive')){
                makeCellDead(e);
            } else {
                makeCellAlive(e);
            }
        });
    };
};

createGrid();

const playGneneration = () => {
    const deadCellsInGeneration = [];

    aliveCells.forEach(cell =>{
        const cellNeighborRight = document.querySelector(`.cell-${+(cell.slice(5,-6)) + 1}`);
        const cellNeighborLeft = document.querySelector(`.cell-${+(cell.slice(5,-6)) -1}`);
        const cellNeighborUp = document.querySelector(`.cell-${+(cell.slice(5,-6)) -70}`);
        const cellNeighborDown = document.querySelector(`.cell-${ +(cell.slice(5,-6)) +70}`);

        const cellNeighbors = [cellNeighborRight, cellNeighborLeft, cellNeighborUp, cellNeighborDown];
        const aliveNeighbor = [];

        cellNeighbors.forEach(neighbor => neighbor !== null & neighbor.classList.contains('alive') && aliveNeighbor.push(neighbor.className))

        if(aliveNeighbor < 2){
            deadCellsInGeneration.push(cell);
        } else if (aliveNeighbor >= 4){
            deadCellsInGeneration.push(cell);
        }
        
        console.log(aliveNeighbor)
    })

    console.log(deadCellsInGeneration)
}


const start = () => {
    const newGeneration = [];

    intervalID  = setInterval(()=>{
      playGneneration()
    },1000); 
}

const stop = () => {
    clearInterval(intervalID)
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);


