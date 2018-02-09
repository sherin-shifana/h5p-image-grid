(function(ImageGrid,$){

    var path;
    var heightOfOnePiece;
    var widthOfOnePiece;
    var changeInWidth;
    var changeInHeight;

    ImageGrid.Fragments = function(image,id,heightOfOnePiece,widthOfOnePiece,changeInHeight,changeInWidth,fragmentId){

      var self = this;
      path = H5P.getPath(image.path, id);
      heightOfOnePiece = heightOfOnePiece;
      widthOfOnePiece = widthOfOnePiece;
      changeInWidth = changeInWidth;
      changeInHeight = changeInHeight;
      fragmentId = fragmentId;


      self.appendTo = function($container){
          $fragment = $('<li class="li-class" data-id = "'+ fragmentId +'"></li>')
                      .css('background-image','url(' + path + ')')
                      .css('background-position-x',-changeInWidth+'px')
                      .css('background-position-y',-changeInHeight+'px')
                      .css('height',heightOfOnePiece+'px')
                      .css('width',widthOfOnePiece+'px').appendTo($container);
      };
    }




    // ImageGrid.fragments.prototype = Object.create(EventDispatcher.prototype);
    ImageGrid.Fragments.prototype.constructor = ImageGrid.Fragments;

    // ImageGrid.fragments.isValid = function(params) {
    //     return (params !== undefined && params.image !== undefined && params.image.path !== undefined);
    // };

    return ImageGrid.Fragments;
})(H5P.ImageGrid,H5P.jQuery);
