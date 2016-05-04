import React from "react"
import Container from '../../redux/Container'
import actions from "../../redux/actions"
import classnames from 'classnames'

class Compose extends Container {

    constructor() {
        super();
        this.post = {
            quotebg: 'white',
            text: null,
            _user: window.currentUser._id
        };

        this.state = { textCompose: "" }

        this.textures = ['white', 'blue', 'red', 'gray', 'green', 'black', 'pink', 'purple', 'orange', 'teal'];
        this.textureIndex = 0;
    }

    componentDidMount() {
        super.componentDidMount();
        let textCompose = this.refs.textCompose;
        $(textCompose).elastic().focus();
    }

    bindTextCompose(e) {
        this.setState({
            textCompose: e.target.value
        })
    }

    takePic() {
        navigator.camera.getPicture((imageURI) => {
            console.log(imageURI);
            this.refs.postTexture.style.backgroundColor = '#000';
            this.refs.postTexture.style.backgroundImage = 'url('+imageURI+')';
        }, (message) => {
            alert('Failed because: ' + message);
        }, {
            quality: 50,
            targetWidth: 500,
            targetHeight: 500,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true,
            destinationType: Camera.DestinationType.FILE_URI
        });
    }

    takePicGallery() {
      navigator.camera.getPicture((imageURI) => {
          console.log(imageURI);
          this.refs.postTexture.style.backgroundColor = '#000';
          this.refs.postTexture.style.backgroundImage = 'url('+imageURI+')';
      }, (message) => {
          alert('Failed because: ' + message);
      }, {
          quality: 50,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: Camera.DestinationType.FILE_URI
      });
    }

    savePost(e) {
        this.post.text = this.state.textCompose;

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

    render() {

        let cls = classnames({
            button : true,
            'button--icon': true,
            ripple: true,
            hide: !(this.state.textCompose != '')
        })

        return (
            <div className="pages">
                <header className="header header--shadow">
                    <div className="header__buttons">
                        <button className="button button--icon ripple" onClick={this.closeCurrentPage.bind(this, 'mainNav')}>
                            <i className="icon mdi mdi-arrow-left"></i>
                        </button>
                    </div>
                    <div className="header__title">Compartilhar</div>
                    <div className="header__buttons">
                        <button className={cls} onClick={this.savePost.bind(this)}>
                            <i className="icon mdi mdi-send"></i>
                        </button>
                    </div>
                </header>
                <section className="content has-header">
                    <ul className="quote-card" style={ { height: '100%' } }>
                        <li className="white" ref="postTexture" style={ { height: '100%' } }>
                            <p>
                                <textarea onChange={this.bindTextCompose.bind(this)} maxlength="140" className="compose-textarea" placeholder="Digite aqui seu segredo" ref="textCompose"></textarea>
                            </p>
                        </li>
                    </ul>
                </section>
                <footer className="footer bg-white">
                    <div className="footer__buttons">
                        <button className="button button--icon ripple text-grey" onClick={this.takePic.bind(this)}>
                            <i className="icon mdi mdi-camera"></i>
                        </button>
                        <button className="button button--icon ripple text-grey" onClick={this.takePicGallery.bind(this)}>
                            <i className="icon mdi mdi-folder-image"></i>
                        </button>
                    </div>
                    <div className="footer__buttons">
                        <button className="button button--icon ripple text-grey" onClick={this.changePostTexture.bind(this)}>
                            <i className="icon mdi mdi-palette"></i>
                        </button>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Compose;
