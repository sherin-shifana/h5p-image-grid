H5P.ImageGrid = (function($,UI){


function ImageGrid(params,id){
  //constructor

  var self = this;
  var bgImagePath = H5P.getPath(params.image.path, id);
  var imageOrientation,screenOrientation;
  var gameMode =[];
  var imageFragments = [];
  var MIN_IMAGE_WIDTH=600;
  var MIN_IMAGE_HEIGHT=300;
  var gameLevel = parseInt(params.levels);

  var getImageOrientation = function(){

        if(params.image.width >= params.image.height ){
          return 'landscape';
        }
        else{
          return 'portrait';
        }
  }

  var getScreenOrientation = function(){
        if (window.matchMedia("(orientation: portrait)").matches) {
           return 'portrait';
         }

        if (window.matchMedia("(orientation: landscape)").matches) {
           return 'landscape';
        }

  }

  imageOrientation = getImageOrientation();
  screenOrientation = getScreenOrientation();
  gameMode=[imageOrientation,screenOrientation];

  var setContainerOrientation = function($container){

    if(imageOrientation == 'landscape'){
          $container.find('div').addClass('container-landscape');
          if(MIN_IMAGE_WIDTH >= params.image.width){
              $container.find('img').width(MIN_IMAGE_WIDTH+'px');
          }
    }
    else{
          $container.find('div').addClass('container-portrait');
          if(params.image.height < MIN_IMAGE_HEIGHT){
              $container.find('img').height(MIN_IMAGE_HEIGHT+'px');
          }
    }

  }

  var getFragmentsToUse = function(width,height){

        for(var i=0;i<gameLevel;i++){
          for(var j=0;j<gameLevel;j++){

             var fragment = new ImageGrid.Fragment(params.image,id,i,j,gameLevel,width,height);
             imageFragments.push(fragment);
          }
        }

        H5P.shuffleArray(imageFragments);

  }

  var createGridOverImage = function($container,width,height){

        var fragmentWidth = Math.floor(width/gameLevel);
        var fragmentHeight = Math.floor(height/gameLevel);
        var $canvasContainer = $('<canvas class="grid-canvas" width="'+width+'" height="'+height+'">');
        $canvasContainer.css('background-image','url("'+bgImagePath+'")');
        $container.html($canvasContainer);
        var context = $canvasContainer[0].getContext("2d");
        context.strokeStyle = "#cccccc";
        context.lineWidth = 2;

        for(var i=0;i<gameLevel;i++){

          for(var j=0; j<gameLevel;j++){

            context.rect(j*fragmentWidth,i*fragmentHeight,fragmentWidth,fragmentHeight);
            context.stroke();

          }
        }

  }

  var createFragmentHolders = function(level,fragmentWidth,fragmentHeight){
          var holderContainer = [];
          var droppableContainer = [];
          for(var i=0;i<level;i++){
            for(var j=0;j<level;j++){
              var $holder = $('<div />');
              $holder.css('height',(fragmentHeight)+'px');
              $holder.css('width',(fragmentWidth)+'px');
              $holder.css('top',(i*fragmentHeight+(i*2))+'px');
              $holder.css('left',(j*fragmentWidth+(j*2))+'px');
              //it is fragment container
              if((i==0 || i== level-1) ||(j==0 || j== level-1)) {
                $holder.addClass('holder-container');
                holderContainer.push($holder);
              }
              // it is a droppable container
              else{
                $holder.addClass('droppable-container');
                var droppableId = (i-1)*(level-2)+ (j-1)
                $holder.data('id',droppableId);
                droppableContainer.push($holder);
              }


            }
          }
          if(((level-1)*4) < gameLevel*gameLevel){
            var rqdSecondaryHolders = (gameLevel*gameLevel) - ((level-1)*4);
            var secondLevelHolders = createExtraHolders(level-1,fragmentWidth,fragmentHeight);
            H5P.shuffleArray(secondLevelHolders);
            holderContainer = holderContainer.concat(secondLevelHolders.slice(0,rqdSecondaryHolders));
          }

          return [holderContainer,droppableContainer];
  }

  var createExtraHolders = function(level,fragmentWidth,fragmentHeight){

        var holderContainer = [];

        for(var i=0;i<level;i++){
          for(var j=0;j<level;j++){
            var $fragmentContainer= $('<div class="secondary-holder-container"/>');
            $fragmentContainer.css('height',(fragmentHeight)+'px');
            $fragmentContainer.css('width',(fragmentWidth)+'px');
            if(i==0 || i== level-1)  {
              $fragmentContainer.css('top',(i*fragmentHeight+(i*2)+((i/(level-1))*fragmentHeight))+'px');
              $fragmentContainer.css('left',(j*fragmentWidth+(j*2)+(fragmentWidth/2))+'px');
            }
            else if(j==0 || j== level-1){
              $fragmentContainer.css('top',(i*fragmentHeight+(i*2)+(fragmentHeight/2))+'px');
              $fragmentContainer.css('left',(j*fragmentWidth+(j*2)+((j/(level-1))*fragmentWidth))+'px');
            }
            holderContainer.push($fragmentContainer);
          }
        }
        return holderContainer;
  }

  var createGameBoard = function($container,width,height){

        $container.empty();


        var $timerDiv = $('<div class="timer-div"> </div>');


        //timer function
        StartTimer =function(){
            console.log("StartTimer");
            self.$status =  $('<dl class="sequencing-status">' + '<dt>'  + '</dt>' + '<dd class="h5p-time-spent" id="time-spent">0:00</dd>' +
            '<dt>' + '</dt>' + '</dl>');
            self.$status.addClass('timer');

            self.$status.appendTo($timerDiv);
            self.timer = new ImageGrid.Timer(self.$status.find('.h5p-time-spent')[0]); //Initialize timer
              //after clicking play
            self.timer.play();
          }
        $container.append($timerDiv);
        StartTimer();

        var $shuffleFragments = $('<div role="button" class="shuffle-remaining">Shuffle Fragments</div>').appendTo($timerDiv);
        var $previewImgButton = $('<div role="button" class="preview-image">Preview Image</div>').appendTo($timerDiv);


        $playAreaContainer = $('<div class="play-area-container" />').appendTo($container);

        var fragmentWidth = Math.floor(width/gameLevel);
        var fragmentHeight = Math.floor(height/gameLevel);

        // hard coded 20...need to remove
        $container.css('height',((gameLevel+2)*fragmentHeight+20)+'px');

        getFragmentsToUse(fragmentWidth,fragmentHeight);

        if(gameMode[1]=== 'landscape'){
          // place the images around the container;

          var margin = ($container.width()- fragmentWidth*(gameLevel+2))/2;
          $playAreaContainer.css('margin-left', margin+'px');

          var holders=[];
          var firstLevelHolders=[];
          var secondLevelHolders=[];
          // increment the level by 2 for placing the fragments around the grid
          var level = gameLevel+2;
          holders = createFragmentHolders(level,fragmentWidth,fragmentHeight);
          var fragmentHolders= holders[0];
          var finalHolders= holders[0].splice(0, gameLevel*gameLevel );
          for(var i=0;i<gameLevel;i++){
            for(var j=0;j<gameLevel;j++){
              var $fragmentContainer= finalHolders[(i*gameLevel+j)];
              var $droppableContainer = holders[1][(i*gameLevel+j)];
              imageFragments[(i*gameLevel+j)].appendTo($fragmentContainer);





              $fragmentContainer.appendTo($playAreaContainer);
              $droppableContainer.appendTo($playAreaContainer);


              self.count = 0; //Initialize counter
              $fragmentContainer.draggable({

                start : function( event, ui ) {



                  $(this).addClass('scale-fragments');
                  $('.droppable-container').addClass('scale-grid');

                },
                revert: function(){
                  if($(this).hasClass('drag-revert')){
                    $(this).removeClass('drag-revert');
                    return true;
                  }
                },
                stop : function() {
                  if($(this).hasClass('scale-fragments')){
                    $(this).removeClass('scale-fragments');
                    $('.droppable-container').removeClass('scale-grid');

                  }



                }

              });

              $droppableContainer.droppable({

                drop: function(event,ui){

                  var droppableId = $(this).data('id');
                  var draggableId = ui.draggable.find('.li-class').data('id');
                  if(droppableId != draggableId){
                    return ui.draggable.addClass('drag-revert');
                  }
                  ui.draggable.position({
                    my: "center",
                    at: "center",
                    of: $(this)
                  });

                  self.count++;
                  console.log(self.count);
                  if(self.count===(gameLevel*gameLevel)){
                    gameCompleted($container);
                    // self.timer.stop();
                  }
                },

              });


            }
          }

          var previewCount = 0;
          $(".preview-image").click(function(){
                console.log("working");
                previewCount++;
                console.log(previewCount);
                if((previewCount%2)!=0){
                  var $canvasContainer = $('<canvas class="grid-canvas preview-solution" width="'+width+'" height="'+height+'">');
                  $canvasContainer.css('background-image','url("'+bgImagePath+'")')
                                  .css('margin-left',Math.ceil(fragmentWidth))
                                  .css('margin-top',Math.ceil(fragmentHeight));
                  $canvasContainer.appendTo($playAreaContainer);
                  this.innerHTML = "Hide Solution";
                  $previewImgButton.removeClass('preview-image');
                  $previewImgButton.addClass('hide-image');
                }
                else {
                  console.log("working1");

                        $('.preview-solution').hide();
                        this.innerHTML = "Preview Solution";
                        $previewImgButton.removeClass('hide-image');
                        $previewImgButton.addClass('preview-image');
                }
          });

          $(".shuffle-remaining").click(function(){
            $fragmentContainer.sort(function() {
              return Math.random();
            });
            console.log("shuffle array");
          });




    }
    var gameCompleted = function($container){
          self.timer.stop();
          console.log(document.getElementById("time-spent").innerHTML);
          $playAreaContainer.empty();

          setContainerOrientation($container);

          var $canvasContainer = $('<canvas class="grid-canvas" width="'+width+'" height="'+height+'">');
          $canvasContainer.css('background-image','url("'+bgImagePath+'")');
          $playAreaContainer.html($canvasContainer);

          var $completedMessage = $('<p class="result-page-msg">Puzzle Completed!!!</p>').appendTo($container);
          var $timeSpent = $('<p class="result-page-time-spent"><span style="font-weight:bold">Time Spent : </span>' + document.getElementById("time-spent").innerHTML +'</p>').appendTo($container);

          var $retryPuzzleButtonContainer = $('<div class="retry-puzzle-button-container"></div>').appendTo($container);
          var $retry = UI.createButton({
                title: 'Button',
                'text': 'Retry',
                click: function(){
                  $container.empty();
                  self.attach($container);
                }
          }).appendTo($retryPuzzleButtonContainer);

          self.trigger('resize');
    }








  }

  console.log(gameMode);

  // all code goes here

  self.attach = function($container){

        console.log($container.width());
        var imageWidth,imageHeight;

        var $gameContainer = $('<div class="game-container"><img src="'+bgImagePath+'"/></div>').appendTo($container);
        $container.addClass('h5p-image-grid');
        setContainerOrientation($container);
        imageWidth=$container.find('img').width();
        imageHeight= $container.find('img').height();
        createGridOverImage ($gameContainer,imageWidth,imageHeight);


        if(params.chooseDifficulty==='true'){

              var $difficultyContainer = $('<div class="difficulty-container"><div class="difficulty-label"> Difficulty: </div>\
              <div  class="difficulty-selector"><select><option value="3">9 Pieces</option> \
              <option value="4">16 Pieces</option>\
              <option value="5">25 Pieces</option>\
              <option value="6">36 Pieces</option>\
              <option value="7">49 Pieces</option></select></div></div>');
              $container.append($difficultyContainer);

              $difficultyContainer.find('select').on('change', function(){
                gameLevel= parseInt(this.value);
                createGridOverImage ($gameContainer,imageWidth,imageHeight);
              });

        }


        var $fullScreenTogglerContainer= $('<div class="screen-toggler-container"></div>').appendTo($container);
        var $fullScreenToggler=$('<label class="switch">FullScreen</label><label class="switch"> <input type="checkbox">  <span class="slider round"></span>\
        </label>').appendTo($fullScreenTogglerContainer);

        var $startPuzzleButtonContainer = $('<div class="start-puzzle-button-container"></div>').appendTo($container);

        var $startPuzzleButton = UI.createButton({
              title: 'Button',
              'text': 'Start The Puzzle',
              click: function(){
                createGameBoard($container,imageWidth,imageHeight);
              },

        }).appendTo($startPuzzleButtonContainer);


        self.trigger('resize');
  }



}


return ImageGrid;
})(H5P.jQuery,H5P.JoubelUI);
