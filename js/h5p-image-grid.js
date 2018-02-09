H5P.ImageGrid = (function($,UI){

        //declaration
        var self = this;
        var levelsNum;
        var fragmentsToUse = [];

        //constructor
        function ImageGrid(params,id){

                self.params = params;
                self.id = id;
                levelsNum = self.params.levels;
                self.imageHeight=self.params.image.height;
                self.imageWidth=self.params.image.width;
                self.heightOfOnePiece=(self.params.image.height / self.params.levels);
                self.widthOfOnePiece=(self.params.image.width / self.params.levels);

                //get fragments to use
                var getFragments = function() {
                    console.log("working");
                    console.log(levelsNum);
                    console.log(heightOfOnePiece);
                    console.log(widthOfOnePiece);

                    for(var i=0;i<levelsNum; i++)
                    {
                          for(var j=0;j<levelsNum;j++)
                          {
                              var fragmentId = i*levelsNum + j;
                              var changeInHeight = i*self.heightOfOnePiece;
                              var changeInWidth = j*self.widthOfOnePiece;
                              var fragment = new ImageGrid.Fragments(self.params.image,self.id,self.heightOfOnePiece,self.widthOfOnePiece,changeInHeight,changeInWidth,fragmentId);
                              fragmentsToUse.push(fragment);
                          }
                   }


                    console.log(fragmentsToUse.length);

                }


                getFragments();

                //if teacher chooses difficulty, then reconstruct the grid
                redrawContainer = function($container,heightOfOnePiece,widthOfOnePiece,levelsNum){
                    console.log("redrawContainer");
                    fragmentsToUse = [];
                    $container.empty();
                    getFragments();
                    for(var k=0; k<levelsNum ; k++)
                    {
                      var newDiv=$('<div class="grid-image-div"></div>');
                      for(var l=0; l<levelsNum; l++)
                      {

                        fragmentsToUse[k*levelsNum+l].appendTo($(newDiv));

                      }
                      newDiv.appendTo($(ul));
                    }
                }




                self.shuffleArray = function(fragmentsToUse){

                      var numOfFragments = fragmentsToUse.length;
                      console.log(numOfFragments);
                      var numPicket = 0;
                      var pickedCardsMap = {};
                      var shuffledFragments = [];
                      while (numPicket < numOfFragments) {
                        var pickIndex = Math.floor(Math.random() * numOfFragments);
                        if (pickedCardsMap[pickIndex]) {
                          continue; // Already picked, try again!
                        }

                        shuffledFragments.push(fragmentsToUse[pickIndex]);
                        pickedCardsMap[pickIndex] = true;
                        numPicket++;
                      }

                      return shuffledFragments;
                };

                shuffledFragments = self.shuffleArray(fragmentsToUse);

                afterStart = function($container,shuffledFragments){

                    $container.empty();


                    $mainDiv = $('<div class="main-div">');

                    $centerDiv = $('<div class="center-div">');


                    $leftDiv = $('<div class="left-div">');
                    $rightDiv = $('<div class="right-div">');

                    for(var k=0; k<levelsNum ; k++)
                    {
                            var $newDiv=$('<div class="grid-image-div"></div>');
                            $leftInnerDiv = $('<div class="left-inner-div">');
                            $rightInnerDiv = $('<div class="right-inner-div">');

                            for(var l=0; l<levelsNum; l++)
                            {

                                var i = (k*levelsNum) + l;

                                if ((i % 2)=== 0){
                                  shuffledFragments[i].appendTo($leftInnerDiv);
                                }
                                else{
                                  shuffledFragments[i].appendTo($rightInnerDiv);
                                }

                            }

                            // $newDiv.appendTo($(ul));
                            $leftInnerDiv.appendTo($leftDiv);
                            $rightInnerDiv.appendTo($rightDiv);
                    }

                    ul=$('<ul class="new-ul">');

                    for(var k=0; k<levelsNum ; k++)
                    {
                          var newDiv=$('<div class="grid-image-div"></div>');

                          for(var l=0; l<levelsNum; l++)
                          {

                            $newList = $('<div class="new-list" data-id= "'+ (k*levelsNum+l) +'">').css('height', heightOfOnePiece + 'px').css('width', widthOfOnePiece + 'px').appendTo($(newDiv));

                          }
                          newDiv.appendTo($(ul));
                    }

                    $leftDiv.appendTo($mainDiv);
                    $centerDiv.append(ul);
                    $mainDiv.append($centerDiv);
                    $rightDiv.appendTo($mainDiv);
                    $container.append($mainDiv);

                            scaleElements = function(){

                                  $(".li-class").addClass('scale-elements-small');
                                  $(".new-list").addClass('scale-grid-small');
                                  
                            }
                            scaleGrid = function(){

                                  $(".li-class").removeClass('scale-elements-small');
                                  $(".new-list").removeClass('scale-grid-small');

                            }

                            $(".li-class").draggable({

                                    start: function( event, ui ) {
                                            scaleElements();
                                    },

                                    revert: function() {

                                        if ($(this).hasClass('drag-revert')) {
                                              $(this).removeClass('drag-revert');
                                              return true;
                                        }

                                    },
                                    stop : function() {
                                        scaleGrid();
                                    }

                            });

                            $(".new-list").droppable({

                                    accept : ".li-class",
                                    drop: function( event, ui ) {

                                            var $this = $(this);
                                            console.log($this.data("id"));
                                            console.log(ui.draggable.attr("data-id"));

                                            if(ui.draggable.attr("data-id")!= $this.data("id")){

                                                  return $(ui.draggable).addClass('drag-revert');

                                            }
                                            else{

                                                  console.log("correct position");

                                            }

                                            ui.draggable.position({
                                                my: "center",
                                                at: "center",
                                                of: $this
                                              });
                                  }
                            });

                    H5P.trigger("resize");
                }

        }

        //attach function
        ImageGrid.prototype.attach = function($container){


                        $container.addClass('h5p-image-grid');

                        //if teacher allows students to choose dificulty
                        if(self.params.chooseDifficulty==='true')
                        {
                              ul=$('<ul class="ul-class">');

                              for(var k=0; k<levelsNum ; k++)
                              {
                                    var $newDiv=$('<div class="grid-image-div"></div>');
                                    for(var l=0; l<levelsNum; l++)
                                    {

                                        fragmentsToUse[k*levelsNum+l].appendTo($newDiv);

                                    }
                                    $newDiv.appendTo($(ul));
                              }
                              $container.append(ul);

                              //choose difficulty
                              $container.append('<div>Difficulty:    <select id="mySelect"><option value="3">9 pieces</option><option value="4">16 pieces</option><option value="5">25 pieces</option><option value="6">36 pieces</option><option value="7">49 pieces</option></select></div><br />');
                              var obj=document.getElementById('mySelect');
                              $(obj).change(function(){

                                    self.heightOfOnePiece=self.params.image.height/obj.value;
                                    self.widthOfOnePiece=self.params.image.width/obj.value;
                                    levelsNum=obj.value;
                                    console.log(levelsNum);
                                    console.log(heightOfOnePiece);
                                    console.log(widthOfOnePiece);

                                    redrawContainer($(ul),self.heightOfOnePiece,self.widthOfOnePiece,levelsNum);
                                    shuffledFragments=self.shuffleArray(fragmentsToUse);

                              });

                              //start button
                              self.$start=UI.createButton({
                                  title: 'Button',
                                  'class': 'level-next-button',
                                  'text' : 'Start the Puzzle',
                                  click: function() {
                                      afterStart($container,shuffledFragments);
                                  },
                                }).appendTo($container);



                        }

                        //if students can choose difficulty
                        else {
                              ul=$('<ul class="ul-class">');

                              for(var k=0; k<levelsNum ; k++)
                              {
                                var newDiv=$('<div class="grid-image-div"></div>');
                                for(var l=0; l<levelsNum; l++)
                                {

                                    fragmentsToUse[k*levelsNum+l].appendTo($(newDiv));

                                }
                                newDiv.appendTo($(ul));
                              }
                              $container.append(ul);

                              self.$start=UI.createButton({
                                  title: 'Button',
                                  'class': 'level-next-button',
                                  'text' : 'Start the Puzzle',
                                  click: function() {
                                      afterStart($container,shuffledFragments);
                                        },
                                }).appendTo($container);



                        }

                        H5P.trigger("resize");
        }


        return ImageGrid;
})(H5P.jQuery,H5P.JoubelUI);
