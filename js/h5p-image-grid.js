
//code starts here
H5P.ImageGrid = (function($,EventDispatcher,UI){

        //variable declaration part
        var self = this;

        //constructor
        function ImageGrid(params,id){
                //constructor code goes here
                self.params = params;
                self.id = id;

                var imageLoaded = function(){
                }


// imagePieces now contains data urls of all the pieces of the image

// load one piece onto the page

}//your code goes here


                //when image loaded
                //imageLoaded();

                var redrawContainer = function($container,heightOfOnePiece,widthOfOnePiece,levelsNum){
                  console.log("working");
                  $container.empty();


                  for(var i=0; i<levelsNum ; i++)
                  {
                      var newDiv=$('<div class="grid-image-div" ></div>');
                      for(var j=0; j<levelsNum; j++)
                      {
                          var changeInHeight = i*heightOfOnePiece;
                          var changeInWidth = j*widthOfOnePiece;
                          ul.append($('<li class="li-class"><div></li>').css('background-image','url(' + H5P.getPath(self.params.image.path,self.id) + ')').css('background-position-x',-changeInWidth+'px').css('background-position-y',-changeInHeight+'px').css('height',heightOfOnePiece+'px').css('width',widthOfOnePiece+'px'));
                      }
                      newDiv.appendTo($(ul));
                  }


                }



        ImageGrid.prototype.attach = function($container){
                //attach function
                var levelsNum=self.params.levels;
                var imageHeight=self.params.image.height;
                var imageWidth=self.params.image.width;
                var heightOfOnePiece=self.params.image.height / self.params.levels;
                var widthOfOnePiece=self.params.image.width / self.params.levels;
                $container.addClass('h5p-image-grid');
                //$container.append('<img src="'+ H5P.getPath(self.params.image.path,self.id)+'"/>');
                if(self.params.chooseDifficulty==='true')
                {
                    ul=$('<ul class="ul-class">');

                    for(var i=0; i<levelsNum ; i++)
                    {
                        var newDiv=$('<div class="grid-image-div" ></div>');
                        for(var j=0; j<levelsNum; j++)
                        {
                            var changeInHeight = i*heightOfOnePiece;
                            var changeInWidth = j*widthOfOnePiece;
                            ul.append($('<li class="li-class"><div></li>').css('background-image','url(' + H5P.getPath(self.params.image.path,self.id) + ')').css('background-position-x',-changeInWidth+'px').css('background-position-y',-changeInHeight+'px').css('height',heightOfOnePiece+'px').css('width',widthOfOnePiece+'px'));
                        }
                        newDiv.appendTo($(ul));
                    }
                    $container.append(ul);

                    $container.append('<div>Difficulty:    <select id="mySelect"><option value="3">9 pieces</option><option value="4">16 pieces</option><option value="5">25 pieces</option><option value="6">36 pieces</option><option value="7">49 pieces</option></select></div><br />');
                    var obj=document.getElementById('mySelect');
                    $(obj).change(function(){
                      heightOfOnePiece=self.params.image.height/obj.value;
                      widthOfOnePiece=self.params.image.width/obj.value;
                      levelsNum=obj.value;
                      console.log(heightOfOnePiece);

                      redrawContainer($(ul),heightOfOnePiece,widthOfOnePiece,levelsNum);

                    });


                    self.$start=UI.createButton({
                        title: 'Button',
                        'class': 'level-next-button',
                        'text' : 'Start the Puzzle',
                      }).appendTo($container);
                }
                else {
                    ul=$('<ul class="ul-class">');
                    for(var i=0; i<levelsNum ; i++)
                    {
                        var newDiv=$('<div class="grid-image-div" ></div>');
                        for(var j=0; j<levelsNum; j++)
                        {
                            var changeInHeight = i*heightOfOnePiece;
                            var changeInWidth = j*widthOfOnePiece;
                            ul.append($('<li class="li-class"><div></li>').css('background-image','url(' + H5P.getPath(self.params.image.path,self.id) + ')').css('background-position-x',-changeInWidth+'px').css('background-position-y',-changeInHeight+'px').css('height',heightOfOnePiece+'px').css('width',widthOfOnePiece+'px'));
                        }
                        newDiv.appendTo($(ul));
                    }
                    $container.append(ul);

                    self.$start=UI.createButton({
                      title: 'Button',
                      'class': 'game-start-button',
                      'text' : 'Start the Puzzle',
                    }).appendTo($container);
              }

              console.log(Math.ceil(heightOfOnePiece));
              console.log(Math.ceil(widthOfOnePiece));
              console.log(levelsNum);
              H5P.trigger("resize");
        }

        return ImageGrid;

})(H5P.jQuery,H5P.EventDispatcher,H5P.JoubelUI);
