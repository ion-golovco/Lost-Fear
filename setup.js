function preload() {
    bg = loadImage("assets/stage/0/bg.png");
    bg2 = loadImage("assets/stage/0/bg2.png");
    fg = loadImage("assets/stage/0/fg.png");
    onGround = loadImage("assets/stage/0/gr.png");
    pixelFont = loadFont("assets/rainyhearts.ttf");

    speak = loadSound("assets/spok.wav");
    vign = loadImage("assets/v.png");
    hurt = loadSound("assets/hurt.wav");
    hit = loadSound("assets/hit.wav");
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 6; i++) {
            playerSprites[j][i] = loadImage(
                "assets/player/" +
                    playerActions[j] +
                    "/adventurer-" +
                    playerActions[j] +
                    "-0" +
                    i +
                    ".png"
            );
        }
    }
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 6; i++) {
            companionSprites[j][i] = loadImage("assets/companion/com" + j + i + ".png");
        }
    }
    for (let i = 0; i < 18; i++) {
        props.push(loadImage("assets/misc/" + i + ".png"));
    }
    arrow[0] = loadImage("assets/misc/arrow.png");
    arrow[1] = loadImage("assets/misc/arrow2.png");
    for (let i = 0; i < 5; i++) {
        item.push(loadImage("assets/item/" + i + ".png"));
    }
}
function setup() {
    w = 1024;
    h = 576;
    createCanvas(w, h);
    startScrollPosX = w / 2;
    for (let i of stageTextSub[stage]) {
        textSubs.push(new vnText(i, textSprite(i[1])));
    }
    for (let i in cutscenesText) {
        cutscenes.push(new CutScene(cutscenesText[i], +i + +1));
    }
    stageWidth = w * stageWidthAr[stage];
    pushProps(0, 3);
    pushEnemies();

    companion = new Companion(600, mainground - 100, 80, 95, 100, 10);
    playerPhysic = new PlayerPhysics(200, h - 75, 70, 110);
    playerStats = new PlayerStats(100);

    for (let i = 0; i < 500; i++) {
        rain.push(new Rain(0));
    }

    //test stuff

    //particles.push(new Particles(w / 5, 250, 0));

    corruption = new Coruption(0)

    playerStats.inventory[2] = new Crystal(1, 2);
    
    onGroundProp = [[], [new GroundProps(700, mainground, props[5])], [], []];

    //torchSpot.push(new torchArea(0, 0, w / 4));
    //torchSpot.push(new torchArea(w/2, 0, w / 4));
    //torchSpot.push(new torchArea(w, 0, w / 4));
}