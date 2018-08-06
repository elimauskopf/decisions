



loader.add([
    "/images/char.png",
    "/images/Basic_Door_Opening_Pixel.png",
    "/images/Basic_Door_Pixel.png",
    "/images/wall.png",
    "/images/enemy.png",
    "/images/spike.png",
    "/images/blood.png"
])
.on("progress", loadProgressHandler)
.load(setup)

function loadProgressHandler(loader, resource) {
    
    //display file 'url' currently being loaded 
    console.log("loading: " + resource.url);

    //display the percentage of files currently loaded
    console.log("progress: " + loader.progress + "%")
}

let char, welcomeScene, sceneIndex, doorOpen1, doorOpen2, doorClose1, doorClose2, f, enemyArr, id, decisionMade, wallOne, blood, ticker, dead, isDead = false;

function setup(){

    console.log("All files loaded")

    sceneArr = [];
    sceneIndex = 0;

    //define scenes
    welcomeScene = new Container();
    sceneArr.push(welcomeScene);

    secondScene = new Container();
    secondScene.visible = false;
    sceneArr.push(secondScene);
    sceneArr.push(secondScene)

    wanderingScene = new Container();
    wanderingScene.visible = false;
    sceneArr.push(wanderingScene);

    goingScene = new Container();
    goingScene.visible = false;
    sceneArr.push(goingScene);

    decisionScene = new Container();
    decisionScene.visible = false;
    sceneArr.push(decisionScene);

    goodDecisionScene = new Container();
    goodDecisionScene.visible = false;
    sceneArr.push(goodDecisionScene);

    badDecisionScene = new Container();
    badDecisionScene.visible = false;
    sceneArr.push(badDecisionScene);

    postDecisionScene = new Container();
    postDecisionScene.visible = false;
    sceneArr.push(postDecisionScene)

    leapMessageScene = new Container();
    leapMessageScene.visible = false;
    sceneArr.push(leapMessageScene);

    faithScene = new Container();
    faithScene.visible = false;
    sceneArr.push(faithScene);

    app.stage.addChild(welcomeScene); //0
    app.stage.addChild(secondScene); //1, 2
    app.stage.addChild(wanderingScene); //3
    app.stage.addChild(goingScene); //4
    app.stage.addChild(decisionScene); //5 
    app.stage.addChild(goodDecisionScene); //6
    app.stage.addChild(badDecisionScene); //7
    app.stage.addChild(postDecisionScene); //8
    app.stage.addChild(postDecisionScene); //9
    app.stage.addChild(leapMessageScene); //10
    app.stage.addChild(faithScene); //11

    //creat char sprite, add to every scene
    char = new Sprite(resources["/images/char.png"].texture);
    app.stage.addChild(char)

    

     //text stuff
     let style = new TextStyle({
        fontFamily: "Futura",
        fontSize: 45,
        fill: "white"
      });

    //SOUNDS
    const footsteps = PIXI.sound.Sound.from('/sounds/running.mp3');
    dead = PIXI.sound.Sound.from('/sounds/1.mp3');
    PIXI.sound.Sound.from({
        url: 'sounds/florist.mp3',
        volume: 0.5,
        autoPlay: true,
        complete: function() {
            console.log('Sound finished');
        }
    });

    //MESSAGES  

    //welcome scene message
    message = new Text("Press A to move left", style);
    message.x = 445;
    message.y = 230;
    welcomeScene.addChild(message)

    //wandering scene message
    wanderingMessage = new Text("Sometimes we find" + '\n' + "ourselves wandering...", style);
    wanderingMessage.x = 445;
    wanderingMessage.y = 230;
    wanderingScene.addChild(wanderingMessage)

    //going  scene messaage
    goingMessage = new Text("Often not really sure" + '\n' + "where we're going", style);
    goingMessage.x = 445;
    goingMessage.y = 100;
    goingScene.addChild(goingMessage)

     //going  scene messaage
     decisionMessage = new Text("Eventually we have to" + '\n' + "make a decision" + '\n' + "and choose our own path" + '\n' + "(by pressing f)" , style);
     decisionMessage.x = 445;
     decisionMessage.y = 100;
     decisionScene.addChild(decisionMessage)

    //post decision messages 
    badDecisionMessage = new Text("Maybe that wasn't the best decision" + '\n' + "but it felt pretty good" + '\n' + "getting through it", style);
    badDecisionMessage.x = 420;
    badDecisionMessage.y = 100
    badDecisionMessage.visible = false;
    postDecisionScene.addChild(badDecisionMessage);

    goodDecisionMessage = new Text("See that wasn't so bad", style);
    goodDecisionMessage.x = 420;
    goodDecisionMessage.y = 100;
    goodDecisionMessage.visible = false;
    postDecisionScene.addChild(goodDecisionMessage);

    leapMessage = new Text("But How do we make decisions" + '\n' + "in our own lives?", style);
    leapMessage.x = 400;
    leapMessage.y = 100;
    leapMessageScene.addChild(leapMessage)

    //faith message
    faithMessage = new Text("All it takes is a leap of faith", style);
    faithMessage.x = 400;
    faithMessage.y = 50
    faithScene.addChild(faithMessage)

    deadMessage = new Text("Just mabye not into a bed of spikes", style)
    deadMessage.x = 400;
    deadMessage.y = 50;
    deadMessage.visible = false;
    faithScene.addChild(deadMessage);
    


    //SCENE SPRITES
    doorOpen1 = new Sprite(resources["/images/Basic_Door_Opening_Pixel.png"].texture)
    doorOpen2 = new Sprite(resources["/images/Basic_Door_Opening_Pixel.png"].texture)
    doorClose1 = new Sprite(resources["/images/Basic_Door_Pixel.png"].texture)
    doorClose2 = new Sprite(resources["/images/Basic_Door_Pixel.png"].texture)

    doorOpen1.visible = false;
    doorOpen2.visible = false;

    doorOpen1.width = 120
    doorOpen1.height = 160;
    doorOpen1.x = 300;
    doorOpen1.y = 550;

    doorClose1.width = 120;
    doorClose1.height = 160;
    doorClose1.x = 300;
    doorClose1.y = 550;

    doorOpen2.width = 120
    doorOpen2.height = 160;
    doorOpen2.x = 800;
    doorOpen2.y = 550;
    
    doorClose2.width = 120;
    doorClose2.height = 160;
    doorClose2.x = 800;
    doorClose2.y = 550;

    decisionScene.addChild(doorOpen1, doorOpen2, doorClose2, doorClose1)


    //GOOD DECISION SCENE STUFF
    let doge = PIXI.Sprite.fromImage("/images/doge.jpg")
    doge.anchor.x = 0
    doge.anchor.y = 0;
    // doge.position.x = 1335/2;
    // doge.position.y = 320;
    goodDecisionScene.addChild(doge)

    
    //FAITH SCENE SPRITES
    let rectangleOne = new Graphics();
    rectangleOne.beginFill(0x66CCFF);
    rectangleOne.lineStyle(4, 0xFF3300, 1);
    rectangleOne.drawRect(1000, 320, 400, 400)
    rectangleOne.endFill();
    faithScene.addChild(rectangleOne);
    
    let rectangleTwo = new Graphics();
    rectangleTwo.beginFill(0x66CCFF);
    rectangleTwo.lineStyle(4, 0xFF3300, 1);
    rectangleTwo.drawRect(0, 320, 400, 400)
    rectangleTwo.endFill();
    faithScene.addChild(rectangleTwo);

    let numSpikes=9,
      spikesOffset= 0;

    for (let i = 0; i<numSpikes; i++){
        let spike = PIXI.Sprite.fromImage("/images/spike.png")
        spike.y = 630;
        spike.x = 400 + spikesOffset;
        spikesOffset+=50;
        faithScene.addChild(spike)

    }

    //blood
    blood = new Sprite(resources["/images/blood.png"].texture)
    blood.height = 100;
    blood.width = 100;
    blood.visible = false;
    faithScene.addChild(blood)

    
    //Enemies
    let numberOfEnemies = 5,
      spacing = 200,
      xOffset = 20,
      speed = 4,
      direction = 1;

    enemyArr = [];
    
   for (let i = 0; i <numberOfEnemies; i++){
       let enemy = new Sprite(resources["/images/enemy.png"].texture)

       //Space each blob horizontally according to the `spacing` value.
        //`xOffset` determines the point from the left of the screen
        //at which the first blob should be added
         let x = spacing * i + xOffset;

         //give random y pos
         let y = randomInt(0, 1335 - enemy.height);
         //aconsole.log(y)

         //set enemies position
         enemy.y = y;
         enemy.x = x;
         
         console.log(enemy.y)

         enemy.vy = speed * direction;

         direction *= - 1;

        
         enemyArr.push(enemy)
         badDecisionScene.addChild(enemy)

   }


      

    //set size of image
    char.width = 80;
    char.height = 120;

    //initial char pos
    char.x = 1335;
    char.y = 640;

    //set initial velocity
    char.vx = 0;
    char.vy = 0;
    //set anchor point
    char.anchor.x = 0.5
    char.anchor.y = 0.5;

   

    
    

   

    //capture keyboard keys
    let up = keyboard(87),
        left = keyboard(65),
        right = keyboard(68),
        down = keyboard(83),
        space = keyboard(32)
        
    f = keyboard(70)

    f.press = () => { 
        if (hitTestRectangle(char, doorOpen1)){
            
            sceneArr[sceneIndex].visible = false;
            sceneIndex++;
            sceneArr[sceneIndex].visible = true;
            char.x = 1335;
            char.y = 640;
        } else if(hitTestRectangle(char, doorOpen2)){
            
            sceneArr[sceneIndex].visible = false;
            sceneIndex+=2;
            sceneArr[sceneIndex].visible = true;
            char.x = 1335;
            char.y = 640;
    }
}    

    

    //left key pressed
    left.press = () => {
        //change velocity 
        
            char.vx = -10;
            char.vy = 0;

        footsteps.play()
        
    };
    
    //Left arrow key `release` method
    left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the char isn't moving vertically:
    //Stop the char
    if (!right.isDown && char.vy === 0) {
      char.vx = 0;
    }
    footsteps.stop()
  };

  

  //Right 
  right.press = () => {
      
        char.vx = 10; 
        char.vy = 0;
        footsteps.play()

      
  };
  right.release = () => {
      if (!left.isDown && char.vy === 0){
          char.vx = 0;
      }
     footsteps.stop()

  };

 

    //set state
    state = play;

    ticker = new PIXI.ticker.Ticker()
    

    //start game loop
    app.ticker.add(delta => gameLoop(delta));

   
}

