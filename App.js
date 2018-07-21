import React from 'react';
import { Button, Text, View } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  align-items: center;
  background-color: papayawhip;
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

 const BillAmountInput = styled.TextInput`
  border: 1px solid aqua;
  height: 40px;
  width: 100%;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
`;

const CustomTip = styled.TextInput`
  border: 1px solid aqua;
  height: 30px;
  width: 60px;
  padding: 5px;
  margin: 5px;
`;

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      inputValue: '',
      tip: 0.2,
    };
  }

  updateCustomTip(customTip) {
    if (customTip) {
      this.setState({
        tip: parseFloat(customTip) / 100,
      });
    } else {
      this.setState({ tip: 0 });
    }
  }

  render() {
    let tip = 0.00
    if (this.state.inputValue) {
      tip = parseFloat(this.state.inputValue) * this.state.tip;
      tip = (Math.round(tip * 100) / 100).toFixed(2);
    }
    return (
      <Container>
          <Text>
            ${tip}
          </Text>
        <BillAmountInput
          keyboardType='numeric'
          onChangeText={billAmount => this.setState({inputValue: billAmount})}
          placeholder="0.00"
          value={this.state.inputValue}
        />
        <ButtonWrapper>
          <Button
            onPress={() => this.setState({tip: 0.1})}
            title="10%"
          />
          <Button
            onPress={() => this.setState({tip: 0.15})}
            title="15%"
          />
          <Button
            onPress={() => this.setState({tip: 0.2})}
            title="20%"
          />
          <CustomTip
            keyboardType='numeric'
            onChangeText={customTip => this.setState({customTip: customTip})}
            placeholder="20%"
            value={(this.state.tip * 100).toString()}
          />
        </ButtonWrapper>
      </Container>
    );
  }
}
