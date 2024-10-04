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
        player.style.position = 'absolute';
        player.style.left = (event.clientX - 20) + 'px';
        player.style.top = (event.clientY - 20) + 'px';

        // Lägg till spelaren på planen om den inte redan är där
        if (!field.contains(player)) {
            field.appendChild(player);
        }
    }
});
