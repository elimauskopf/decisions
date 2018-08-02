

loader.add([
    "/images/char.png"
])
.on("progress", loadProgressHandler)
.load(setup)

function loadProgressHandler(loader, resource) {
    
    //display file 'url' currently being loaded 
    console.log("loading: " + resource.url);

    //display the percentage of files currently loaded
    console.log("progress: " + loader.progress + "%")
}

let char;

function setup(){
    console.log("All files loaded")

    //crete char sprite
    char = new Sprite(resources["/images/char.png"].texture);

    //set size of image
    char.width = 80;
    char.height = 120;

    char.x = 200;
    char.y = 100;

    //set initial velocity
    char.vx = 0;
    char.vy = 0;
    //set anchor point
    char.anchor.x = 0.5
    char.anchor.y = 0.5;

   

    //add sprite to stage
    app.stage.addChild(char)

    //capture keyboard keys
    let up = keyboard(87),
        left = keyboard(65),
        right = keyboard(68),
        down = keyboard(83)

    //left key pressed
    left.press = () => {
        //change velocity 
        
            char.vx = -5;
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


    char.x += char.vx;
    char.y += char.vy;
}