function gameLoop(delta) {
        
    //update game state
    state(delta)
}

 function play(delta){
   
    
    
   

    let charHitLeft = contain(char, {x: 0, y:0, width: app.width, height: app.height})

    //hit collision

    if (charHitLeft === "left") {

        
        //set current scene to invis
        if(sceneIndex !== 6 && sceneIndex !== 7){

            
            sceneArr[sceneIndex].visible = false;
            sceneIndex++;
        } else{ //scene 6 or 7
            sceneArr[sceneIndex].visible = false
            if (sceneIndex === 6){
                sceneIndex+=2;
                decisionMade = 'good'
                goodDecisionMessage.visible = true
                
            } else {
                sceneIndex++;
                decisionMade = 'bad'
                badDecisionMessage.visible = true
            }
        }
       

       
        //set new scene to visible
        sceneArr[sceneIndex].visible = true

        //reset char position
        if(sceneIndex!==10){
            char.x = 1335;
            char.y = 640;
        } else {
            char.x = 1335
            char.y = 260
        }
        

    }

    if (char.x >= 1400){
        sceneArr[sceneIndex].visible = false;

        if(sceneIndex === 7){
            sceneIndex -=2;
        } else {
            sceneIndex--;
        }
        sceneArr[sceneIndex].visible = true
        char.x = 100
            char.y = 640
    }

    

     //check for decision scene
        if(sceneIndex === 5){

            
            if(hitTestRectangle(char, doorOpen1)){
                doorClose1.visible = false;
                doorOpen1.visible = true;

               

            } else if(hitTestRectangle(char, doorOpen2)){
                doorClose2.visible = false;
                doorOpen2.visible = true;
            }
            

            
            else {
                doorClose2.visible = true;
                doorClose1.visible = true;
                doorOpen1.visible = false;
                doorOpen2.visible = false;
                
            }
        }

        if(sceneIndex === 7){
            enemyArr.forEach((enemy) => {
                enemy.y += enemy.vy;

                let enemyHitWall  = contain(enemy, {x:0, y:0, width: 1335, height: 800});

                if (enemyHitWall === "top" || enemyHitWall === "bottom"){
                    enemy.vy *= -1;
                }

                if(hitTestRectangle(char, enemy)){
                    char.x = 1335;
                    char.y = 640;
                }
            })

            
        }

        //FAITH SCENE
        if (sceneIndex === 10){
            if(char.x <980 && char.x >400){
                if (char.y >= 620 && !isDead ){
                    char.vx = 0;
                    char.vy = 0;
                    char.rotation = 1.3;
                    blood.x = char.x -5;
                    blood.y = char.y - 10;
                    blood.rotation = .3

                    //spawn despawn stff
                    blood.visible = true
                    faithMessage.visible = false
                    deadMessage.visible = true;

                    dead.play()
                    isDead = true;
                } else if(!isDead)  {
                    char.vy = 12;
                    char.vx = -3;
                }
                
            }


        }
       

    
    

    //x = 1335
    //y= 640
    

    //x=-40
    //y=640
    
    char.x += char.vx;
    char.y += char.vy;
    

    
}



