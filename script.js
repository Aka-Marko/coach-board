document.addEventListener('DOMContentLoaded', function () {
    const players = document.querySelectorAll('.player');
    const field = document.getElementById('field');

    // Ladda sparade positioner från localStorage
    loadPlayerPositions();

    players.forEach(player => {
        player.addEventListener('dragstart', dragStart);
    });

    field.addEventListener('dragover', allowDrop);
    field.addEventListener('drop', drop);

    function dragStart(event) {
        event.dataTransfer.setData('text', event.target.dataset.number);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const playerNumber = event.dataTransfer.getData('text');
        const player = document.querySelector(`.player[data-number="${playerNumber}"]`);
        
        const xPos = event.clientX - field.offsetLeft - 20;
        const yPos = event.clientY - field.offsetTop - 20;

        player.style.position = 'absolute';
        player.style.left = `${xPos}px`;
        player.style.top = `${yPos}px`;

        if (!field.contains(player)) {
            field.appendChild(player);
        }

        // Uppdatera och spara position
        updatePlayerPosition(playerNumber, xPos, yPos);
        savePlayerPosition(playerNumber, xPos, yPos);
    }

    function updatePlayerPosition(playerNumber, xPos, yPos) {
        const positionElement = document.getElementById(`player${playerNumber}-position`);
        if (positionElement) {
            positionElement.textContent = `X: ${xPos}, Y: ${yPos}`;
        }
    }

    function savePlayerPosition(playerNumber, xPos, yPos) {
        localStorage.setItem(`player${playerNumber}`, JSON.stringify({ x: xPos, y: yPos }));
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
    }
});
