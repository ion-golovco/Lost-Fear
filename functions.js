function pushProps(p1, p2) {
    let a = [];
    groundProps = [];
    if (p1 === -1) {
        return;
    }
    for (let i = 0; i < 7 * stageWidthAr[stage]; i++) {
        a.push(
            new backgroundProps(random() * stageWidth, mainground, props[floor(random(p1, p2))])
        );
    }
    groundProps.push(a);
}
function changeStageBack() {
    switch (stage) {
        case 2:
            stagebackindex++;
            break;
        case 3:
            stagebackindex++;
            break;
        case 4:
            rainy = true;
            stagebackindex++;
            break;
        case 5:
            stagebackindex++;
            break;
        case 6:
            stagebackindex++;
            rainy = false;
            break;
        case 7:
            stagebackindex++;
            break;
    }
    bg = loadImage("assets/stage/" + stagebackindex + "/bg.png");
    bg2 = loadImage("assets/stage/" + stagebackindex + "/bg2.png");
    fg = loadImage("assets/stage/" + stagebackindex + "/fg.png");
    onGround = loadImage("assets/stage/" + stagebackindex + "/gr.png");
}
function pushEnemies() {
    let a = [];
    for (let k of enemiesSpawn) {
            if (k[1] === 0) {
                for (let i = 0; i < k[0]; i++) {
                    a.push(
                        new Skeleton(
                            random(
                                stageWidth * k[2] - wanderFromPos * 2,
                                stageWidth * k[2] + wanderFromPos * 2
                            ), h - 175,0,
                            random(15, 50),round(random(7, 16)),0,70,100)
                    );
                }
            }
            enemies.push(a);
            a = []
    }
}
function newSubs() {
    textSubs = [];
    for (let i of stageTextSub[stage]) {
        textSubs.push(new vnText(i, textSprite(i[1])));
    }
}
function mousePressed() {
    if (noCutScene && inGame && noMenu && noTextSubs) {
        if (playerStats.equiped == 0) {
            attack = 1;
        }
        if (playerStats.inventory[playerStats.equiped]) {
            swUse = true;
        }
    }
}
function trigerTheTextSubs() {
    trigerTextSubs = false;
}
function textSprite(i) {
    if (i == 0) {
        return [playerSprites[2][0], playerPhysic];
    } else if (i == 1) {
        return [companionSprites[0][0], companion];
    }
}
function youDied() {
    console.log("dead");
}

