let w, h;
let playerPhysic;
let playerStats;
let companion;

let attack = 0;
let inGame = 0;
let noMenu = true;

let mainground = 576 - 75;

let stage = 0;
let sw0 = 0,
    asw = 0,
    sw2 = false,
    sw3 = false,
    swUse = false;
let ifSwitch = true;
let noCutScene = true;
let noTextSubs = true;
let notInBattle = true;
let noInventory = false;
let dead = false;
let limitedView = true;
let showProps = true;

let bg, bg2;
let fg, vign;
let onGround;
let arrow = [];
let playerSprites = [[], [], [], [], [], [], []];
let companionSprites = [[], [], [], [], []];
let props = [];
let pixelFont;

let backgroundPosX = 0;
let backgroundPosY = 0;
let backgroundDrawPosY = 0;
let backgroundDrawPosX = 0;
let backgroundDrawRelativeX;
let backgroundDrawPosX2 = 0;
let backgroundDrawRelativeX2;
let onGroundDrawRelativeX;
let foregroundPosX = 0;
let foregroundRelativeX;
let startScrollPosX;
let stageWidth;

let dark;
let speed = 0.5;

let spriteindex = 0;
let companionSpriteIndex = 0;
let playerActions = ["attack", "fall", "idle", "jump", "run", "block", "die"];

let playerLog = [];

let enemies = [];
let appear = false;

let projectiles = [];
let drops = [];
let projectiles2 = [];
let damageBubbles = [];
let blocks = [[], []];
let walls = [[], []];
let groundProps = [];
let torchSpot = [];
let onGroundProp;
let rain = [];
let rainy = false;
let inc = 0.1;
let corruption;

let speak, hurt, hit;

let wanderFromPos = 90;

let textSubs = [];
let indexTextSub = 0;
let trigerTextSubs = false;
let cutscenes = [];
let cutSceneIndexer = 0;

let item = [];

let crystalNames = [
    ["Explosion", "Explosion", "Destruction"],
    ["Recovery", "Health", "Life"],
    ["Strenght", "Power", "Power"],
];
let particlesParent = [];
let particles = [];

let crystalTiers = ["Shard", "Crystal", "Grand Crystal"];

let enemiesSpawn = [
    [0],
    [1, 0, 0.5],
    [2, 0, 0.5],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
];

let stageWidthAr = [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let stagebackindex = 0;

let cutscenesText = [
    ["Not again!"],

    ["Here we go again"],
    ["This time it's worse"],
    ["A what?"],
    ["No way to live"],
    ["But plenty to die"],
    ["Here we go again"],
    ["This time it's worse"],
    ["A what?"],
    ["No way to live"],
    ["But plenty to die"],
];
let stageTextSub = [
    [
        ["This is weird.", 0],
    ],
    [
        ["That's not very cool dude, not cool.", 0],
    ],
    [
        ["This is getting out of hand", 0],
    ],
    [
        ["Hello there!", 1],
        ["General Kenobi?", 0],
    ],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
    [["...", 1]],
];
