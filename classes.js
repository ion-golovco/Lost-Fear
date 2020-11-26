class Projectile {
    constructor(x, y, target, type, direx, wex, dmg) {
        this.pos = createVector(x, y);
        this.drawpos = createVector(x, y);
        this.vel = createVector(7, random(-1.5, -1));
        this.target = target;
        this.type = type;
        this.dir = 0;
        this.dirEx = direx;
        this.wex = wex;
        this.dmg = dmg;
    }
    show() {
        //circle(this.drawpos.x, this.drawpos.y, 3)
        push();
        //rotate(this.vel.y/20)
        scale(0.25, 0.25);
        if (this.dir == -1) {
            image(arrow[0], this.drawpos.x * 4 - arrow[0].width, this.drawpos.y * 4);
        }
        if (this.dir == 1) {
            image(arrow[1], this.drawpos.x * 4 - arrow[1].width, this.drawpos.y * 4);
        }
        pop();
    }
    update() {
        this.scroll();
        this.show();
        let dist = this.target.pos.x - this.pos.x;
        if (this.dir == 0) {
            if (dist < 0) {
                this.dir = -1;
            } else {
                this.dir = 1;
            }
        }
        this.pos.x += this.vel.x * this.dir;
        this.pos.y += this.vel.y; //*this.dir
        this.vel.y += 0.1;
        this.touchGround();
    }
    touchGround() {
        if (this.pos.y > mainground) {
            this.vel.y = 0;
            this.vel.x = 0;
            projectileKill(this);
        }
    }
    scroll() {
        let adder;
        if (this.dirEx == 1) {
            adder = this.wex;
        } else {
            adder = 0;
        }
        this.drawpos.x = this.pos.x + backgroundPosX + adder;
        this.drawpos.y = this.pos.y + this.target.h / 3;
    }
}
class GroundProps {
    //above player
    constructor(x, y, sprite) {
        this.pos = createVector(x, y);
        this.sprite = sprite;
        this.drawpos = createVector(x, y);
    }
    show() {
        push();
        this.scroll();
        image(this.sprite, this.drawpos.x, this.pos.y - this.sprite.height + 25);
        pop();
    }
    scroll() {
        this.drawpos.x = this.pos.x + backgroundPosX;
    }
}
class backgroundProps extends GroundProps {
    constructor(x, y, sprite) {
        super(x, y, sprite);
    }
    scroll() {
        this.drawpos.x = this.pos.x + backgroundPosX / 1.5;
    }
}
// class Dark {
//     constructor(density, range) {
//         this.pos = createVector(0, 0);
//         this.drawposx = 0;
//         this.density = density;
//         this.range = range;
//         this.array = [];
//         this.grid = undefined;
//     }
//     draw() {
//         if (this.grid == undefined) {
//             this.createGrid();
//             return;
//         }
//         for (let i of this.array) {
//             let distx = playerPhysic.drawpos.x - i[0];
//             let disty = playerPhysic.drawpos.y - i[1];

//             this.drawposx = i[0] + backgroundPosX;

//             fill(0, (abs(distx * 50) + abs(disty * 25)) / this.grid);

//             let distxt = torchSpot[0] - i[0];
//             let distyt = torchSpot[1] - i[1];
//             // fill(0, (abs(distxt * 50) + abs(distyt * 25)) / this.grid);

