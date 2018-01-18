function(ImageGrid,EventDispatcher,$){

    ImageGrid.Fragment=function(image,id,heightOfOnePiece,widthOfOnePiece,changeInHeight,changeInWidth){
      var self = this;
      var path = H5P.getPath(image.path, id);

      self.appendTo = function($container){
          $fragment = $('<li class = "li-class">' + '<div>' + '<img src="' + path + '" height="' + heightOfOnePiece + '" width="' + widthOfOnePiece + '"  />')
      };

    };

}(H5P.ImageGrid, H5P.EventDispatcher, H5P.jQuery);
