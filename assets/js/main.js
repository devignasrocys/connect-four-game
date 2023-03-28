// Variables
const play_game_btn = document.getElementById('play-btn');
const rules_btn = document.getElementById('rules-btn');
const border = document.getElementById('border');
const game_border = document.getElementById('game-border');
let player = 'X'

// Functions
const toggle_display = () => {
    document.querySelector('.choices-container').classList.toggle('display')
    border.classList.toggle('display')
}

const draw_board = () => {
    for(let i = 0; i < 7; i++) {
        let column = document.createElement('div');
        column.classList.add('column');
        for(let j = 0; j < 6; j++) {
            const div = document.createElement('div');
            div.classList.add('circle');
            column.appendChild(div);
        }
        game_border.appendChild(column);
    }
}

const change_player = () => {
    if(player == 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
};

// Function calls
draw_board();

// Event listeners
play_game_btn.addEventListener('click', toggle_display);
game_border.addEventListener('click', (e) => {
    change_player();
});