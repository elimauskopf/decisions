//define rectangle
let rectangle = new Graphics();
rectangle.beginFill(0x66CCFF);

//give it red outline
rectangle.lineStyle(4, 0xFF3300, 1)
rectangle.drawRect(0,0, 100, 150)
rectangle.endFill()
rectangle.x = 600;
rectangle.y = 550;