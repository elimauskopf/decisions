

var type = "WebGL"
var app;
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    //Aliases
     const Application = PIXI.Application
     const loader = PIXI.loader
     const resources = PIXI.loader.resources
     const Sprite = PIXI.Sprite;
     let state = PIXI.state;

    PIXI.utils.sayHello(type)

        //Create a Pixi Application
        app = new Application({ width: 256, 
        height: 256,
        resolution: 1
        });

    //set details on app
    app.renderer.backgroundColor = 0x061639;
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        //Maybe add scale to window

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

