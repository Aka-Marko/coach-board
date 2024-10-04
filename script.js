document.addEventListener('DOMContentLoaded', function () {
    const players = document.querySelectorAll('.player');
    const field = document.getElementById('field');

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
        
        // Flytta spelaren till den nya positionen
        const xPos = event.clientX - field.offsetLeft - 20;  // Anpassning för att centrera spelaren
        const yPos = event.clientY - field.offsetTop - 20;
        
        player.style.position = 'absolute';
        player.style.left = `${xPos}px`;
        player.style.top = `${yPos}px`;

        // Lägg till spelaren på planen om den inte redan är där
        if (!field.contains(player)) {
            field.appendChild(player);
        }

        // Uppdatera spelarens position på sidan
        updatePlayerPosition(playerNumber, xPos, yPos);
    }

    function updatePlayerPosition(playerNumber, xPos, yPos) {
        const positionElement = document.getElementById(`player${playerNumber}-position`);
        if (positionElement) {
            positionElement.textContent = `X: ${xPos}, Y: ${yPos}`;
        }
    }
});
