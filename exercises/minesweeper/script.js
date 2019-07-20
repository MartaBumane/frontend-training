let field;

function generateEmptyField(size){
    let field = [];

    for(let y= 0; y<size; y++){
        let row= [];
    
        for (let x = 0;x<size; x++){
            
            let cell = {
                x:x,
                y:y,
                isOpen: false,
                isMined: false
            }
            row.push(cell);
        }
    
        field.push(row);
    }
    return field;
}

function fillWithMines(field){
    for(let x in field){
        let row= field[x];
    
        for (let y in row){
            let cell = row[y];
            let shouldPlaceMine = Math.random();
            if(shouldPlaceMine<0.2){
                cell.isMined =true;
            }
        }
    }


}

function findNearbyCells(cell, field){
    let {x, y} = cell;

    //tas pats augsaa, kas uzrakstits zemak
    // let x = cell.x;
    // let y = cell.y;
    let nearByCells = [];

    //right
   if (field[y -1] && field[y -1][x]){
    nearByCells.push(field[y - 1][x])
   }
   //left
   if (field[y + 1] && field[y + 1][x]){
    nearByCells.push(field[y + 1][x])
   }
   //up
   if (field[y] && field[y][x - 1]){
    nearByCells.push(field[y][x - 1])
   }
   //down
   if (field[y] && field[y][x + 1]){
    nearByCells.push(field[y][x + 1])
   }



   if(field[y - 1] && field[y -1][x-1]){
    nearByCells.push(field[y - 1][x-1])
   }
   if(field[y - 1] && field[y - 1][x+1]){
    nearByCells.push(field[y - 1][x+1])
   }
   if(field[y + 1] && field[y+1][x+1]){
        nearByCells.push(field[y+1][x+1])
   }
   if(field[y + 1] && field[y+1][x+1]){
    nearByCells.push(field[y+1][x+1])
   }
    

    return nearByCells;
}


function findBombsCountInNearbyCells(cell, field){
    let nearbyCells = findNearbyCells(cell, field);
    console.log(nearbyCells);
    let count = 0;
    for(let i in nearbyCells){
        if(nearbyCells[i].isMined){
            count++;
        }
    }

    return count;
}

function handleClickOnCell(cell){

    if(cell.isOpen){
        return
    }
    cell.isOpen = true;

    drawField();
    
}

function drawField(){
    let table = document.createElement('table');

    for(let x in field){
        let row = field[x];
        let tr= document.createElement('tr');
        table.appendChild(tr);
        for(let y in row){
            let cell = row[y];
            let td = document.createElement('td');
            
            if(cell.isOpen&&cell.isMined){
                td.className = 'bomb';
            }

            if(cell.isOpen&&!cell.isMined){
                td.className = 'opened-cell';
                let countOfBombs= findBombsCountInNearbyCells(cell, field);
                td.innerText = countOfBombs;
            }

            let onClick = function(){
                handleClickOnCell(cell);
            }
            td.addEventListener("click", onClick);
            tr.appendChild(td);
        }
    }
    

    let container = document.getElementById('table-container');
    if (container.childNodes.length>0){
        container.removeChild(container.childNodes[0]);
    }
    
    container.appendChild(table);
    
}

function initGame(size){
    field = generateEmptyField(size);
    fillWithMines(field); 
    drawField();
    

    
}
initGame(10);