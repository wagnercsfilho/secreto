import React from "react"
import Container from '../../redux/Container'
import actions from "../../redux/actions"
import template from './Compose.jsx'

var s3Uploader = (function() {
    function upload(imageURI, fileName) {
        return new Promise(function(resolve, reject) {
            var ft = new FileTransfer();
            var options = new FileUploadOptions();

            options.fileKey = "file";
            options.fileName = fileName;
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;

            socket.emit('sign', fileName, function(data) {
                options.params = {
                    "key": fileName,
                    "AWSAccessKeyId": data.awsKey,
                    "acl": "public-read",
                    "policy": data.policy,
                    "signature": data.signature,
                    "Content-Type": "image/jpeg"
                };

                ft.upload(imageURI, "https://" + data.bucket + ".s3.amazonaws.com/",
                    function(e) {
                      console.log("https://" + data.bucket + ".s3.amazonaws.com/" + fileName)
                        resolve("https://" + data.bucket + ".s3.amazonaws.com/" + fileName);
                    },
                    function(e) {
                        alert("Upload failed");
                        reject(e);
                    }, options);
            });
        });
    }

    return {
        upload: upload
    }

}());

class Compose extends Container {

    render() {
        return template.call(this)
    }

    constructor() {
        super();
        this.post = {
            imageBackground: '',
            quotebg: 'bg-white',
            text: null,
            _user: window.currentUser._id
        };
        this.lastImages = null;
        this.state = {
            textCompose: ""
        }
        this.textures = ['txt-concrete', 'txt-lodyas', 'txt-ignasi', 'txt-restaurant', 'txt-school', 'txt-weather'];
        this.textureIndex = 0;
    }

    componentDidMount() {
        super.componentDidMount();
        let textCompose = this.refs.textCompose;
        $(textCompose).elastic();
    }

    bindTextCompose(e) {
        this.setState({
            textCompose: e.target.value
        });
    }

    takePicCamera() {
        getCameraPicture(Camera.PictureSourceType.CAMERA)
            .then((imageURI) => {
                this.refs.postTexture.style.backgroundImage = 'url(' + imageURI + ')';
                this.upload = imageURI;
            }).catch((err) => {
                alert('Failed because: ' + err);
            });
    }

    takePicGallery() {
        getCameraPicture(Camera.PictureSourceType.PHOTOLIBRARY)
            .then((imageURI) => {
                this.refs.postTexture.style.backgroundImage = 'url(' + imageURI + ')';
                this.upload = imageURI;
            }).catch((err) => {
                alert('Failed because: ' + err);
            });
    }

    savePost(e) {
        this.post.text = this.state.textCompose;
        this.post.imageBackground = this.state.imageBackground;

        if (this.upload) {
            var fileName = "" + (new Date()).getTime() + ".jpg"; // consider a more reliable way to generate unique ids
            s3Uploader.upload(this.upload, fileName)
                .then((fileUri) => {
                    this.post.imageBackground = fileUri;

                    this.dispatch(actions.createPost(this.post, () => {
                        let notification = new phonepack.Notification();
                        notification.success('Seu segredo foi criado com sucesso!');
                        this.closeCurrentPage('mainNav');
                    }));

                })
                .catch((e) => {
                    console.log(e)
                    alert("Upload failed");
                });
        }
        else {
            this.dispatch(actions.createPost(this.post, () => {
                let notification = new phonepack.Notification();
                notification.success('Seu segredo foi criado com sucesso!');
                this.closeCurrentPage('mainNav');
            }));
        }

    }

    changePostTexture(e) {
        if (this.textureIndex === this.textures.length - 1) this.textureIndex = -1;
        this.textureIndex++;

        let $postTexture = $(this.refs.postTexture);

        $postTexture.removeClass();
        $postTexture.addClass(this.textures[this.textureIndex]);

        this.post.quotebg = this.textures[this.textureIndex];
    }

    selectImage(image, listImage) {
        this.lastImages = listImage;
        this.setState({
            imageBackground: image.MediaUrl
        });
        this.refs.postTexture.style.backgroundImage = 'url(' + image.MediaUrl + ')';
    }

    findImage() {
        this.pushPage('mainNav', 'FindImage', {
            selectImage: this.selectImage.bind(this),
            lastImages: this.lastImages
        });
    }

}

export default Compose;

function getCameraPicture(sourceType) {
    return new Promise((resolve, reject) => {
        navigator.camera.getPicture((imageURI) => {
            resolve(imageURI);
        }, (message) => {
            reject(message);
        }, {
            quality: 50,
            targetWidth: 500,
            targetHeight: 500,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true,
            sourceType: sourceType,
            destinationType: Camera.DestinationType.FILE_URI
        });
    });

}
