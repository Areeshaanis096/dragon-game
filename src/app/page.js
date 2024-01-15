'use client'
import { useState } from 'react'

export default function Home() {
  
  // variables
  const locations = [
    {
      name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "defeat monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉."
  }
];
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
// let fightings;


// states
const [xp,setXp] =useState(0) ;
const [health,sethealth] =useState(100); 
const [gold,setgold] =useState(50) ;
const [btn1,setbtn1] =useState("Go to store") 
const [btn2,setbtn2] =useState("Go to cave") 
const [btn3,setbtn3] =useState("Fight dragon")  
const [text,setText] =useState("Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.") 
const [inventory,setInventory]= useState(["stick"])
const [monsterName,setMonsterName]= useState("")
const[monsterHealth,setMonsterHealth] = useState(0)
const [monsterStat, setMonsterStat]= useState(false)
// const [currentWeapon,setCurrentWeapon]= useState(0)
const [fighting,setFighting]= useState(0)
let currentWeapon = 0
// functions
function update  (location){
  setMonsterStat(false)
  // setMonsterHealth(0)
  // setMonsterName("")
  setbtn1(location["button text"][0])
  setbtn2(location["button text"][1])
  setbtn3(location["button text"][2])
  setText(location.text)
}
// const onclick2 = () =>{
//     switch(btn1){
//     case "Go to cave":
//     {goCave()}
//     break;
//     case "Buy weapon (30 gold)":
//     {buyWeapon()}
//     break;
//     case "Fight fanged beast":
//     {fightBeast()}
//     break;
//     case "Dodge":
//     {dodge()}
//     break;
//     case "sell weapon for (15 gold)":
//     {sellWeapon}
//     break;
//   }}
const onclick1=()=>{
for(let i=0;i<locations.length;i++){
  if(btn1 === locations[i]["button text"][0]){
      locations[i]["button functions"][0]()
  }
  
}
}
const onclick2 = () =>{
  for(let i=0;i<locations.length;i++){
    if(btn2 === locations[i]["button text"][1]){
        locations[i]["button functions"][1]()
      } if(btn2 === "sell weapon for (15 gold)"){
        sellWeapon()
        break;
    } 
     
  }
  }
const onclick3=()=>{
  for(let i=0;i<locations.length;i++){
    if(btn3 === locations[i]["button text"][2]){
        locations[i]["button functions"][2]()
        break;
    }
    
  }
}

function goStore(){
  update(locations[1])
}
function goFight(fight){
  setFighting(fight)
  update(locations[3]);
  setMonsterStat(true)
  setMonsterName(monsters[fight].name)
  setMonsterHealth(monsters[fight].health)
}

function fightBeast(){
  // setFighting(1)
  goFight(1)
}
function fightSlime(){
  // setFighting(0)
  goFight(0)
}
function fightDragon(){
  // setFighting(2)
  goFight(2)
}
  
function attack(){
  if(health > 0 && monsterHealth > 0 ){
    console.log(inventory)
  setText("The "+monsterName+" attacks. You attack it with your "+weapons[inventory.length-1].name)
  sethealth(health - getMonsterAttackValue(monsters[fighting].level))
  console.log(inventory)
  if(isMonsterHit()){
  setMonsterHealth(monsterHealth - (weapons[inventory.length-1].power+ Math.floor(Math.random()* xp)+1))
  }else{setText("You miss..")}
}
if (Math.random() <= .1 && inventory.length !== 1) {
  setText( " Your " + inventory.pop() + " breaks.");
  // setCurrentWeapon(currentWeapon-1);
}
if (health <= 0 && health < monsterHealth){
  lose()
}else if (monsterHealth <= 0){
  fighting === 2 ? winGame() : defeatMonster()
}
}
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  // console.log(hit);
  return hit > 0 ? hit : 0;
}

const isMonsterHit=()=>{
  return Math.random() > .2 || health < 20;

}
function dodge(){
  setText("You dodge the attack from "+monsterName)
}
const defeatMonster = () =>{
  setgold(gold + Math.floor(monsters[fighting].level*6.7))
  setXp(xp + monsters[fighting].level)
    update(locations[4])
}
const lose =()=>{
  update(locations[5])
}
const winGame =()=>{
  update(locations[6])
}
function restart(){
  // setCurrentWeapon(0)
  setXp(0)
  setgold(50)
  sethealth(100)
  setInventory(["stick"])
  goTown()
}

function buyHealth(){
  if(gold <= 9){
    setText("You don't have enough gold")
  }else{
    sethealth(health+10)
    setgold(gold-10)}
}
function buyWeapon(){
    if (inventory.length < weapons.length){
      if(gold >= 30){

        let boughtOne = weapons[inventory.length].name
      inventory.push(boughtOne)
      // console.log(currentWeapon)
      setText("you now have a " + boughtOne + ". In your inventory you have: "+ inventory)
      setgold(gold-30)
      }else{
        setText("You don't have enough gold to buy a weapon")
      }
    }else{
      setText("You have the most powerful weapon")
      setbtn2("sell weapon for (15 gold)")

    }
}

const sellWeapon=()=>{
  if(inventory.length > 1){
    let soldOne = inventory.pop();
    setgold(gold + 15)
    console.log(soldOne)
    setText("you sold your " + soldOne+" .In your inventory you have " + inventory)
  }else{
    setText("Don't sell your only weapon")
  }
}
function goCave(){
  update(locations[2])
}
function goTown(){
  update(locations[0])
}
return(
    <main>
      <div className='bg-white max-w-lg max-h-96 mt-2 mx-auto mb-0 p-2' >
        <div id = "stats" className='border-black border-2 p-1 text-[#0a0a23] flex'>
         <span className='mr-2'> xp:{xp}</span>
          <span className='mr-2'>health:{health}</span>
          <span className='mr-2'>gold:{gold}</span>
        </div>
        <div id="controls" className='border-black border-2 p-1 text-[#0a0a23]'>

          {/* button1 */}
          <button onClick={onclick1} className='text-[#0a0a23] bg-[#feac32] bg-gradient-to-r from-[#fecc4c] to-[#ffac33] border-[#feac32] border-2 m-1 text-xs'>{btn1}</button>

            {/* button2 */}
          <button onClick={onclick2} className='text-[#0a0a23] bg-[#feac32] bg-gradient-to-r from-[#fecc4c] to-[#ffac33] border-[#feac32] border-2 m-1 text-xs'>{btn2}</button>

            {/* button3 */}
          <button onClick={onclick3} className='text-[#0a0a23] bg-[#feac32] bg-gradient-to-r from-[#fecc4c] to-[#ffac33] border-[#feac32] border-2 m-1 text-xs'>{btn3}</button>
        </div>
        <div className={`bg-[#c70d0d] text-white border-2 border-black ${ monsterStat ? "block" : "hidden"} `}>
          <span className='m-1'>monsterName: {monsterName}</span> 
          <span className='m-1'>health: {monsterHealth}</span>
        </div>
        <div id = "text" class="bg-[#0a0a23] text-white p-2 ">{text}</div>
      </div>
        

  </main>
)
}
