import React from "react"
import { Content, Footer, Row, Cell, Header, HeaderButton, HeaderTitle, View, Button, Icon  } from '../../phonepack'

export default function Compose() {
    return (
            <View>
                <Header shadow>
                    <HeaderButton>
                        <Button icon ripple onClick={this.closeCurrentPage.bind(this, 'mainNav')}>
                            <Icon name="arrow-left" />
                        </Button>
                    </HeaderButton>
                    <HeaderTitle>Compartilhar</HeaderTitle>
                    <HeaderButton>
                        <Button icon ripple className={ { hide: this.state.textCompose == '' } } onClick={this.savePost.bind(this)}>
                            <Icon name="send" />
                        </Button>
                    </HeaderButton>
                </Header>
                <Content hasHeader>
                    <ul className="quote-card" style={ { height: '100%' } }>
                        <li className="txt-lodyas" 
                            ref="postTexture" 
                            style={ { height: '100%' } }>
                            <p>
                                <textarea 
                                    autoFocus 
                                    onChange={this.bindTextCompose.bind(this)} 
                                    maxlength="140" 
                                    className="compose-textarea" 
                                    placeholder="Digite aqui seu segredo" 
                                    ref="textCompose"></textarea>
                            </p>
                        </li>
                    </ul>
                </Content>
                <Footer className="bg-white">
                    <Row style={ { textAlign: 'center'} }>
                        <Cell>
                            <Button icon ripple className="text-grey" onClick={this.takePicCamera.bind(this)}>
                                <Icon name="camera" />
                            </Button>
                        </Cell>
                        <Cell>
                            <Button icon ripple className="text-grey" onClick={this.takePicGallery.bind(this)}>
                                <Icon name="folder-image" />
                            </Button>
                        </Cell>
                        <Cell>
                            <Button icon ripple className="text-grey" onClick={this.findImage.bind(this)}>
                                <Icon name="magnify" />
                            </Button>
                        </Cell>
                        <Cell>
                            <Button icon ripple className="text-grey" onClick={this.changePostTexture.bind(this)}>
                                <Icon name="palette" />
                            </Button>
                        </Cell>
                    </Row>
                </Footer>
            </View>
        )
}