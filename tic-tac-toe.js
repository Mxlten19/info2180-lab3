// tic-tac-toe.js

document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    const status = document.getElementById('status');
    const newGameBtn = document.querySelector('.btn');
    
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    const originalStatus = status.textContent;
    
    squares.forEach(square => {
        square.classList.add('square');
    });
    
    squares.forEach((square, index) => {
        square.addEventListener('mouseover', function() {
            if (gameActive && gameState[index] === '') {
                this.classList.add('hover');
                this.textContent = currentPlayer;
                this.classList.add(currentPlayer);
            }
        });
        
        square.addEventListener('mouseout', function() {
            if (gameActive && gameState[index] === '') {
                this.classList.remove('hover');
                this.textContent = '';
                this.classList.remove('X', 'O');
            }
        });
        
        square.addEventListener('click', function() {
            if (gameActive && gameState[index] === '') {
                gameState[index] = currentPlayer;
                this.textContent = currentPlayer;
                this.classList.add(currentPlayer);
                this.classList.remove('hover');
                
                checkWinner();
                
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        });
    });
    

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];
        
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
            status.classList.add('you-won');
            gameActive = false;
            return;
        }
        
        if (!gameState.includes('')) {
            status.textContent = "Game ended in a draw!";
            gameActive = false;
        }
    }
    
    newGameBtn.addEventListener('click', function() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O', 'hover');
        });
        
        status.textContent = originalStatus;
        status.classList.remove('you-won');
    });
});