const gridContainer = document.querySelector('.grid-container');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const randomBtn = document.querySelector('.random-btn');

const numRows = 40;
const numColumns = 70;
const allCells = numRows * numColumns;

let aliveCells = [];
let intervalID;

const createGrid = () => {
    for (let i = 0; i < allCells; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add(`cell-${i}`);
        gridContainer.appendChild(gridItem);

        gridItem.addEventListener("click", (e) => {
            const cellClass = e.target.className;
            if (aliveCells.includes(cellClass)) {
                makeCellDead(cellClass);
            } else {
                makeCellAlive(cellClass);
            }
        });
    }
};

const makeCellAlive = (cellClass) => {
    document.querySelector(`.${cellClass}`).classList.add("alive");
    if (!aliveCells.includes(cellClass)) {
        aliveCells.push(cellClass);
    }
};

const makeCellDead = (cellClass) => {
    document.querySelector(`.${cellClass}`).classList.remove("alive");
    aliveCells = aliveCells.filter(c => c !== cellClass);
};

const getNeighbors = (index) => {
    console.log(numColumns)
    const row = Math.floor(index / numColumns);
    const col = index % numColumns;
    const neighbors = [];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numColumns) {
                neighbors.push(newRow * numColumns + newCol);
            }
        }
    }
    return neighbors;
};

const playGeneration = () => {
    const newAliveCells = [];
    const potentialCells = {};

    aliveCells.forEach(cellClass => {
        const index = +cellClass.split('-')[1];
        const neighbors = getNeighbors(index);
        let aliveNeighborCount = 0;

        neighbors.forEach(neighborIndex => {
            const neighborClass = `cell-${neighborIndex}`;
            if (aliveCells.includes(neighborClass)) {
                aliveNeighborCount++;
            } else {
                potentialCells[neighborClass] = (potentialCells[neighborClass] || 0) + 1;
            }
        });

        if (aliveNeighborCount === 2 || aliveNeighborCount === 3) {
            newAliveCells.push(cellClass);
        }
    });

    for (let [cellClass, count] of Object.entries(potentialCells)) {
        if (count === 3) {
            newAliveCells.push(cellClass);
        }
    }

    aliveCells.forEach(cellClass => makeCellDead(cellClass));
    newAliveCells.forEach(cellClass => makeCellAlive(cellClass));
    aliveCells = newAliveCells;
};

const start = () => {
    if (!intervalID) {
        intervalID = setInterval(playGeneration, 100);
    }
};

const stop = () => {
    clearInterval(intervalID);
    intervalID = null;
};

const randomizeGrid = () => {
    aliveCells.forEach(cellClass => makeCellDead(cellClass));
    aliveCells = [];
    for (let i = 0; i < allCells; i++) {
        if (Math.random() < 0.2) {
            makeCellAlive(`cell-${i}`);
        }
    }
};

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
randomBtn.addEventListener("click", randomizeGrid);

createGrid();
