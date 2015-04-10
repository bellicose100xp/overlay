(function () {
    'use strict';

    let myNode = document.querySelector('#artlist .pixgrid ul');

    var centerImage = function (image) {
        let centerWidth = (window.innerWidth - image.width) / 2;
        let centerHeight = (window.innerHeight - image.height) / 2;
        image.style.top = centerHeight + 'px';
        image.style.left = centerWidth + 'px';

        return image;
    };

    var resizeImage = function (image) {

        if (image.height > window.innerHeight) {
            let ratio = window.innerHeight / image.height;
            image.height *= ratio;
            image.width *= ratio;
        }

        if (image.width > window.innerWidth) {
            let ratio = window.innerWidth / image.width;
            image.height *= ratio;
            image.width *= ratio;
        }


        if (image.height < window.innerHeight && image.width < window.innerWidth) {
            if (image.height > image.width) {
                let ratio = window.innerHeight / image.height;
                image.height *= ratio;
                image.width *= ratio;
            }
            else {
                let ratio = window.innerWidth / image.width;
                image.height *= ratio;
                image.width *= ratio;
            }


        }

    };

    myNode.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {

            let myOverlay = document.createElement('div');
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

            let imageSrc = event.target.src;
            let largeImage = document.createElement('img');
            largeImage.id = 'large-image';
            largeImage.src = imageSrc.substr(0, imageSrc.length - 7) + '.jpg';
            largeImage.alt = "This is large image";
            largeImage.style.display = 'block';
            // ??
            largeImage.style.position = 'absolute';

            largeImage.addEventListener('load', function () {
                resizeImage(this);
                centerImage(this);
                myOverlay.appendChild(largeImage);
            });

            largeImage.addEventListener('click', function () {
                window.removeEventListener('resize', window);
                window.removeEventListener('scroll', window);
                myOverlay.parentNode.removeChild(myOverlay);
            });

            window.addEventListener('scroll', function () {
                myOverlay.style.top = window.pageYOffset + 'px';
                myOverlay.style.left = window.pageXOffset + 'px';
            });

            window.addEventListener('resize', function () {
                myOverlay.style.height = window.innerHeight + 'px';
                myOverlay.style.width = window.innerWidth + 'px';
                resizeImage(largeImage);
                centerImage(largeImage);
            })
        }
    });


}());