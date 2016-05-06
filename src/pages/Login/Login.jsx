import React from 'react'
import { View, Content, Row, Cell, Button } from '../../phonepack'

export default function Login() {
    return (
            <View className="bg-blue-grey">
                <Content padding className="login">
                    <Row className="row--gutters" style={ {'height': '100%'} }>
                        <Cell className="cell--bottom">
                            <h1 className="text-white logo">Secreto</h1>
                            <Button ripple className="button--large button--block button--raised bg-indigo text-white" onClick={this.login.bind(this)}>Login</Button>
                        </Cell>
                    </Row>
                </Content>
            </View>
        )
}