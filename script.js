document.addEventListener('DOMContentLoaded', function () {
    const players = document.querySelectorAll('.player');
    const ball = document.getElementById('ball');
    const field = document.getElementById('field');

    // Ladda spelarnas positioner från localStorage
    loadPlayerPositions();

    players.forEach(player => {
        player.addEventListener('dragstart', dragStart);
    });

    ball.addEventListener('dragstart', dragStart);

    field.addEventListener('dragover', allowDrop);
    field.addEventListener('drop', drop);

    function dragStart(event) {
        event.dataTransfer.setData('text', event.target.id);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData('text');
        const draggedElement = document.getElementById(draggedElementId);
        
        const xPos = event.clientX - field.offsetLeft - 15;  // Anpassning för att centrera
        const yPos = event.clientY - field.offsetTop - 15;

        draggedElement.style.position = 'absolute';
        draggedElement.style.left = `${xPos}px`;
        draggedElement.style.top = `${yPos}px`;

        if (!field.contains(draggedElement)) {
            field.appendChild(draggedElement);
        }

        // Om elementet är en spelare, uppdatera dess position
        if (draggedElement.classList.contains('player')) {
            const playerNumber = draggedElement.dataset.number;
            updatePlayerPosition(playerNumber, xPos, yPos);
            savePlayerPosition(playerNumber, xPos, yPos);
        } else if (draggedElement.id === 'ball') {
            // Om det är bollen, spara bollens position
            updateBallPosition(xPos, yPos);
            saveBallPosition(xPos, yPos);
        }
    }

    function updatePlayerPosition(playerNumber, xPos, yPos) {
        const positionElement = document.getElementById(`player${playerNumber}-position`);
        if (positionElement) {
            positionElement.textContent = `X: ${xPos}, Y: ${yPos}`;
        }
    }

    function updateBallPosition(xPos, yPos) {
        const ballPositionElement = document.getElementById('ball-position');
        if (ballPositionElement) {
            ballPositionElement.textContent = `X: ${xPos}, Y: ${yPos}`;
        }
    }

    function savePlayerPosition(playerNumber, xPos, yPos) {
        localStorage.setItem(`player${playerNumber}`, JSON.stringify({ x: xPos, y: yPos }));
    }

    function saveBallPosition(xPos, yPos) {
        localStorage.setItem('ball', JSON.stringify({ x: xPos, y: yPos }));
    }

    function loadPlayerPositions() {
        players.forEach(player => {
            const playerNumber = player.dataset.number;
            const savedPosition = JSON.parse(localStorage.getItem(`player${playerNumber}`));

            if (savedPosition) {
                const { x, y } = savedPosition;
                player.style.position = 'absolute';
                player.style.left = `${x}px`;
                player.style.top = `${y}px`;

                updatePlayerPosition(playerNumber, x, y);

                if (!field.contains(player)) {
                    field.appendChild(player);
                }
            }
        });

        // Ladda bollens position från localStorage
        const savedBallPosition = JSON.parse(localStorage.getItem('ball'));
        if (savedBallPosition) {
            const { x, y } = savedBallPosition;
            ball.style.position = 'absolute';
            ball.style.left = `${x}px`;
            ball.style.top = `${y}px`;

            updateBallPosition(x, y);
        }
    }
});
