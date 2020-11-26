class Enemy {
    constructor(x, y, type, maxhp, dmg, sprt, w, h) {
        this.pos = createVector(x, y);
        this.drawpos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.spawnPos = createVector(x, y);
        this.hp = maxhp;
        this.maxhp = maxhp;
        this.dmg = dmg;
        this.variationOfEnemy = sprt;
        this.w = w;
        this.h = h;
        this.t = undefined;
        this.enemyType = type;
        this.dir = 1;
        this.wander = wanderFromPos * random(1, 2);
    }
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= 0.9;
        this.vel.y *= 0.9;
        this.scroll();
        this.show();
        this.idleMove();
        this.target();
        this.projectileDamage();
    }
    show() {
        fill(0);
        rect(this.drawpos.x, this.drawpos.y, this.w, this.h);
    }
    damage(dmg) {
        this.hp -= dmg;
        damageBubbles.push(new DamageBubble(this.pos.x + this.w / 2, this.pos.y + this.h / 2, dmg));
        if (this.hp <= 0) {
            this.drop()
            killEnemy(this);
        }
    }
    drop(){
        let chanceForDrop = random();
            if (chanceForDrop < 0.2) {
                let type = round(random()) + 1;
                drops.push(
                    new itemDrop(this.pos.x, this.pos.y, new Crystal(round(random()), type))
                );
        }
    }
    target() {
        let dist = abs(playerPhysic.pos.x - this.pos.x);
        let distC = abs(companion.pos.x - this.pos.x);
        if (this.t == undefined) {
            if (dist < 350) {
                this.t = playerPhysic;
            } else if (distC < 350) {
                this.t = companion;
            } else if (dist > 350 && distC > 350) {
                this.t = undefined;
            }
        }
        if (dist > 350) {
            this.t = undefined;
        }
    }
    scroll() {
        this.drawpos.x = this.pos.x + backgroundPosX;
    }
    projectileDamage() {
        for (let i of projectiles2) {
            let dist = abs(i.pos.x - this.pos.x);
            if (dist < 25 && i.pos.y < this.pos.y + this.h * 1.25 && i.pos.y > this.pos.y - 20) {
                this.damage(i.dmg);
                projectileKill2(i);
            }
        }
    }
}
class Skeleton extends Enemy {
    constructor(x, y, type, maxhp, dmg, sprt, w, h) {
        super(x, y, type, maxhp, dmg, sprt, w, h);
        this.timer = 100;
    }
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= 0.9;
        this.vel.y *= 0.9;
        this.scroll();
        this.show();
        this.idleMove();
        this.target();
        this.move();
        this.projectileDamage();
    }
    idleMove() {
        if (this.t == undefined) {
            this.vel.x += this.dir / 16;
            if (this.pos.x < this.spawnPos.x - this.wander) {
                this.dir = 1;
            }
            if (this.pos.x > this.spawnPos.x + this.wander) {
                this.dir = -1;
            }
        }
    }
    move() {
        if (this.t !== undefined) {
            this.timer--;
            if (this.timer < 1) {
                this.shot();
                this.timer = 100;
            }
        }
    }
    shot() {
        if (this.t !== undefined) {
            projectiles.push(
                new Projectile(this.pos.x, this.pos.y, this.t, 0, this.dir, this.w, this.dmg)
            );
        }
    }
}
