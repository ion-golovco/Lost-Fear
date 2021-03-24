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
    [0, 0, 0.5],
    [1, 0, 2],
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
    [0],
];

let stageWidthAr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let stagebackindex = 0;

let cutscenesText = [
    ["... It was the egg after all."],
    ["Not so fast are we now?"],
    ["A fateful encounter."],
    ["The story of a cat"],
    ["An angry forest"],
    ["What happened here?"],
    ["Close to Darkness"],
    ["The challenge just started"],

    ["Not so though anymore"],
    ["These crystals are awesome"],

    ["No need to be shy"],
    ["Go away you criminal scum"],

    ["It started raining"],
    ["A pleasant afternoon"],
    ["Too many to kill alone"],

    ["Another one bites the dust"],
    ["Not again!"],

    ["Here we go again"],
    ["This time it's worse"],
    ["A what?"],
    ["No way to live"],
    ["But plenty to die"],
];
let stageTextSub = [
    [
        ["This is weird.", 0],
        ["Why am I here. Who am I even.", 0],
        ["Everything hurts. Fells horrible.", 0],
        ["What is this place and why is it so quiet.", 0],
        ["Even the wind fells quiet.", 0],
        ["Can't remeber anything.", 0],
        ["Why do I have a sword? Was I fighting something? That could explain a few things.", 0],
        ["No point in just waiting around here.", 0],
        ["Should try to find a place to stay or maybe even someone to talk to.", 0],
        ["Well looking around I only see a path so let's take it.", 0],
        ["Look's like someone is over there. Well that was fast. Let's go greet them.", 0],
    ],
    [
        ["I guess it won't be that easy huh?", 0],
        ["I awaken and the first thing I find is a monster thirsty for my blood. ", 0],
        ["That's not very cool dude, not cool.", 0],
        ["At least I know how to use a sword huh.", 0],
        ["Guess i was some kind of adventurer.", 0],
        ["My gear looks pretty good for just a random aventurer tho.", 0],
        ["Well I should find something that isn't trying to kill me", 0],
    ],
    [
        ["This is getting out of hand", 0],
        ["Could definetely use some help.", 0],
        ["Would be convenient, maybe to much so.", 0],
        ["But now thinking about it, why are there so many monsters?", 0],
        ["Why is it that i wasn't attacked while I was dozing of?", 0],
        ["Even with my good gear they are pretty hard to get.", 0],
        ["These crytals do come in handy tho.", 0],
    ],
    [
        ["Hello there!", 1],
        ["General Kenobi?", 0],
        ["What?", 1],
        ["What?", 0],
        ["You there. I remember that sword, where did you get it from nya.", 1],
        ["I have no idea but wait, before that, shouldn't you introduce yourself?", 0],
        ["Not really", 1],
        ["We gotta start there really now huh.", 0],
        ["And did you just end your sentence with nya? And also you have cat ears?", 0],
        ["Are you a cosplayer or what?", 0],
        ["A what nya? I am a member of the Neko Clan, my name is Nyanta", 1],
        ["What is this now a weeb's fantasy or something?", 0],
        ["Tell me nya, where you found that sword?", 1],
        ["Told ya, have no clue. I don't remeber anything. Even my own name.", 0],
        ["But I d....", 1],
        ["Really now, nya. What a handful.", 1],
        ["Maybe if we walk around a bit you will regain some memories.", 1],
        ["You should at least....", 1],
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
