class PlayerPhysics {
    constructor(x, y, wi, he) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.drawpos = createVector(0, 0);
        this.inAir = false;
        this.h = he;
        this.w = wi;
        this.ground = mainground;
        this.dir = 1;
        this.action = 2;
        this.timer = 11;
        this.shieldOn = false;
        this.reach = 150;
    }
    show() {
        this.timer--;
        if (this.timer == 0) {
            this.timer = 12;
            spriteindex++;
            spriteindex = spriteindex % 6;
        }
        fill(100);
        //hitbox
        //rect(this.drawpos.x, this.drawpos.y,this.w, this.h)
        push();
        translate(this.drawpos.x - this.w / 1.5, this.drawpos.y - 15);
        scale(this.dir * 0.5, 0.5);
        let adder = 0;
        if (this.dir == -1) {
            adder = -this.w * 5;
        }

        if (attack == 1 && asw == 0) {
            spriteindex = 1;
            asw = 1;
            this.attack();
        }
        if (attack == 1 && spriteindex % 6 == 0) {
            asw = 0;
            attack = 0;
        }

        image(playerSprites[this.action][spriteindex], adder, 0);
        pop();
    }
    move() {
        if (attack == 0 && !this.shieldOn) {
            if (keyIsDown(65)) {
                //move left
                this.vel.x -= speed;
                this.dir = -1;
            }
            if (keyIsDown(68)) {
                //move right
                this.vel.x += speed;
                this.dir = 1;
            }
            if (keyIsDown(87) && sw0 == 0) {
                //move UP
                if (this.inAir == false) {
                    sw0 = 1;
                    this.inAir = true;
                    this.vel.y -= 23;
                }
            }
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
        } else if (this.pos.x > stageWidth && enemies[stage].length > 0) {
            this.pos.x = stageWidth;
        }
    }
    gravity() {
        if (this.pos.y < this.ground - this.h) {
            this.vel.y += 1.7;
        }
        if (this.pos.y > this.ground - this.h) {
            this.vel.y = 0;
            this.pos.y = this.ground - this.h;
            this.inAir = false;
        }
    }
    update() {
        if (noCutScene && noTextSubs) {
            if (attack == 0) {
                if (this.vel.x < 0.6) {
                    this.action = 2; //idle
                }
                if (abs(this.vel.x) > 0.6) {
                    this.action = 4; //run
                }
                if (this.vel.y < 0) {
                    this.action = 3; //jump
                }
                if (this.vel.y > 0) {
                    this.action = 1; //fall
                }
            } else if (attack == 1) {
                this.action = 0;
            }
            if (keyIsDown(69)) {
                this.shieldOn = true;
                this.action = 5;
            }
            this.move();
            this.wallColision();
            this.blockColision();
        }
        this.pos.x += abs(this.vel.x)>1?this.vel.x:0;
        this.pos.y += this.vel.y;
        this.drawpos.y = this.pos.y;
        if(this.shieldOn){
          this.drawpos.y = mainground - 90
        }
        this.gravity();
        this.scroll();
        this.projectileDamage();
        this.shieldOn = false;
        this.vel.x *= 0.9;
        this.vel.y *= 0.9;
    }
    blockColision() {
        if (blocks[stage]) {
            for (let i of blocks[stage]) {
                if (
                    this.pos.x + this.w > i.pos[0] &&
                    this.pos.x < i.pos[0] + i.pos[2] &&
                    this.pos.y < i.pos[1]
                ) {
                    this.ground = i.pos[1];
                    break;
                } else {
                    this.ground = mainground;
                }
            }
        }
    }
    wallColision() {
        if (walls[stage]) {
            for (let i of walls[stage]) {
                if (
                    this.pos.x + this.w > i.pos[0] &&
                    this.pos.x + this.w < i.pos[0] + i.pos[2] &&
                    i.pos[1] < this.pos.y
                ) {
                    this.pos.x = i.pos[0] - this.w;
                } else if (
                    i.pos[0] + i.pos[2] > this.pos.x &&
                    this.pos.x + this.w > i.pos[0] &&
                    i.pos[1] < this.pos.y
                ) {
                    this.pos.x = i.pos[0] + i.pos[2];
                }
            }
        }
    }
    scroll() {
        if (this.pos.x < startScrollPosX) {
            this.drawpos.x = this.pos.x;
        } else if (this.pos.x > stageWidth - startScrollPosX) {
            this.drawpos.x = this.pos.x - stageWidth + w;
        } else {
            this.drawpos.x = startScrollPosX;

            backgroundPosX += -this.vel.x

            //background and foreground
            backgroundDrawPosX += -this.vel.x / 4
            foregroundPosX += -this.vel.x * 1.4;
            backgroundDrawPosX2 += -this.vel.x / 2;
        }
    }
    attack() {
        for (let i of enemies[stage]) {
            let dist = (i.pos.x - this.pos.x) * this.dir;
            if (dist < this.reach && dist > 0) {
                i.damage(round(playerStats.dmg * random(1, 1.5)));
                hurt.play();
                shakeSwitch = true;
            }
        }
    }
    projectileDamage() {
        for (let i of projectiles) {
            let dist = abs(i.pos.x - this.pos.x);
            if (dist < 10 && i.pos.y < this.pos.y + this.h && i.pos.y > this.pos.y) {
                if (this.shieldOn) {
                    playerStats.hp -= i.dmg / round(random(2, 3));
                } else {
                    playerStats.hp -= i.dmg;
                }
                hit.play();
                setTimeout(projectileKill(i), 100);
                shakeSwitch = true;
            }
        }
    }
}
class PlayerStats {
    constructor(maxhp) {
        this.hp = maxhp;
        this.dmg = 10;
        this.maxhp = maxhp;
        this.inventory = [new Item(item[0], "Sword", "Mysterious Sword"), 0, 0, 0, 0, 0, 0, 0, 0];
        this.equiped = 0;
        this.mana = 100;
        this.buffTimer = 0;
    }
    update() {
        if (this.buffTimer == 0) {
            this.dmg = 10 + stage;
        } else {
            this.buffTimer--;
            fill(0, 50);
            textSize(10);
            stroke(0, 100);
            rect(135, 7, 48, 48, 4);
            image(item[4], 143, 14);
            text("+DMG BUFF", 136, 52);
        }

        if (this.mana < 100) {
            this.mana += 0.03;
        }
        this.useCrystal();
    }
    health() {
        this.update();
        if (this.hp < 0) {
            youDied();
        }
        if (this.hp < this.maxhp) {
            this.hp += 0.01;
        }
    }
    useCrystal() {
        if (
            swUse &&
            this.inventory[this.equiped].type !== undefined &&
            this.mana > (this.inventory[this.equiped].tier + 1) * 15
        ) {
            //add more!
            //cases
            if (this.inventory[this.equiped].type == 1) {
                if (this.hp == this.maxhp) {
                    return;
                } else {
                    this.hp += (this.inventory[this.equiped].tier + 1) * 35;
                    if (this.hp > this.maxhp) {
                        this.hp = this.maxhp;
                    }
                    particlesParent.push(
                        new Particles(
                            playerPhysic.pos.x,
                            playerPhysic.pos.y,
                            1,
                            this.inventory[this.equiped].tier
                        )
                    );
                }
            }
            if (this.inventory[this.equiped].type == 2) {
                this.dmg = (stage + 7) * (this.inventory[this.equiped].tier + 2);
                particlesParent.push(
                    new Particles(
                        playerPhysic.pos.x,
                        playerPhysic.pos.y,
                        2,
                        this.inventory[this.equiped].tier
                    )
                );
                this.buffTimer = 1200;
            }
            this.mana -= (this.inventory[this.equiped].tier + 1) * 15;
            this.inventory[this.equiped] = 0;
        }
        swUse = false;
    }
}
class Companion extends PlayerPhysics {
    constructor(x, y, wi, he, maxhp, dmg) {
        super(x, y, wi, he);
        this.maxhp = maxhp;
        this.dmg = dmg;
        this.hp = maxhp;
        this.t = undefined;
        this.timer = 100;
        this.indexTimer = 6;
        this.action = 0;
        this.indtimer = 7;
    }
    show() {
        this.indtimer--;
        if (this.indtimer == 0) {
            this.indtimer = 7;
            companionSpriteIndex++;
            companionSpriteIndex = companionSpriteIndex % 6;
        }
        push();
        translate(this.drawpos.x - this.w / 1.5, this.drawpos.y - 15);
        scale(this.dir * 0.4, 0.4);
        let adder = 0;
        if (this.dir == -1) {
            adder = -this.w * 5;
        }
        image(companionSprites[this.action][companionSpriteIndex], adder, 0);
        pop();
    }
    move() {
        this.health();
        let distance = playerPhysic.pos.x - this.pos.x;
        if (abs(distance) > 150) {
            this.vel.x += playerPhysic.vel.x / 7;
            this.dir = playerPhysic.dir;
        }
        if (this.pos.x > stageWidth) {
            this.pos.x = stageWidth;
        } else if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.t !== undefined) {
            this.timer--;
            this.dir = -this.t.dir;
            if (this.timer < 1) {
                this.shot();
                this.timer = 100;
            }
        }
        this.target();
        if (this.vel.x < 0.6) {
            this.action = 0; //idle
        }
        if (abs(this.vel.x) > 0.6) {
            this.action = 1; //run
        }
    }
    scroll() {
        this.drawpos.x = this.pos.x + backgroundPosX;
    }
    projectileDamage() {
        for (let i of projectiles) {
            let dist = abs(i.pos.x - this.pos.x);
            if (dist < 10) {
                damageBubbles.push(
                    new DamageBubble(this.pos.x + this.w / 2, this.pos.y + this.h / 2, i.dmg)
                );
                this.hp -= i.dmg;
                hurt.play();
                projectileKill(i);
            }
        }
    }
    target() {
        let dists = [];
        for (let i of enemies[stage]) {
            let dist = abs(i.pos.x - this.pos.x);
            dists.push([dist, i]);
        }
        dists = dists.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
        if (dists[0] && dists[0][0] < 350) {
            this.t = dists[0][1];
        } else {
            this.t = undefined;
        }
    }
    shot() {
        if (this.t !== undefined) {
            projectiles2.push(
                new Projectile(
                    this.pos.x,
                    this.pos.y,
                    this.t,
                    0,
                    0,
                    this.w,
                    round(this.dmg * random(1, 1.5))
                )
            );
            this.attack();
        }
    }
    health() {
        if (this.hp < 0) {
            console.log("Companion died");
        }
        if (this.hp < this.maxhp) {
            this.hp += 0.01;
        }
    }
}
