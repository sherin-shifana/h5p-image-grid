(function(ImageGrid,$,EventDispatcher){



    ImageGrid.Fragment = function(image,id,row,col,level,fWidth,fHeight){

      var self = this;
      EventDispatcher.call(self);
      var imagePath = H5P.getPath(image.path,id);
      self.fragmentId = row*level+col;
      var bWidth = Math.floor(image.width/level);
      var bHeight = Math.floor(image.height/level);
      var backgroundXPosition=col*bWidth;
      var backgroundYPosition=row*bHeight;

      console.log(backgroundXPosition);
      console.log(backgroundYPosition);


      self.appendTo = function($container){
          self.$fragment = $('<div class="li-class" data-id = "'+ self.fragmentId +'"></div>')
                      .css('background-image','url(' + imagePath + ')')
                      .css('background-position',(-backgroundXPosition)+'px '+ (-backgroundYPosition)+'px ')
                      .css('height',bHeight+'px')
                      .css('width',bWidth+'px');
            self.$fragment.css('transform','scale('+fWidth/bWidth+','+fHeight/bHeight+')');
            self.$fragment.css('transform-origin','0px 0px');





          self.$fragment.appendTo($container);
      };
    }




    ImageGrid.Fragment.prototype = Object.create(EventDispatcher.prototype);
    ImageGrid.Fragment.prototype.constructor = ImageGrid.Fragment;

    // ImageGrid.Fragment.isValid = function(params) {
    //     return (params !== undefined && params.image !== undefined && params.image.path !== undefined);
    // };

    return ImageGrid.Fragment;
})(H5P.ImageGrid,H5P.jQuery,H5P.EventDispatcher);
