const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = ctx.createLinearGradient (0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = 'bg.png';
const bg = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleBackground(){
    if(bg.x1 <= -bg.width + gamespeed) bg.x1 = bg.width;
    else bg.x1 -= gamespeed;
    if(bg.x2 <= -bg.width + gamespeed) bg.x2 = bg.width;
    else bg.x2 -= gamespeed;
    ctx.drawImage(background, bg.x1, bg.y, bg.width, bg.height);
    ctx.drawImage(background, bg.x2, bg.y, bg.width, bg.height);

}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(10, canvas.height - 90, 50, 50);
    handleBackground();
    handleObstacles();
    handleParticles();
    dragon.update();
    dragon.draw();
    ctx.fillStyle = gradient ;
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollisions();
    if (handleCollisions()) return;
    requestAnimationFrame(animate);
    angle += 0.12;
    hue++;
    frame++;
}
animate();

window.addEventListener('keydown', function(e) {
    if(e.code === 'Space') spacePressed = true;
});
window.addEventListener('keyup', function(e) {
    if(e.code === 'Space') spacePressed = false;
    dragon.frameX = 0;
});

const bang = new Image();
bang.src = 'bang.png';
function handleCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (dragon.x < 0 + obstaclesArray[i].x + obstaclesArray[i].width &&
            dragon.x + dragon.width > obstaclesArray[i].x &&
            ((dragon.y < 0 + obstaclesArray[i].top && dragon.y + dragon.height > 0) ||
            (dragon.y > canvas.height - obstaclesArray[i].bottom &&
            dragon.y + dragon.height < canvas.height))) {
// Collision detected
                ctx.drawImage(bang, dragon.x, dragon.y, 50, 50);
                ctx.font = "25px Georgia";
                ctx.fillStyle = '#f1f1f1f1';
                ctx.fillText('Game Over, your score is' + " " + score, 160, canvas.height/2 - 10);

                return true;
            }
    }
}

