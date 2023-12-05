
const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext('2d');
// Constants
const CANVAS_WIDTH = canvasEl.getBoundingClientRect().width;
const CANVAS_HEIGHT = canvasEl.getBoundingClientRect().height;

//BG MAP
// mapBg = new Image();
// mapBg.src = "./assets/images/sand-map.png";
// mapWidth = CANVAS_WIDTH;
// mapHeight = CANVAS_HEIGHT;


const KEYS = {
    arrowUp: { isPressed: false },
    arrowDown: { isPressed: false },
    arrowLeft: { isPressed: false },
    arrowRight: { isPressed: false },

    k: { isPressed: false },


    w: { isPressed: false },
    s: { isPressed: false },
    a: { isPressed: false },
    d: { isPressed: false }
}

const sandMap = new Map({
    imageSrc: "./images/sand-map.png",
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    borders: {
        top: 125,
        left: 0,
        right: 0,
        bottom: 110
    },

    player1StartingCordinates: {
        x: 140,
        y: 180
    },
    player2StartingCordinates: {
        x: 620,
        y: 180
    },


});
// Add onload and onerror events
sandMap.image.onload = function () {
    console.log("Sand map image loaded successfully.");
};
sandMap.image.onerror = function () {
    console.error("Error loading sand map image.");
};

const winterMap = new Map({
    imageSrc: "./images/snow-map.png",
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    borders: {
        top: 125,
        left: 0,
        right: 230,
        bottom: 0
    },

    player1StartingCordinates: {
        x: 90,
        y: 180
    },
    player2StartingCordinates: {
        x: 180,
        y: 180
    },

});

const orientalMap = new Map({
    imageSrc: "./images/oriental-map.png",
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    borders: {
        top: 0,
        left: 0,
        right: 490,
        bottom: 0
    },
    player1StartingCordinates: {
        x: 90,
        y: 180
    },
    player2StartingCordinates: {
        x: 180,
        y: 180
    },

});


let currentMap = orientalMap;


// create player 1
// let player1x = 50;
// let player1y = 100;
// ctx.fillStyle = "blue";
// ctx.fillRect(player1x, player1y, 25, 25);
const player1 = new Player(currentMap.player1StartingCordinates.x, currentMap.player1StartingCordinates.y, "blue", "./images/lundet_guy.png");  // Objekt skapas med x,y,width,height som kan ritas ut, som kan flytta sin position
// player 2
// let player2x = 150;
// let player2y = 100;
// ctx.fillStyle = "red";
// ctx.fillRect(player2x, player2y, 25, 25);
const player2 = new Player(currentMap.player2StartingCordinates.x, currentMap.player2StartingCordinates.y, "red", "./images/punk_guy_green.png");  // Objekt skapas med x,y,width,height som kan ritas ut, som kan flytta sin position
let isCollidingLeft = false;
let isCollidingRight = false;
let isCollidingTop = false;
let isCollidingBottom = false;

function handleInput(keys, map) {
    // DONE: make a barriers such that the players cannot move
    // out of the canvas bounds
    // DONE 1: Stop the player 1 from moving top above the canvas
    // DONE 2: Stop the player 1 from moving down below the canvas
    // DONE 3: Stop the player 1 from moving left outside the canvas
    // DONE 4: Stop the player 1 from moving right outside the canvas
    // DONE 5: Stop the player 2 as well from all directions

    const borders = map.borders;

    // player 1


    if (keys.arrowUp.isPressed && player1.y > borders.top && !isCollidingTop) {
        player1.move(0, -1, 3);
    }

    if (keys.arrowDown.isPressed && (player1.y + player1.height) < CANVAS_HEIGHT - borders.bottom && !isCollidingBottom) {
        player1.move(0, 1, 0);
    }
    if (keys.arrowLeft.isPressed && player1.x > borders.left && !isCollidingLeft) {
        player1.move(-1, 0, 1);
    }
    if (keys.arrowRight.isPressed && (player1.x + player1.width) < CANVAS_WIDTH - borders.right && !isCollidingRight) {
        player1.move(1, 0, 2);
    }
    if (keys.k.isPressed) {
        player1.move(0, 0, 4);
    }

    // player 2
    if (keys.w.isPressed && player2.y > borders.top && !isCollidingTop) {
        player2.move(0, -1, 3);
    }
    if (keys.s.isPressed && (player2.y + player2.height) < CANVAS_HEIGHT - borders.bottom && !isCollidingBottom) {
        player2.move(0, 1, 0);
    }

    if (keys.a.isPressed && player2.x > borders.left && !isCollidingLeft) {
        player2.move(-1, 0, 1);
    }
    if (keys.d.isPressed && (player2.x + player2.width) < CANVAS_WIDTH - borders.right && !isCollidingRight) {
        player2.move(1, 0, 2);
    }




}

let lastTime = 0

