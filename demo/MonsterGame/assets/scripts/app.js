const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 17;
const HEAL_VALUER = 20;

const LOG_EVENT_PLAYER_ATTACK ='ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK='STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL='HEAL';
const LOG_EVENT_GAME_OVER='GAME_OVER';

let logEvent;
let battleLog = [];

function getMaxLifeValues(){
    const enteredValue=prompt('Maximum life for and monster:');
    const parseValue = parseInt(enteredValue);
    if(isNaN(parseValue)||parseValue<=0){
        throw{
            message: 'Invalid user input, not a number.'
        };
    }
    return parseValue;
}

let chosenMaxLife = 100;

try{
    chosenMaxLife=getMaxLifeValues();
}catch(error){
    console.log(error);
    chooseMaxLife = 100;
    console.log('max',chosenMaxLife);
}

if(isNaN(chosenMaxLife || chosenMaxLife<=0)){
    chosenMaxLife=100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
    currentPlayerHealth=chosenMaxLife;
    currentMonsterHealth=chosenMaxLife;
    resetGame(chosenMaxLife);
}
function writeToLog(ev,val,monsterHealth,playerHealth){
    let logEntry = {
        event:ev,
        value:val,
        finalMonsterHealth:monsterHealth,
        finalPlayerHealth:playerHealth
    }
    switch(ev){
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
    
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';

            break;
    
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'MONSTER';

            break;
    
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'MONSTER';

            break;
    
        case LOG_EVENT_GAME_OVER:
            logEntry.target = 'MONSTER';

            break;
        default:
            logEntry = {};
    
        }
    // switch(ev){
    // case LOG_EVENT_PLAYER_ATTACK:
    //     logEntry.target = 'MONSTER';
    //     break;

    // case LOG_EVENT_PLAYER_STRONG_ATTACK:
    //     logEntry={
    //         event:ev,
    //         value:val,
    //         target:'MONSTER',
    //         finalMonsterHealth:monsterHealth,
    //         finalPlayerHealth:playerHealth
    //     }
    //     break;

    // case LOG_EVENT_MONSTER_ATTACK:
    //     logEntry={
    //         event:ev,
    //         value:val,
    //         target:'PLAYER',
    //         finalMonsterHealth:monsterHealth,
    //         finalPlayerHealth:playerHealth
    //     }
    //     break;

    // case LOG_EVENT_PLAYER_HEAL:
    //     logEntry={
    //         event:ev,
    //         value:val,
    //         target:'PLAYER',
    //         finalMonsterHealth:monsterHealth,
    //         finalPlayerHealth:playerHealth
    //     }
    //     break;

    // case LOG_EVENT_GAME_OVER:
    //     logEntry={
    //         event:ev,
    //         value:val,
    //         finalMonsterHealth:monsterHealth,
    //         finalPlayerHealth:playerHealth
    //     }
    //     break;
    // default:
    //     logEntry = {};

    // }

    battleLog.push(logEntry);
    console.log(battleLog);
}
function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -=playerDamage;
    
    writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentPlayerHealth,currentMonsterHealth);
    if(currentPlayerHealth<=0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert ('You will be dead but the bonus life save you once.');
    }

    if(currentMonsterHealth<=0 && currentPlayerHealth>0){
        alert('Player win');
        writeToLog( 
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
            );

    }else if(currentPlayerHealth<=0 && currentMonsterHealth>0){
        alert('Monster win');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );

    }else if(currentPlayerHealth<=0 && currentMonsterHealth<=0){
        alert('It is a draw');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }
    if(currentMonsterHealth<=0 || currentPlayerHealth<=0){
        reset();

    }
}

function attackMonster(mode){
    let maxDamage;
    if(mode === 'ATTACK'){
        maxDamage=ATTACK_VALUE;
        logEvent=LOG_EVENT_PLAYER_ATTACK;
    }else if(mode === 'STRONG_ATTACK'){
        maxDamage=STRONG_ATTACK_VALUE;
        logEvent=LOG_EVENT_PLAYER_STRONG_ATTACK;

    }
    const damage = dealMonsterDamage(maxDamage);
        currentMonsterHealth -= damage;
    writeToLog(logEvent,damage,currentMonsterHealth,currentPlayerHealth);
    endRound();
}

function attackHandler(){
attackMonster('ATTACK');
}
function strongAttackHandler(){
attackMonster('STRONG_ATTACK');
}
function healPLayerHandler(){
    let healValue;
    if(currentPlayerHealth>=chosenMaxLife-HEAL_VALUER){
        healValue = chosenMaxLife-currentPlayerHealth;
    }else {
        healthValue=HEAL_VALUER;
    }
    increasePlayerHealth(healValue);
        currentPlayerHealth+=healValue;
    endRound();

}
function printLogHandler(){
    for(let i=0;i<battleLog.length;i++){
        console.log(battleLog[i]);
    }
}
function printLogHandler2(){
    for(const logEntry of battleLog){
        console.log(logEntry);
    }
}

function printLogHandler3(){
    let i=0;
    while(i<battleLog.length){
        console.log(battleLog[i]);
        i++;
    }
}

function printLogHandler4(){
    let i = 0;
    for(const logEntry of battleLog){
        for(const key in logEntry){
            console.log(`${i}:${key} =>${logEntry[key]}`);
        }
        i++;
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click',healPLayerHandler);
// logBtn.addEventListener('click', printLogHandler);
logBtn.addEventListener('click', printLogHandler2);