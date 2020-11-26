function draw() {
    textFont(pixelFont);
    background(0);
    stroke(0);
    textSize(16);
    if (!inGame) {
        text("Press Space to start", w - 180, h - 40);
    }
    if (inGame) {
        renderBackground();
        renderProjectiles();
        renderOnGround();
        rendermisc();

        if (stage == 0 && playerPhysic.pos.x > 300 && ifSwitch) {
            ifSwitch = false;
        }
    }

    fill(255);
    strokeWeight(1);
    fill(255);
    textSize(12);
    text(round(frameRate()), w - 20, 10);
}
