import React from "react"
import {
    Content, Header, SubHeader,
    HeaderButton, HeaderTitle,
    View, Button, Icon, Input
} from '../../phonepack'

export default function FindImage() {
    return (
        
            <View loading={this.state.loading} className="find-image">
                <Header>
                    <HeaderButton>
                        <Button icon ripple onClick={this.closeCurrentPage.bind(this, 'mainNav')}>
                            <Icon name="arrow-left" />
                        </Button>
                    </HeaderButton>
                    <HeaderTitle>Pesquisar imagens</HeaderTitle>
                </Header>
                <SubHeader className="bg-white sub-header header--shadow">
                    <form onSubmit={this.find.bind(this)} className="form-search">
                        <Input className="input-search" 
                            onChange={this.handleSearch.bind(this)} 
                            type="search" 
                            placeholder="Escreva aqui sua busca"/>
                    </form>
                </SubHeader>
                <Content hasHeader hasSubHeader>
                    {
                        this.state.images.map((image, index) => {
                            return (
                            <div 
                                key={index} 
                                onClick={this.selectImage.bind(this, image)} 
                                style={ { backgroundImage: 'url("'+image.Thumbnail.MediaUrl+'")' }  }
                                className="gallery"> 
                            </div>
                            )
                        })
                    }
                </Content>
            </View>
        
        )
}