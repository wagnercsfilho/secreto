import React from "react"
import Container from '../../redux/Container'
import {
    Content, Header, SubHeader,
    HeaderButton, HeaderTitle,
    View, Button, Icon, Input
}
from '../../phonepack'
import { Base64 } from 'js-base64'


class FindImage extends Container {

    constructor(props) {
        super();
        
        console.log(props)

        this.state = {
            images: props.lastImages || [],
            loading: false
        }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    find(e) {
        e.preventDefault();

        $(':focus').blur();
        
        this.setState({
            loading: true
        });
        
        getWebImages(this.search).then(images => {
            this.setState({
                images: images,
                loading: false
            });
        }).catch(err => {
            alert(err)
            this.setState({
                loading: false
            });
        })
    }

    selectImage(image) {
        this.props.selectImage(image, this.state.images);
        this.closeCurrentPage('mainNav');
    }
    
    handleSearch(e) {
        this.search = e.target.value;
    }

    render() {
        console.log(this.state)
        return (
            <View loading={this.state.loading}>
                <Header>
                    <HeaderButton>
                        <Button icon ripple onClick={this.closeCurrentPage.bind(this, 'mainNav')}>
                            <Icon name="arrow-left" />
                        </Button>
                    </HeaderButton>
                    <HeaderTitle>Pesquisar imagens</HeaderTitle>
                </Header>
                <SubHeader className="bg-white sub-header header--shadow">
                    <form onSubmit={this.find.bind(this)} style={ { width: '100%', display: 'inline-flex' }}>
                        <Input onChange={this.handleSearch.bind(this)} style={{
                            margin: '5px 10px 0 10px', 
                            padding: '0px 10px 0 10px', 
                            background: '#f2f2f2', 
                            borderRadius: '5px' }} 
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
                                style={{
                                    width: '33.33%', 
                                    backgroundSize: 'cover', 
                                    backgroundPosition: 'center center', 
                                    backgroundImage: 'url("'+image.Thumbnail.MediaUrl+'")', 
                                    paddingTop: '15%', 
                                    paddingBottom: '15%', 
                                    overflow: 'hidden', 
                                    float: 'left'}}> 
                            </div>
                            )
                        })
                    }
                </Content>
            </View>
        )
    }
}

export default FindImage;

function getWebImages(query) {
    return new Promise((resolve, reject) => {
        var bingApiUrl = 'https://api.datamarket.azure.com/Data.ashx/Bing/Search/Image?Query=%27' + query + '%27&$top=50&$format=json';
        var bingApiAppId = "AFupOk7j13u1TSQLlqC1tpzesk6EEj4r7nJuBw/jpNI";
        var accountKeyEncoded = Base64.encode(":" + bingApiAppId);

        //Make the API call.        
        $.ajax({
            url: bingApiUrl,
            context: this,
            headers: {
                'Authorization': 'Basic ' + accountKeyEncoded
            },
            success: OnResultsReceived,
            error: OnError
        });

        function OnResultsReceived(data, textStatus) {
            if (data['d'].results) {
                resolve(data['d'].results);

            }
        }

        function OnError(XMLHttpRequest, textStatus, errorThrown) {
            reject(textStatus);
            this.setState({
                loading: false
            });
        }
    });
}