function gameLoop(timestamp) {


    const deltatime = timestamp - lastTime;
    lastTime = timestamp
    // console.log(timestamp)
    // Clear Canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //Draw Background
    // ctx.drawImage(mapBg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    currentMap.draw(ctx);

    // Do movements based on which key is pressed
    handleInput(KEYS, currentMap);
    // Draw Player 1
    // ctx.fillStyle = "blue";
    // ctx.fillRect(player1x, player1y, 25, 25);
    player1.draw(ctx, deltatime);
    // Draw Player 2
    // ctx.fillStyle = "red";
    // ctx.fillRect(player2x, player2y, 25, 25);
    player2.draw(ctx, deltatime);

    // if (
    //     player1.x < player2.x + player2.width &&
    //     player1.x + player1.width > player2.x &&
    //     player1.y < player2.y + player2.height &&
    //     player1.y + player1.height > player2.y
    // ) {
    //     console.log("ouchhh!");
    //     isColliding = true;

    // }
    // else {
    //     isColliding = false;
    // }



    isCollidingLeft = false;
    isCollidingRight = false;
    isCollidingTop = false;
    isCollidingBottom = false;

    // Check for collision on the left side of player2
    if (player1.x + player1.width > player2.x &&
        player1.x < player2.x &&
        player1.y < player2.y + player2.height &&
        player1.y + player1.height > player2.y) {
        console.log("Collision on the left side!");
        isCollidingLeft = true;
    } else {
        isCollidingLeft = false;
    }

    // Check for collision on the right side of player2
    if (player1.x < player2.x + player2.width &&
        player1.x + player1.width > player2.x + player2.width &&
        player1.y < player2.y + player2.height &&
        player1.y + player1.height > player2.y) {
        console.log("Collision on the right side!");
        isCollidingRight = true;
    } else {
        isCollidingRight = false;
    }

    // Check for collision on the top side of player2
    if (player1.y + player1.height > player2.y &&
        player1.y < player2.y &&
        player1.x < player2.x + player2.width &&
        player1.x + player1.width > player2.x) {
        console.log("Collision on the top side!");
        isCollidingTop = true;
    } else {
        isCollidingTop = false;
    }

    // Check for collision on the bottom side of player2
    if (player1.y < player2.y + player2.height &&
        player1.y + player1.height > player2.y + player2.height &&
        player1.x < player2.x + player2.width &&
        player1.x + player1.width > player2.x) {
        console.log("Collision on the bottom side!");
        isCollidingBottom = true;
    } else {
        isCollidingBottom = false;
    }
    // Check for collision on the left side of player1
    if (player2.x + player2.width > player1.x &&
        player2.x < player1.x &&
        player2.y < player1.y + player1.height &&
        player2.y + player2.height > player1.y) {
        console.log("Collision on the left side of player1!");
        isCollidingLeft = true;
    } else {
        isCollidingLeft = false;
    }

    // Check for collision on the right side of player1
    if (player2.x < player1.x + player1.width &&
        player2.x + player2.width > player1.x + player1.width &&
        player2.y < player1.y + player1.height &&
        player2.y + player2.height > player1.y) {
        console.log("Collision on the right side of player1!");
        isCollidingRight = true;
    } else {
        isCollidingRight = false;
    }

    // Check for collision on the top side of player1
    if (player2.y + player2.height > player1.y &&
        player2.y < player1.y &&
        player2.x < player1.x + player1.width &&
        player2.x + player2.width > player1.x) {
        console.log("Collision on the top side of player1!");
        isCollidingTop = true;
    } else {
        isCollidingTop = false;
    }

    // Check for collision on the bottom side of player1
    if (player2.y < player1.y + player1.height &&
        player2.y + player2.height > player1.y + player1.height &&
        player2.x < player1.x + player1.width &&
        player2.x + player2.width > player1.x) {
        console.log("Collision on the bottom side of player1!");
        isCollidingBottom = true;
    } else {
        isCollidingBottom = false;
    }







    // Do gameLoop again
    requestAnimationFrame(gameLoop);
}
window.addEventListener('keydown', (event) => {
    console.log("KeyDown event trigged. key", event.key, "has been pressed");
    // Player 1
    if (event.key === "ArrowUp") {
        // player1y += -1;
        // player1.move(0, -1);
        KEYS.arrowUp.isPressed = true;
    } else if (event.key === "ArrowDown") {
        // player1.move(0, 1);
        KEYS.arrowDown.isPressed = true;
    } else if (event.key === "ArrowLeft") {
        // player1.move(-1, 0);
        KEYS.arrowLeft.isPressed = true;
    } else if (event.key === "ArrowRight") {
        // player1.move(1, 0);
        KEYS.arrowRight.isPressed = true;
    } else if (event.key === "k") {
        // player1.move(1, 0);
        KEYS.k.isPressed = true;
    }
    // Player 2
    if (event.key === "w") {
        // player2y += -1;
        // player2.move(0, -1);
        KEYS.w.isPressed = true;
    } else if (event.key === "s") {
        // player2.move(0, 1);
        KEYS.s.isPressed = true;
    } else if (event.key === "a") {
        // player2.move(-1, 0);
        KEYS.a.isPressed = true;
    } else if (event.key === "d") {
        // player2.move(1, 0);
        KEYS.d.isPressed = true;
    }
})
window.addEventListener('keyup', (event) => {
    console.log("KeyUp event trigged. key", event.key, "has been released");
    // Player 1
    if (event.key === "ArrowUp") {
        player1.move(0, 0, 3, false);
        KEYS.arrowUp.isPressed = false;
    } else if (event.key === "ArrowDown") {
        player1.move(0, 0, 0, false);
        KEYS.arrowDown.isPressed = false;
    } else if (event.key === "ArrowLeft") {
        player1.move(0, 0, 1, false);
        KEYS.arrowLeft.isPressed = false;
    } else if (event.key === "ArrowRight") {
        player1.move(0, 0, 2, false);
        KEYS.arrowRight.isPressed = false;
    } else if (event.key === "k") {
        player1.move(0, 0, 0, false);
        KEYS.k.isPressed = false;
    }
    // Player 2
    if (event.key === "w") {
        player2.move(0, 0, 3, false);
        KEYS.w.isPressed = false;
    } else if (event.key === "s") {
        player2.move(0, 0, 0, false);
        KEYS.s.isPressed = false;
    } else if (event.key === "a") {
        player2.move(0, 0, 1, false);
        KEYS.a.isPressed = false;
    } else if (event.key === "d") {
        player2.move(0, 0, 2, false);
        KEYS.d.isPressed = false;
    }
})
gameLoop(0);