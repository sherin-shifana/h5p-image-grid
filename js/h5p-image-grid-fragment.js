<<<<<<< HEAD
function(ImageGrid,EventDispatcher,$){

    ImageGrid.Fragment=function(image,id,heightOfOnePiece,widthOfOnePiece,changeInHeight,changeInWidth){
      var self = this;
      var path = H5P.getPath(image.path, id);

      self.appendTo = function($container){
          $fragment = $('<li class = "li-class">' + '<div>' + '<img src="' + path + '" height="' + heightOfOnePiece + '" width="' + widthOfOnePiece + '"  />')
      };

    };

}(H5P.ImageGrid, H5P.EventDispatcher, H5P.jQuery);
=======
(function(ImageGrid,$){

        ImageGrid.Fragment= function(width,height,row,col){

                this.width = width;
                this.height = height;
                this.row = row;
                this.col = col;
                console.log(row+"_"+col);
        }

        ImageGrid.Fragment.prototype.constructor = ImageGrid.Fragment;

        return ImageGrid.Fragment;
})(H5P.ImageGrid,H5P.jQuery);
>>>>>>> 388710a6d20fc1296225498637ce5cdce7647367
