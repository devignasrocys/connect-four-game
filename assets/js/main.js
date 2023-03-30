// Variables
const play_game_btn = document.getElementById('play-btn');
const rules_btn = document.getElementById('rules-btn');
const rules_check_icon = document.getElementById('rules-check-icon');
const restart_btn = document.getElementById('restart-btn');
const continue_game_btn = document.getElementById('continue-btn');
const restart_btn_2 = document.getElementById('restart-btn-2');
const quit_btn = document.getElementById('quit-btn');
const menu_btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const border = document.getElementById('border');
const game_border = document.getElementById('game-border');
const player_marker = document.getElementById('player-marker');
const player_title = document.getElementById('player-title');
const time_counter = document.getElementById('time-counter');
let player = 'X';
let time = 15;
let interval_id = null;

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
        player_marker.src = './assets/images/yellow.svg'
        player_title.innerText = `PLAYER 2'S TURN`
    } else {
        player = 'X';
        player_marker.src = './assets/images/red.svg'
        player_title.innerText = `PLAYER 1'S TURN`
    }
    
};

const draw_marker = (element) => {
    element.addEventListener('click', (e) => {
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

const check_winner_row = () => {
};

const continue_game = () => {
    menu.classList.toggle('display');
    interval_id = setInterval(timer, 1000);
};

const quit_game = () => {
    document.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('circle-X');
        circle.classList.remove('circle-O');
    })
    time = 15;
    clearInterval(interval_id);
    toggle_display();
    menu.classList.toggle('display');
};

const restart_game = () => {
    document.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('circle-X');
        circle.classList.remove('circle-O');
    })
    time = 15;
    clearInterval(interval_id);
    interval_id = setInterval(timer, 1000);
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
    change_player();
    check_winner_row();
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