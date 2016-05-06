import React from "react"
import Container from '../../redux/Container'
import { Base64 } from 'js-base64'
import template from './FindImage.jsx'

import './FindImage.scss'

class FindImage extends Container {
    
    render() {
        return template.call(this);
    }

    constructor(props) {
        super();
        
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

}

export default FindImage;

function getWebImages(query) {
    return new Promise((resolve, reject) => {
        var bingApiUrl = 'https://api.datamarket.azure.com/Data.ashx/Bing/Search/Image?Query=%27' + query + '%27&$top=48&ImageFilters=%27Size%3AMedium%27&$format=json';
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