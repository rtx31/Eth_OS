const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.5;
let keys = {};

let player = {
    x: 50,
    y: 300,
    width: 40,
    height: 60,
    dy: 0,
    grounded: false,
    img: new Image()
};

player.img.src = 'logo.png';

let platforms = [
    {x: 0, y: 360, width: 800, height: 40},
    {x: 200, y: 300, width: 100, height: 20},
    {x: 400, y: 250, width: 100, height: 20}
];

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
    // Gerakan horizontal
    if (keys['ArrowRight']) player.x += 5;
    if (keys['ArrowLeft']) player.x -= 5;

    // Lompatan
    if (keys['Space'] && player.grounded) {
        player.dy = -10;
        player.grounded = false;
    }

    // Gravity
    player.y += player.dy;
    player.dy += gravity;

    // Cek platform
    player.grounded = false;
    platforms.forEach(p => {
        if (player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y < p.y + p.height &&
            player.y + player.height > p.y) {
            player.y = p.y - player.height;
            player.dy = 0;
            player.grounded = true;
        }
    });

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw platforms
    ctx.fillStyle = '#654321';
    platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
    
    // Draw player
    ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
}

player.img.onload = () => {
    update();
};
