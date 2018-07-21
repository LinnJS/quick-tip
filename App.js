import React from 'react'
import Expo from 'expo'
import {Text, View} from 'react-native'
import styled from 'styled-components/native'

import {
  Container, Content, Header, Left, Body, Title, Right, Icon, Button,
} from 'native-base'

const ScreenContainer = styled.View`
  align-items: center;
  background-color: papayawhip;
  flex: 1;
`

const BillAmountInput = styled.TextInput`
  border: 1px solid aqua;
  height: 40px;
  width: 100%;
`

const ButtonWrapper = styled.View`
  flex-direction: row;
`

const CustomTip = styled.TextInput`
  border: 1px solid aqua;
  height: 30px;
  width: 60px;
  padding: 5px;
  margin: 5px;
`

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
      tip: 0.2,
      isReady: false,
    }
  }

  updateCustomTip(customTip) {
    if (customTip) {
      this.setState({
        tip: parseFloat(customTip) / 100,
      })
    } else {
      this.setState({tip: 0})
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true })
  }

  render() {
    let tip = 0.00
    if (this.state.inputValue) {
      tip = parseFloat(this.state.inputValue) * this.state.tip
      tip = (Math.round(tip * 100) / 100).toFixed(2)
    }

    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
          <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu"/>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Text>${tip}</Text>
          <BillAmountInput
            keyboardType="numeric"
            onChangeText={billAmount => this.setState({inputValue: billAmount})}
            placeholder="0.00"
            value={this.state.inputValue}
          />
          <ButtonWrapper>
            <Button
              onPress={() => this.setState({tip: 0.1})}>
              <Text>10%</Text>
            </Button>
            <Button
              onPress={() => this.setState({tip: 0.15})}
            >
              <Text>15%</Text>
            </Button>
            <Button
              onPress={() => this.setState({tip: 0.2})}>
              <Text>20%</Text>
            </Button>
            <CustomTip
              keyboardType="numeric"
              onChangeText={customTip => this.updateCustomTip(customTip)}
              placeholder="20%"
              value={(this.state.tip * 100).toString()}
            />
          </ButtonWrapper>
        </Content>
      </Container>
    )
  }
}
