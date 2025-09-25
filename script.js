//Implement your code here 
let player1 = document.getElementById("player1");

let player2 = document.getElementById("player2");

let btn = document.getElementById("fight");
let name11 = "alice";
let name22 = "bob";

let player11 = document.getElementById("player1");
let player22 = document.getElementById("player2");
let socre11 = 0;
let socre22 = 0;


let pokemon1 = document.getElementById("card1");
let pokemon2 = document.getElementById("card2");


 
btn.addEventListener("click", function () {
     
    let name1 = player11.querySelector("#p1_name");
    name1.textContent = name11;
     let score1 = document.querySelector("#p1_score");
let score2 = document.querySelector("#p2_score");
score1.textContent = socre11;
score2.textContent = socre22;

    let e1=fetchData(pokemon1); 
     
    let name2 = player22.querySelector("#p2_name");
    name2.textContent = name22;
   
    let e2 = fetchData(pokemon2);

    Promise.all([e1, e2])
        .then(function ([e1, e2]) {
           if (e1 > e2) {
        socre11 = socre11 + 1;
        score1 .textContent = socre11;
    } else {
        socre22 = socre22 + 1;
        score2 .textContent = socre22;
    }
     })
   
})


function fetchData(a) {
    return fetch("https://pokeapi.co/api/v2/pokemon/")
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            let url1 = data.results[shuffle(data.results.length)];
            return fetch(url1.url);
        })
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            let p = userDisplay(data, a);
            return p;
        }) 
    
}

function userDisplay(data, a) {

 
    let abilities1 = a.querySelector("#abilities");
   let imgDiv =a.querySelector("#img");
   let pokiName = a.querySelector("#name");
   let experience = a.querySelector("#experience");
  
    imgDiv.innerHTML = `<img src=" ${data.sprites.other.dream_world.front_default}" height = '300px' width = '300px'/>`;
    pokiName.textContent=data.name;
    experience.textContent=data.base_experience;
 
    let ability = data.abilities;
    abilities1.innerHTML = ""; 
    for (let i = 0; i < ability.length; i++){
        let li = document.createElement("li");
        li.textContent =  ability[i].ability.name;
        abilities1.appendChild(li);
    }

    a.append(imgDiv, pokiName, experience, abilities1);  
    return data.base_experience;
     
}

function shuffle(n) {
    let min = 0;
    let max = Math.floor(n);
    let random = Math.floor(Math.random( )* (max - min + 1)) + min;
    return random;
}