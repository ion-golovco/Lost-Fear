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
        if (stage == 1 && posTrigger(900) && ifSwitch) {
            enemies[1] = []
            ifSwitch = false;
            companion.pos.x = 700
            companion.vel.x = 10
            companion.drawpos.x = 700
            appear = true;
        }
    }
    fill(255);
    strokeWeight(1);
    fill(255);
    textSize(12);
    text(round(frameRate()), w - 20, 10);
}
