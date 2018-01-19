H5P.ImageGrid = (function($,EventDispatcher,UI){

      var self = this;

      function ImageGrid(params,id){

        self.params = params;
        self.id = id;
        var levelsNum=self.params.levels;
        var imageHeight=self.params.image.height;
        var imageWidth=self.params.image.width;
        var heightOfOnePiece=self.params.image.height / self.params.levels;
        var widthOfOnePiece=self.params.image.width / self.params.levels;


        var getFragments = function() {

            var fragmentsToUse = [];
            for(var i=0;i<levelsNum; i++)
            {
                  for(j=0;j<levelsNum;j++)
                  {
                      var changeInHeight = i*heightOfOnePiece;
                      var changeInWidth = j*widthOfOnePiece;
                      // var fragment = new ImageGrid.fragments(self.params.image,self.id,heightOfOnePiece,widthOfOnePiece,changeInHeight,changeInWidth);
                  }
            }
            // fragmentsToUse.push(fragment);


        }
      }

        // var fragmentsToUse = getFragments();

        ImageGrid.prototype.attach = function($container){
            $container.addClass('h5p-image-grid');
            ul=$('<ul class="ul-class">');

            for(var i=0; i<self.params.levels ; i++)
            {
                var newDiv=$('<div class="grid-image-div" ></div>');
                for(var j=0; j<self.params.levels; j++)
                {

                    fragmentsToUse.appendTo($(newDiv));
                }
                newDiv.appendTo($(ul));
            }
            $container.append(ul);

            self.$start=UI.createButton({
                title: 'Button',
                'class': 'level-next-button',
                'text' : 'Start the Puzzle',
              }).appendTo($container);
        };

      ImageGrid.prototype.constructor = ImageGrid;
      return ImageGrid;

})(H5P.jQuery,H5P.EventDispatcher,H5P.JoubelUI);