//             rect(this.drawposx, i[1], this.grid, this.grid);
//         }
//     }
// }
class Platform {
    constructor(x, y, w, h) {
        this.pos = [x, y, w, h];
    }
}
class Wall {
    constructor(x, y, w, h) {
        this.pos = [x, y, w, h];
    }
}
class DamageBubble {
    constructor(x, y, input) {
        this.pos = createVector(x, y);
        this.drawpos = createVector(0, 0);
        this.vel = createVector(random(-3, 3), random(-3, 3));
        this.text = input.toString();
        this.timer = 128;
    }
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= 0.9;
        this.vel.y *= 0.87;
        this.scroll();
        textSize(20);
        fill(255, this.timer * 2);
        noStroke();
        text(this.text, this.drawpos.x, this.pos.y);
        this.timer -= 2;
        if (this.timer < 0) {
            deleteBubble(this);
        }
    }
    scroll() {
        this.drawpos.x = this.pos.x + backgroundPosX;
    }
}
class CutScene {
    //ussualy in betwen stages
    constructor(text, stage) {
        this.text = text;
        this.timer = 0;
        this.stage = stage;
        this.index = 0;
    }
    update() {
        this.fadein();
        this.fadeout();
        this.showText();
    }
    fadein() {
        if (this.index == 0) {
            this.timer += 2;
            fill(0, this.timer);
            rect(0, 0, w, h);
        }
        if (this.timer > 255) {
            this.index = 1;
            changeStageBack();
        }
    }
    showText() {
        if (this.index == 1) {
            this.timer--;
            textSize(40);
            textAlign(CENTER);
            fill(0);
            rect(0, 0, w, h);
            fill(255);
            text(this.text, w / 2, h / 2);
            if (this.timer < 0) {
                this.timer = 255;
                this.index = 2;
                changeStage(this.stage);
                noCutScene = true;
            }
        }
    }
    fadeout() {
        if (this.index == 2) {
            this.timer -= 2;
            fill(0, this.timer);
            rect(0, 0, w, h);
        }
        if (this.timer < 0) {
            this.reuse();
            cutSceneIndexer++;
            sw2 = false;
        }
    }
    reuse() {
        this.timer = 0;
        this.index = 0;
    }
}

