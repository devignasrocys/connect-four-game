// Variables
const play_game_btn = document.getElementById('play-btn');
const rules_btn = document.getElementById('rules-btn');
const rules_check_icon = document.getElementById('rules-check-icon');
const restart_btn = document.getElementById('restart-btn');
const continue_game_btn = document.getElementById('continue-btn');
const restart_btn_2 = document.getElementById('restart-btn-2');
const quit_btn = document.getElementById('quit-btn');
const menu_btn = document.getElementById('menu-btn');
const play_again_btn = document.getElementById('play-again');
const menu = document.getElementById('menu');
const border = document.getElementById('border');
const game_border = document.getElementById('game-border');
const player_marker = document.getElementById('player-marker');
const player_title = document.getElementById('player-title');
const time_counter = document.getElementById('time-counter');
const player1 = document.getElementById('player-x');
const player2 = document.getElementById('player-o');
let player = 'X';
let time = 15;
let interval_id = null;
let is_winner = false;
let scores = {
    X: 0,
    O: 0
}

// Functions
const toggle_display = () => {
    document.querySelector('.choices-container').classList.toggle('display');
    border.classList.toggle('display');
};

const toggle_modal_rules = () => {
    document.querySelector('.rules').classList.toggle('display');
};

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
};

const timer = () => {
    if(time == 0) {
        change_player();
        time = 15;
        clearInterval(timer);
    }
    time_counter.innerText = `${time}s`;
    time--; 
};

const change_player = () => {
    time = 15;
    clearInterval(timer);
    if(player == 'X') {
        player = 'O';
        player_marker.src = './assets/images/yellow.svg';
        player_title.innerText = `PLAYER 2'S TURN`;
    } else {
        player = 'X';
        player_marker.src = './assets/images/red.svg';
        player_title.innerText = `PLAYER 1'S TURN`;
    }
    
};

const draw_marker = (element) => {
    element.addEventListener('click', (e) => {
        if(is_winner) {return}
        let arr_of_circles = [];
        e.target.childNodes.forEach((circle, index) => {
            if(!circle.classList.contains('circle-X') && !circle.classList.contains('circle-O')) {
                arr_of_circles.push(circle);
            }
        })
        if(arr_of_circles.length == 0) {
            return;
        }
        let last_circle = arr_of_circles.slice(-1);
        last_circle[0].classList.add(`circle-${player}`);
    })
    
};

const player_win = () => {
    document.querySelector('.player-turn').classList.toggle('display');
    document.querySelector('.player-win').classList.toggle('display');
    document.querySelector('.player-win-p').innerText = `Player ${player} wins!`;
    if (player == 'X') {
        player1.innerText = `${scores.X}`;
    } else {
        player2.innerText = `${scores.O}`;
    }
}

const check_winner = () => {
    let winner = null;
    let columns = document.querySelectorAll('.column');
    // check for horizontal win
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 6; j++) {
            if(
                columns[i].childNodes[j].classList.contains(`circle-${player}`) && 
                columns[i+1].childNodes[j].classList.contains(`circle-${player}`) && 
                columns[i+2].childNodes[j].classList.contains(`circle-${player}`) && 
                columns[i+3].childNodes[j].classList.contains(`circle-${player}`)) {
                winner = player;
                clearInterval(interval_id);
                scores[winner] += 1;
                is_winner = true;
                player_win();
                return;
            }
        }
    }   
    // check for vertical win
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 6; j++) {
            if(
                columns[j].childNodes[i].classList.contains(`circle-${player}`) && 
                columns[j].childNodes[i+1].classList.contains(`circle-${player}`) && 
                columns[j].childNodes[i+2].classList.contains(`circle-${player}`) && 
                columns[j].childNodes[i+3].classList.contains(`circle-${player}`)) {
                winner = player;
                clearInterval(interval_id);
                scores[winner] += 1;
                is_winner = true;
                player_win();
                return;
            }
        }
    }
    // check for diagonal win
    for(let i = 5; i > 3; i--) {
        for(let j = 0; j < 4; j++) {
            if(
                columns[j].childNodes[i].classList.contains(`circle-${player}`) && 
                columns[j+1].childNodes[i-1].classList.contains(`circle-${player}`) && 
                columns[j+2].childNodes[i-2].classList.contains(`circle-${player}`) && 
                columns[j+3].childNodes[i-3].classList.contains(`circle-${player}`)) {
                winner = player;
                clearInterval(interval_id);
                scores[winner] += 1;
                is_winner = true;
                player_win();
                return;
            }
        }
    }
    
};

const continue_game = () => {
    menu.classList.toggle('display');
    interval_id = setInterval(timer, 1000);
};

const quit_game = () => {
    document.querySelectorAll('.column').forEach(column => {
        column.remove();
    });
    time = 15;
    clearInterval(interval_id);
    menu.classList.toggle('display');
    toggle_display();
};

const restart_game = () => {
    document.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('circle-X');
        circle.classList.remove('circle-O');
    })
    time = 15;
    clearInterval(interval_id);
    interval_id = setInterval(timer, 1000);
    player = 'X';
};

// Event listeners
play_game_btn.addEventListener('click', () => {
    toggle_display();
    draw_board();
    let id = setInterval(timer, 1000);
    interval_id = id;
    document.querySelectorAll('.column').forEach(column => {
        draw_marker(column);
    });
});

game_border.addEventListener('click', (e) => {
    check_winner();
    change_player();
});

restart_btn.addEventListener('click', restart_game);

rules_btn.addEventListener('click', toggle_modal_rules);

rules_check_icon.addEventListener('click', toggle_modal_rules);

menu_btn.addEventListener('click', () => {
    menu.classList.toggle('display');
    clearInterval(interval_id);
});

continue_game_btn.addEventListener('click', continue_game);

restart_btn_2.addEventListener('click', () => {
    menu.classList.toggle('display');
    restart_game();
});

quit_btn.addEventListener('click', quit_game);

play_again_btn.addEventListener('click', () => {
    restart_game();
    document.querySelector('.player-win').classList.toggle('display');
    document.querySelector('.player-turn').classList.toggle('display');
    is_winner = false;
})