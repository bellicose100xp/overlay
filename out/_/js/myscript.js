System.registerModule("../../../_/js/myscript.js", [], function() {
  "use strict";
  var __moduleName = "../../../_/js/myscript.js";
  (function() {
    'use strict';
    var myNode = document.querySelector('#artlist .pixgrid ul');
    var centerImage = function(image) {
      var centerWidth = (window.innerWidth - image.width) / 2;
      var centerHeight = (window.innerHeight - image.height) / 2;
      image.style.top = centerHeight + 'px';
      image.style.left = centerWidth + 'px';
      return image;
    };
    var resizeImage = function(image) {
      if (image.height > window.innerHeight) {
        var ratio = window.innerHeight / image.height;
        image.height *= ratio;
        image.width *= ratio;
      }
      if (image.width > window.innerWidth) {
        var ratio$__0 = window.innerWidth / image.width;
        image.height *= ratio$__0;
        image.width *= ratio$__0;
      }
      if (image.height < window.innerHeight && image.width < window.innerWidth) {
        if (image.height > image.width) {
          var ratio$__1 = window.innerHeight / image.height;
          image.height *= ratio$__1;
          image.width *= ratio$__1;
        } else {
          var ratio$__2 = window.innerWidth / image.width;
          image.height *= ratio$__2;
          image.width *= ratio$__2;
        }
      }
    };
    myNode.addEventListener('click', function(event) {
      if (event.target.tagName === 'IMG') {
        var myOverlay = document.createElement('div');
        myOverlay.id = 'overlay';
        if (!document.querySelector('#overlay')) {
          document.body.appendChild(myOverlay);
        }
        myOverlay.style.position = 'absolute';
        myOverlay.style.top = window.pageYOffset + 'px';
        myOverlay.style.left = window.pageXOffset + 'px';
        myOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        myOverlay.style.cursor = 'pointer';
        myOverlay.style.width = window.innerWidth + 'px';
        myOverlay.style.height = window.innerHeight + 'px';
        var imageSrc = event.target.src;
        var largeImage = document.createElement('img');
        largeImage.id = 'large-image';
        largeImage.src = imageSrc.substr(0, imageSrc.length - 7) + '.jpg';
        largeImage.alt = "This is large image";
        largeImage.style.display = 'block';
        largeImage.style.position = 'absolute';
        largeImage.addEventListener('load', function() {
          resizeImage(this);
          centerImage(this);
          myOverlay.appendChild(largeImage);
        });
        largeImage.addEventListener('click', function() {
          window.removeEventListener('resize', window);
          window.removeEventListener('scroll', window);
          myOverlay.parentNode.removeChild(myOverlay);
        });
        window.addEventListener('scroll', function() {
          myOverlay.style.top = window.pageYOffset + 'px';
          myOverlay.style.left = window.pageXOffset + 'px';
        });
        window.addEventListener('resize', function() {
          myOverlay.style.height = window.innerHeight + 'px';
          myOverlay.style.width = window.innerWidth + 'px';
          resizeImage(largeImage);
          centerImage(largeImage);
        });
      }
    });
  }());
  return {};
});
System.get("../../../_/js/myscript.js" + '');
//# sourceMappingURL=myscript.js.map
