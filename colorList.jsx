(function(){
    var mmRatio = 0.352778;
    var point = 2.83465;
    var size = 1000 * mmRatio;
    var cl = 16

    var artBoard = documents.add(DocumentColorSpace.CMYK,size,200);
    app.activeDocument.rulerOrigin = [0,app.activeDocument.height];//座標の原点をアートボードの左上に設定
    
    var rect = app.activeDocument.artboards[0].artboardRect;
    $.writeln(rect[0]);
    var Square = function(colorObj){
        this.margin = 5*mmRatio;
        this.top = rect[1] - this.margin;
        this.left = rect[0] + this.margin;
        this.point = activeDocument.pathItems.rectangle(this.top,this.left,50*mmRatio,50*mmRatio);
        this.point.stroked = false;
        this.point.fillColor = setCMYKColor(colorObj);
        function setCMYKColor(colorObj){
            var CMYK = new CMYKColor();
            CMYK.cyan = more100(colorObj.c);
            CMYK.magenta = more100(colorObj.m);
            CMYK.yellow = more100(colorObj.y);
            CMYK.black = colorObj.k;
            return CMYK;
        }

        function more100(v){
            if(v > 100){
                return 100;
            }else{
                return v;
            }
        }
    }

    Square.prototype.moveX = function(toRight){
        this.point.left += toRight;
    }
    Square.prototype.moveY = function(toBottom){
        this.point.top += toBottom;
    }
    dimention();
    function dimention(){
        for(var z =0;z<cl*2;z++){
            arrayColors(z*10);
        }
    }    


    function arrayColors(z){
        var layer = activeDocument.layers.add();
        layer.name = z;
        for(var y=0;y<cl;y++){
            for(var x=0;x<cl;x++){
                var sq = new Square({c:z-x*(z/cl),m:y*(z/cl),y:0+x*(z/cl),k:0});
                sq.moveX((sq.point.width+sq.margin)*x + z);
                sq.moveY((sq.point.height+sq.margin)*-y + z);
            }
        }   
    }

})();