function renderBackground() {
    backgroundDrawRelativeX = backgroundDrawPosX % w;
    backgroundDrawRelativeX2 = backgroundDrawPosX2 % w;
    foregroundRelativeX = foregroundPosX % w;
    onGroundDrawRelativeX = backgroundPosX % w;
    for (let i = -1; i <= 1; i++) {
        image(bg, backgroundDrawRelativeX - w * i, 0);
    }
    rainer();

    for (let i = -1; i <= 1; i++) {
        image(bg2, backgroundDrawRelativeX2 - w * i, 0);
    }
    if (groundProps[0]) {
        for (let i of groundProps[0]) {
            i.show();
        }
    }
}
function renderProjectiles() {
    for (let i of projectiles) {
        i.update();
    }
    for (let i of projectiles2) {
        i.update();
        if (i.vel.x == 0) {
            projectiles2.splice(i, 1);
        }
    }
}
function rendermisc() {
    //foreground
    for (let i = -1; i <= 1; i++) {
        image(fg, foregroundRelativeX - w * i, 0);
    }
    //overlay
    if (limitedView) {
        for(let i of torchSpot){
            i.show();
        }
    }
    for (let i of damageBubbles) {
        i.update();
    }
    if (!noInventory) {
        showInventory();
        ui();
    }
    if (textSubs[indexTextSub] && trigerTextSubs) {
        textSubs[indexTextSub].show();
        noTextSubs = false;
    } else {
        noTextSubs = true;
        trigerTextSubs = false;
        indexTextSub = 0;
    }
    image(vign, 0, 0);
    if (playerPhysic.pos.x > stageWidth + 150) {
        sw2 = true;
    }
    if (sw2) {
        cutSceneFullRender();
    }
}
function cutSceneFullRender() {
    cutscenes[cutSceneIndexer].update();
}
function renderOnGround() {
    for (let i of drops) {
        i.show();
    }
    if (appear) {
        companion.update();
        companion.show();
    }
    playerPhysic.update();
    playerPhysic.show();
    playerStats.health();
    if (enemies[stage].length == 0 && sw3 == false) {
        setTimeout(enemieskilledStartText, 1000);
    }
    for (let i of enemies[stage]) {
        i.update();
    }
    if (limitedView) {
        for(let i of torchSpot){
            i.showLightCircle();
        }
    }
    for (let i of particlesParent) {
        i.update();
    }
    for (let i of particles) {
        i.update();
    }
    for (let i = -1; i <= 1; i++) {
        image(onGround, onGroundDrawRelativeX - w * i, 0);
    }
    if (onGroundProp && onGroundProp[stage] && showProps) {
        for (let i of onGroundProp[stage]) {
            i.show();
        }
    }
    if (shakeSwitch) {
        screenShake(5, 2);
    }
}
function enemieskilledStartText() {
    trigerTextSubs = true;
    sw3 = true;
}
let passedTime = 0;
let shakeSwitch = false;
function screenShake(d, m) {
    if (passedTime == 0) {
        let a = backgroundDrawPosX;
    }
    if (passedTime < d) {
        let x = random(-1, 1) * m;
        backgroundPosX += x;
        backgroundDrawPosX += x;
        foregroundPosX += x;
        backgroundDrawPosX2 += x;
        passedTime++;
    } else {
        passedTime = 0;
        shakeSwitch = false;
    }
}
function rainer() {
    if (rainy) {
        for (let i of rain) {
            i.show();
        }
    }
}
function showInventory() {
    for (let i = 0; i < playerStats.inventory.length; i++) {
        fill(0, 100);
        stroke(0, 100);
        if (playerStats.equiped == i) {
            stroke(255, 80);
            fill(255, 80);
        }
        rect(30 + i * 40, mainground + 15, 35, 35, 3);
    }
    let iner = 0;
    for (let i of playerStats.inventory) {
        if (i.sprite !== undefined) {
            i.sprite.resize(32, 32);
            image(i.sprite, 32 + iner * 40, mainground + 17);
        }
        iner++;
    }
    fill(250);
    noStroke();
    textSize(18);
    let a = playerStats.inventory[playerStats.equiped];
    text(a.stats || a.name, 30 + 9 * 40, mainground + 30);
}
function keyReleased() {
    if (keyCode === 87 && inGame) {
        sw0 = 0;
    }
    let a = +key;
    if (
        a <= playerStats.inventory.length &&
        a % 1 == 0 &&
        a !== 0 &&
        inGame &&
        noCutScene &&
        noMenu &&
        noTextSubs
    ) {
        playerStats.equiped = a - 1;
    }
    if (keyCode === 32 && !inGame) {
        inGame = 1;
    }
}
function crystalName(type, tier) {
    return crystalTiers[tier] + " of " + crystalNames[type][tier];
}
function killEnemy(enemy) {
    for (let i in enemies[stage]) {
        if (enemies[stage][i] == enemy) {
            enemies[stage].splice(i, 1);
        }
    }
}
function projectileKill(l) {
    for (let i in projectiles) {
        if (projectiles[i] == l) {
            projectiles.splice(i, 1);
        }
    }
}
function projectileKill2(l) {
    for (let i in projectiles2) {
        if (projectiles2[i] == l) {
            projectiles2.splice(i, 1);
        }
    }
}
function deleteBubble(l) {
    for (let i in damageBubbles) {
        if (damageBubbles[i] == l) {
            damageBubbles.splice(i, 1);
        }
    }
}
function deleteParticle(l) {
    for (let i in particles) {
        if (particles[i] == l) {
            particles.splice(i, 1);
        }
    }
}
function changeStage(st) {
    stage = st;
    stageWidth = w * stageWidthAr[stage];
    backgroundPosX = 0;
    playerPhysic.pos.x = 20;
    companion.pos.x = 10;
    playerStats.maxhp += sqrt(st * 10);
    sw3 = false;
    pushTheProps(st);
    newSubs();
}
function pushTheProps(st) {
    if (st <= 5) {
        pushProps(0, 6);
    }
    if (st >= 6 && st <= 8) {
        pushProps(0, 13);
    }
    if (st >= 9 && st <= 18) {
        pushProps(13, 18);
    }
    if (st >= 19 && st <= 23) {
        pushProps(-1);
    }
}
function posTrigger(xpos) {
    if (playerPhysic.pos.x > xpos) {
        return true;
    }
}
function ui() {
    fill(0, 50);
    textSize(16);
    stroke(0, 100);
    rect(5, 7, 120, 48, 4);
    fill(0, 200, 0);
    let healthBar = (playerStats.hp / playerStats.maxhp) * 100;
    rect(10, 25, healthBar || 0, 3, 4);
    let manaBar = playerStats.mana;
    fill(0, 0, 200);
    rect(10, 45, manaBar, 3, 4);
    fill(255);
    text("HP", 10, 20);
    text("Mana", 10, 40);
    text(
        `${round(playerStats.hp)} / ${round(playerStats.maxhp)}`,
        30,
        20
    );
}
function killDrop(l) {
    for (let i in drops) {
        if (drops[i] == l) {
            drops.splice(i, 1);
        }
    }
}
function createNoiseMap() {
    let arr = [];
    let yoff = 0;
    for (let x = 0; x < round(h / 16) + 1; x++) {
        let xarr = [];
        let xoff = 0;
        for (let y = 0; y < round(w / 16) + 1; y++) {
            let value = noise(xoff, yoff);
            xoff += inc;
            xarr.push(value);
        }
        arr.push(xarr);
        yoff += inc;
    }
    return arr;
}
