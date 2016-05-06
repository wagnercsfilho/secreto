import React from "react"
import Container from '../../redux/Container'
import actions from "../../redux/actions"
import template from './Compose.jsx'

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
            }).catch((err)=>{
                alert('Failed because: ' + err);
            });
    }

    takePicGallery() {
        getCameraPicture(Camera.PictureSourceType.PHOTOLIBRARY)
            .then((imageURI) => {
                this.refs.postTexture.style.backgroundImage = 'url(' + imageURI + ')';
            }).catch((err)=>{
                alert('Failed because: ' + err);
            });
    }

    savePost(e) {
        this.post.text = this.state.textCompose;
        this.post.imageBackground = this.state.imageBackground;

        this.dispatch(actions.createPost(this.post, () => {
            let notification = new phonepack.Notification();
            notification.success('Seu segredo foi criado com sucesso!');
            this.closeCurrentPage('mainNav');
        }));
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
        this.setState({ imageBackground: image.MediaUrl });
        this.refs.postTexture.style.backgroundImage = 'url(' + image.MediaUrl + ')';
    }

    findImage() {
        this.pushPage('mainNav', 'FindImage', { selectImage: this.selectImage.bind(this), lastImages: this.lastImages });
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