class vnText {
    constructor(text, sprite) {
        this.i = text;
        this.txt = [];
        this.curent = 0;
        this.timer = 60;
        this.sprite = sprite[0];
        //improve!!!
        this.t = sprite[1];
    }
    show() {
        textSize(25);
        fill(0, 50);
        noStroke();
        textAlign(LEFT);
        rect(0, h - 180, w, h);
        fill(255);
        image(this.sprite, -100, h - 200);
        text(this.txt.join(""), 200, h - 100);
        if (frameCount % round(random(1, 3)) == 0) {
            this.uppdateText();
        }
    }
    uppdateText() {
        if (this.i[0].length + 2 > this.curent) {
            this.txt.push(this.i[0][this.curent]);
            this.curent++;
            speak.play();
        }
        if (this.curent > this.i[0].length) {
            this.timer--;
        }
        if (this.timer < 0) {
            indexTextSub++;
        }
    }
}
class Button {
    constructor(x, y, w, h, func) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Rain {
    constructor(m) {
        this.mag = m;
        this.pos = createVector(random(-100, stageWidth), 0);
        this.drawpos = createVector(0, 0);
        this.hist = [];
        this.length = random(3, 5);
        this.timer = 250;
    }
    update() {
        this.timer--;
        this.pos.x += this.mag;
        this.pos.y += this.length;
        this.hist.push(this.pos);
        if (this.hist.length > round(this.length)) {
            this.hist.shift();
        }
        if (this.pos.y > h) {
            this.pos.y = 0;
            this.pos.x = random(-100, stageWidth);
            this.hist = [];
        }
        this.scroll();
    }
    show() {
        this.update();
        if (this.timer < 0) {
            beginShape();
            strokeWeight(2);
            stroke(255);
            for (let i of this.hist) {
                vertex(i.x, i.y);
            }
            endShape();
        }
    }
    scroll() {
        this.drawpos.x = this.pos.x + backgroundDrawPosX;
    }
}
class Crystal {
    constructor(tier, type) {
        this.sprite = item[type + 2];
        this.name = crystalName(type, tier);
        this.tier = tier;
        this.type = type;
    }
}
class Explosion {
    constructor(x, y, dmg, type, size) {
        this.pos = createVector(x, y);
        this.drawpos = createVector(x, y);
        this.dmg = dmg;
        this.exploded = false;
        this.type = type;
        this.size = size;
        this.timer = 300;
    }
    show() {
        noStroke();
        fill(255, this.timer);
        rect(this.drawpos.x, this.drawpos.y, this.size, this.size);
    }
    update() {
        this.show();
        this.scroll();
        this.timer -= 3;
        if (this.exploded == false) {
            this.damageArea();
            this.exploded = true;
        }
    }
    damageArea() {
        let limits = [this.pos.x, this.pos.x + this.size];
        for (let i of enemies[stage]) {
            if (i.pos.x > limits[0] && i.pos.x < limits[1]) {
                damageBubbles.push(
                    new DamageBubble(i.pos.x + i.w / 2, i.pos.y + i.h / 2, this.dmg)
                );
                i.hp -= this.dmg;
            }
        }
        if (playerPhysic.pos.x > limits[0] && playerPhysic.pos.x < limits[1]) {
            playerStats.hp -= this.dmg;
        }
    }
    scroll() {
        this.drawpos.x = this.pos.x + backgroundPosX;
        this.drawpos.y = this.pos.y;
    }
}

class Particles {
    constructor(x, y, type, tier) {
        this.pos = createVector(x, y);
        this.type = type;
        this.spawnParticles = false;
        this.tier = tier + 1;
    }
    update() {
        if (this.type == 0) {
            //fireparticles
            this.fire();
        }
        if (this.type == 1) {
            //heal
            this.healed();
        }
        if (this.type == 2) {
            //strenght
            this.strength();
        }
    }
    fire() {
        particles.push(new Particle(this.pos.x, this.pos.y, 0));
    }
    healed() {
        if (this.spawnParticles == false) {
            for (let i = 0; i < 20 * this.tier; i++) {
                particles.push(new Particle(this.pos.x, this.pos.y, 1));
            }
            this.spawnParticles = true;
        }
    }
    strength() {
        if (this.spawnParticles == false) {
            for (let i = 0; i < 20 * this.tier; i++) {
                particles.push(new Particle(this.pos.x, this.pos.y, 2));
            }
            this.spawnParticles = true;
        }
    }
}
class Particle {
    constructor(x, y, type) {
        this.pos = createVector(random(x - 20, x + 20), random(y - 20, y + 20));
        this.drawpos = createVector(-1000, 0);
        this.angle = random(5);
        this.vel = createVector(0, -0.01);
        this.type = type;
        this.timer = 160;
        this.Fcolor = [
            [226, 88, 34],
            [226, 136, 34],
        ];
        this.randomFCo = random(this.Fcolor);
    }
    update() {
        this.show();
        this.vel.y += -0.05;
        this.angle += 0.1;
        this.vel.x += random(-0.1, 0.1);
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.scroll();
        this.timer -= 2;
        if (this.timer < 0) {
            deleteParticle(this);
        }
    }
    show() {
        push();
        rectMode(CENTER);
        if (this.type == 1) {
            noStroke();
            fill(0, 190, 0, this.timer * 3);
        }
        if (this.type == 0) {
            noStroke();
            fill(this.randomFCo[0], this.randomFCo[1], this.randomFCo[2], this.timer * 3);
        }
        if (this.type == 2) {
            noStroke();
            fill(255, 127, 80, this.timer * 3);
        }
        translate(this.drawpos.x + 40, this.drawpos.y + 40);
        rotate(this.angle);
        rect(0, 0, random(4, 7), random(4, 7));
        pop();
    }
    scroll() {
        this.drawpos.x = this.pos.x + backgroundPosX;
        this.drawpos.y = this.pos.y;
    }
}
class itemDrop {
    constructor(x, y, item) {
        this.pos = [x, y];
        this.drawpos = [x, y];
        this.item = item;
        this.curr = round(random(30));
        this.target = 30;
    }
    show() {
        image(this.item.sprite, this.drawpos[0], this.pos[1]);
        this.update();
    }
    update() {
        this.float();
        this.pickup();
    }
    float() {
        if (this.curr > this.target) {
            this.curr -= 0.25;
        } else if (this.curr == this.target) {
            this.target = round(random(30));
        } else {
            this.curr += 0.25;
        }
        this.pos[1] = this.curr + mainground - 60;

        this.drawpos[0] = this.pos[0] + backgroundPosX;
    }
    pickup() {
        if (playerPhysic.pos.x > this.pos[0] - 15 && playerPhysic.pos.x < this.pos[0] + 25) {
            for (let i in playerStats.inventory) {
                if (playerStats.inventory[i] === 0) {
                    playerStats.inventory[i] = this.item;
                    killDrop(this);
                    return;
                }
            }
        }
    }
}
class Item {
    constructor(sprite, name, stats) {
        this.sprite = sprite;
        this.name = name;
        this.stats = stats;
    }
}
class Coruption {
    constructor(type) {
        this.type = type;
        this.timer = 0;
        this.beat = -1;
        this.btimer = 0;
        this.noiseMap = undefined;
    }
    show() {
        this.update();
    }
    update() {
        switch (this.type) {
            case 0:
                this.noiseType();
                break;
        }
    }
    beatingType() {
        if (this.beat == -1 && this.timer < 0) {
            this.beat = 1;
        } else if (this.beat == 1 && this.timer > 255) {
            this.beat = -1;
        }
        this.timer += this.beat * this.btimer;
        fill(210, 10, 10, this.timer);
        rect(0, 0, w, h);
        this.btimer;
    }
    noiseType() {
        if (this.noiseMap == undefined) {
            this.noiseMap = createNoiseMap();
        }
        for (let y in this.noiseMap) {
            for (let x in this.noiseMap[y]) {
                noStroke();
                let r = this.noiseMap[y][x] * this.timer;
                fill(0, r > 160 ? r : 0);
                rect(x * 16, y * 16, 16, 16);
            }
        }
        this.timer += 0.5;
    }
}
class torchArea {
    constructor(x, y, w,id) {
        this.pos = createVector(x, y);
        this.w = w;
        this.torch = createVector(this.w / 2+110, h / 2);
        this.drawposx = x;
        this.curr = 25;
        this.target = 30;
        this.array = [];
        this.grid = undefined
    }
    show() {
        if (this.grid == undefined) {
            this.createGrid();
            return;
        }
        this.alternate();
        this.displayGrid();
    }
    alternate() {
        if (round(this.curr) > this.target) {
            this.curr -= 0.1;
        } else if (round(this.curr) == this.target) {
            this.target = round(random(20, 30));
        } else {
            this.curr += 0.1;
        }
        this.drawposx = this.pos.x + backgroundPosX;   
    }
    displayGrid() {
        for (let i of this.array) {
            noStroke();
            fill(0, this.checkDist(i[0], i[1]));
            rect(i[0] + backgroundPosX + this.pos.x, i[1], 33, 32);
        }
    }
    showLightCircle(){
        fill(255,165,0,40)
        noStroke()
        circle(this.torch.x + backgroundPosX+ this.pos.x+17, this.torch.y, 3950/this.curr)
        fill(255,140,0,30)
        circle(this.torch.x + backgroundPosX+ this.pos.x+17, this.torch.y, 1550/this.curr)
    }
    checkDist(x, y) {
        let distxt = this.torch.x - x;
        let distyt = this.torch.y - y;
        return (abs(distxt * 2 * this.curr) + abs(distyt * this.curr/1.5)) / this.grid;
    }
    createGrid() {
        this.array = [];
        this.grid = round(this.w/8);
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 18; j++) {
                this.array.push([i * this.grid, j*this.grid]);
            }
        }
    }
}
