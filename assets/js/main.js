// Variables
const play_game_btn = document.getElementById('play-btn');
const rules_btn = document.getElementById('rules-btn');
const rules_check_icon = document.getElementById('rules-check-icon');
const restart_btn = document.getElementById('restart-btn');
const border = document.getElementById('border');
const game_border = document.getElementById('game-border');
const player_marker = document.getElementById('player-marker');
const player_title = document.getElementById('player-title')
const time_counter = document.getElementById('time-counter');
let player = 'X';

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
    let time = 15;
    let my_interval = setInterval(() => {
        time--;
        time_counter.innerText = `${time}s`;
        if(time == 0) {
            change_player();
            clearInterval(my_interval);
        }
    }, 1000);
};

const change_player = () => {
    if(player == 'X') {
        player = 'O';
        player_marker.src = './assets/images/yellow.svg'
        player_title.innerText = `PLAYER 2'S TURN`
        timer()
    } else {
        player = 'X';
        player_marker.src = './assets/images/red.svg'
        player_title.innerText = `PLAYER 1'S TURN`
        timer()
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
    let counter = 0;
    let columns = document.querySelectorAll('.column');
    for(let i = 0; i < 3; i++) {
        let circles = columns[i].childNodes
        
        for(let j = 0; j < circles.length; j++) {
            let circles_row = [];
            circles_row.push(columns[i].childNodes);
        }
    }
    console.log(counter);
};

const restart_game = () => {
    document.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('circle-X');
        circle.classList.remove('circle-O');
    })
};

// Event listeners
play_game_btn.addEventListener('click', () => {
    toggle_display();
    timer();
    draw_board();
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