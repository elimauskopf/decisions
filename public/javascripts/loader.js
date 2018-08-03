


loader.add([
    "/images/char.png",
    "/images/Basic_Door_Opening_Pixel.png",
    "/images/Basic_Door_Pixel.png"
])
.on("progress", loadProgressHandler)
.load(setup)

function loadProgressHandler(loader, resource) {
    
    //display file 'url' currently being loaded 
    console.log("loading: " + resource.url);

    //display the percentage of files currently loaded
    console.log("progress: " + loader.progress + "%")
}

let char, welcomeScene, sceneIndex, doorOpen1, doorOpen2, doorClose1, doorClose2, f;

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

    app.stage.addChild(welcomeScene); //0
    app.stage.addChild(secondScene); //1, 2
    app.stage.addChild(wanderingScene); //3
    app.stage.addChild(goingScene); //4
    app.stage.addChild(decisionScene); //5 
    app.stage.addChild(goodDecisionScene); //6
    app.stage.addChild(badDecisionScene); //7

    //creat char sprite, add to every scene
    char = new Sprite(resources["/images/char.png"].texture);
    app.stage.addChild(char)

    

     //text stuff
     let style = new TextStyle({
        fontFamily: "Futura",
        fontSize: 45,
        fill: "white"
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

    
    
    //add shapes to badDecisionScene
    badDecisionScene.addChild(rectangle)

      

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
        down = keyboard(83)
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
        
            char.vx = -20;
            char.vy = 0;
        
        
    };
    
    //Left arrow key `release` method
    left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the char isn't moving vertically:
    //Stop the char
    if (!right.isDown && char.vy === 0) {
      char.vx = 0;
    }
  };

  //up
  up.press = () => {
      char.vy = -5;
      char.vx = 0;
  }
  up.release = () => {
      if(!down.isDown && char.vx ===0 ){
          char.vy = 0;
      }
  };

  //Right 
  right.press = () => {
      
        char.vx = 5; 
        char.vy = 0;
      
      
  };
  right.release = () => {
      if (!left.isDown && char.vy === 0){
          char.vx = 0;
      }
  };

  //Down
  down.press = () => {
    char.vy = 5;
    char.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && char.vx === 0) {
      char.vy = 0;
    }
  };

    //set state
    state = play;

    //start game loop
    app.ticker.add(delta => gameLoop(delta));

   
}

function gameLoop(delta) {
        
    //update game state
    state(delta)
}

 function play(delta){

    let charHitWall = contain(char, {x: 0, y:0, width: app.width, height: app.height})

    //hit collision
    b.hit(rectangle, char, true)

    if (charHitWall === "left") {

        //set current scene to invis
        sceneArr[sceneIndex].visible = false;
        sceneIndex+=5;

       
        //set new scene to visible
        sceneArr[sceneIndex].visible = true

        //reset char position
        char.x = 1335;
        char.y = 640;

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

    
    

    //x = 1335
    //y= 640

    //x=-40
    //y=640
    char.x += char.vx;
    char.y += char.vy;
    //console.log(char.x)
    //console.log(char.y)

    
}



