let canvas = document.getElementById("gc");
let ctx = canvas.getContext("2d"); //نمایش دو بعدی

let box = 20; // اندازه هر خانه
let snake = [{
    x: 9 * box,
    y: 9 * box
}]; // موقعیت اولیه مار
let direction; // جهت حرکت
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
}; // موقعیت غذا

// کنترل جهت با کلیدهای Arrow
document.addEventListener("keydown", (event) => {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    }
});

// تابع بازی
function draw() {
    ctx.fillStyle = "#1E201E"; // رنگ پس‌زمینه
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "#4AA96C" : "white"; // رنگ سر و بدن مار
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black"; // رنگ حاشیه
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // موقعیت غذا
    ctx.fillStyle = "#F55C47"; // رنگ غذا
    ctx.fillRect(food.x, food.y, box, box);

    // موقعیت جدید مار
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // بررسی برخورد با غذا
    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        }; // تولید مجدد غذا
    } else {
        snake.pop(); // حذف آخرین بخش مار
    }

    // اضافه کردن موقعیت جدید به مار
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // بررسی برخورد با دیوار یا خود مار
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("بازی تمام شد!");
    }

    snake.unshift(newHead); // اضافه کردن سر جدید به مار
}

// تابع بررسی برخورد
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// اجرای بازی
let game = setInterval(draw, 100); // هر 100 میلی‌ثانیه تابع draw را اجرا کن