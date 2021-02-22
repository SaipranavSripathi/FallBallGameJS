var character=document.getElementById("character");
var game=document.getElementById("game");
var interval;
var both=0;
var counter=0;
//to make them move up the blocks array
var currentBlocks=[];

function moveLeft(){
    var left=parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0)
    character.style.left=left-2+"px";
}

function moveRight(){
    var right=parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(right<380)
    character.style.left=right+2+"px";
}

//for listening to movement
document.addEventListener("keydown",event=>{
    if(both==0 ){
        both++;
        if(event.key=="ArrowLeft")
        interval=setInterval(moveLeft,1);
        if(event.key=="ArrowRight")
        interval=setInterval(moveRight,1);
    }
});


//to stop the movement when required--->for unclick
document.addEventListener("keyup", event=>{
    clearInterval(interval);
    both=0;
});

var blocks=setInterval(function(){
    //previous block and holes
    var blockLast=document.getElementById("block"+(counter-1));
    var holeLast=document.getElementById("hole"+(counter-1));
    
    //to get values of previous block
    if(counter>0){
        var blockLastTop=parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop=parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    //to generate obstacles only iuf they fit inside
    if(blockLastTop<400 || counter==0){
        // creating block var and hole var
        var block=document.createElement("div");
        var hole=document.createElement("div");

        //assigning classes to var
        block.setAttribute("class","block");
        hole.setAttribute("class","hole");

        //assigning id's to var
        block.setAttribute("id","block"+counter);
        hole.setAttribute("id","hole"+counter);

        block.style.top=blockLastTop+100+"px";
        hole.style.top=holeLastTop+100+"px";
        console.log(blockLast);
        console.log(holeLast);
        //holes random position
        var random=Math.floor(Math.random()*360);
        hole.style.left=random+"px";

        //child to game div
        game.appendChild(block);
        game.appendChild(hole);

        //the newest bloack and hole created
        currentBlocks.push(counter);
        counter++;
    }

    var characterTop=parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft=parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop=0;
    
    //Game over and restarts
    if(characterTop<=0)
    {   alert("GAME OVER\n Score : "+(counter-9));
        //clear the game
        clearInterval(blocks);
        //restart
        location.reload();
    }
    //to iterate through all the blocks and holes
    for(var i=0;i<currentBlocks.length;i++){
        let current=currentBlocks[i];
        let iblock=document.getElementById("block"+current);
        let ihole=document.getElementById("hole"+current);
        let iblockTop=parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft=parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        
        //moving up
        iblock.style.top=iblockTop-0.5+"px";
        ihole.style.top=iblockTop-0.5+"px";
        //reduce memory burden.....remove the block and hole from array if not visible
        if(iblockTop<-20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop=0;
            }
        }
    }
    //drop==0 if on hole-->drop
    if(drop==0){
        //if the ball can drop ---> in the game plane only
        if(characterTop<480)
        character.style.top=characterTop+2+"px";
        
    }
    else
    character.style.top=characterTop-0.5+"px";
},2);