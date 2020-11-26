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
let speed = 0.7;

let spriteindex = 0;
let companionSpriteIndex = 0;
let playerActions = ["attack", "fall", "idle", "jump", "run", "block", "die"];

let playerLog = [];

let enemies = [];
let appear = true;

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

let enemiesSpawn = [[[0, 0, 0.5], [1,1,0.5]], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0], [0]];

let stageWidthAr = [
    3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];
let stagebackindex = 0;

let cutscenesText = [
    ["the beggining of the end"],
    ["i saw a bird"],
    ["back in the full moon"],
    ["I get it"],
    ["no i dont"],
    ["jeje"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
    ["nonon"],
];
let stageTextSub = [
    [["...", 0]],
    [
        ["You have no shame dereck", 1],
        ["Who is derek?", 0],
        ["who are you first of all", 1],
    ],
    [["...", 0]],
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
    [["...", 1]],
];
