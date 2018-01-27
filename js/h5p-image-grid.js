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
                var imageHeight=self.params.image.height;
                var imageWidth=self.params.image.width;
                self.heightOfOnePiece=self.params.image.height / self.params.levels;
                self.widthOfOnePiece=self.params.image.width / self.params.levels;

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
                              var changeInHeight = i*self.heightOfOnePiece;
                              var changeInWidth = j*self.widthOfOnePiece;
                              var fragment = new ImageGrid.Fragments(self.params.image,self.id,self.heightOfOnePiece,self.widthOfOnePiece,changeInHeight,changeInWidth);
                              fragmentsToUse.push(fragment);
                          }
                   }

                    console.log(fragmentsToUse.length);

                }


                getFragments();
                //
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

                shuffledFragments=self.shuffleArray(fragmentsToUse);


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
                          $container.empty();

                          ul=$('<ul class="ul-class">');

                          for(var k=0; k<levelsNum ; k++)
                          {
                                var $newDiv=$('<div class="grid-image-div"></div>');
                                for(var l=0; l<levelsNum; l++)
                                {

                                    shuffledFragments[k*levelsNum+l].appendTo($newDiv);

                                }
                                $newDiv.appendTo($(ul));
                          }
                          $container.append(ul);
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
                          $container.empty();
                          ul=$('<ul class="ul-class">');

                          for(var k=0; k<levelsNum ; k++)
                          {
                                var $newDiv=$('<div class="grid-image-div"></div>');
                                for(var l=0; l<levelsNum; l++)
                                {

                                    shuffledFragments[k*levelsNum+l].appendTo($newDiv);

                                }
                                $newDiv.appendTo($(ul));
                          }
                          $container.append(ul);
                                                },
                      }).appendTo($container);



              }

              H5P.trigger("resize");
        }


        return ImageGrid;
})(H5P.jQuery,H5P.JoubelUI);
