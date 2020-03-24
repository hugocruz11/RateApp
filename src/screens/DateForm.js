import React, {Component} from 'react';
import analytics from '@react-native-firebase/analytics';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Text,
  Alert,
  Card,
} from 'native-base';
import {withNavigation} from 'react-navigation';

class DateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Rate: this.props.navigation.getParam('key', false),
      StringRate: '',
      FullName: '',
      SurNames: '',
      Identification: '',
      Email: '',
    };
  }
  componentWillMount() {
    this.TransformRate();
  }
  render() {
    return (
      <Container style={{backgroundColor: '#f1f4f9'}}>
        <Header style={{backgroundColor: '#00aaff'}}>
          <Left>
            <Button transparent>
              <Icon
                style={{fontSize: 30}}
                onPress={() => this.props.navigation.goBack()}
                name="arrow-back"
              />
            </Button>
          </Left>
          <Body>
            <Title style={{marginLeft: 160, fontSize: 30}}>
              Ingresa Tus Datos
            </Title>
          </Body>
        </Header>
        <Content style={{margin: 10}}>
          <Card>
            <Form style={{margin: 20}}>
              <Item floatingLabel style={{marginBottom: 20}}>
                <Label>Nombres</Label>
                <Input
                  style={{width: 50}}
                  onChangeText={FullName => this.setState({FullName})}
                  value={this.state.FullName}
                />
              </Item>
              <Item floatingLabel last style={{marginBottom: 20}}>
                <Label>Apellidos</Label>
                <Input
                  onChangeText={SurNames => this.setState({SurNames})}
                  value={this.state.SurNames}
                />
              </Item>
              <Item floatingLabel last style={{marginBottom: 20}}>
                <Label>Identificacion</Label>
                <Input
                  keyboardType="numeric"
                  onChangeText={Identification =>
                    this.setState({Identification})
                  }
                  value={this.state.Identification}
                />
              </Item>
              <Item floatingLabel last style={{marginBottom: 20}}>
                <Label>Correo</Label>
                <Input
                  keyboardType="email-address"
                  onChangeText={Email => this.setState({Email})}
                  value={this.state.Email}
                />
              </Item>
            </Form>
          </Card>
          <Button
            full
            success
            style={{margin: 20, borderRadius: 10, backgroundColor: '#81af00'}}
            delayLongPress={0}
            onPress={() => this.SubmitForm()}>
            <Text style={{fontSize: 30}}>enviar</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  SubmitForm() {
    if (
      !this.state.FullName ||
      !this.state.SurNames ||
      !this.state.Identification
    ) {
      alert('Todos Los campos son obligatorios');
    } else {
      analytics().logEvent('DATOS_USUARIO', {
        Calificacion: this.state.StringRate,
        Nombres: this.state.FullName,
        Apellidos: this.state.SurNames,
        Identificacion: this.state.Identification,
        Correo: this.state.Email,
      });
      this.props.navigation.navigate('Index');
    }
  }

  TransformRate() {
    if (this.state.Rate) {
      switch (this.state.Rate) {
        case 0:
          this.setState({
            StringRate: 'Malo',
          });
          break;
        case 1:
          this.setState({
            StringRate: 'Regular',
          });
          break;
        case 2:
          this.setState({
            StringRate: 'Bueno',
          });
          break;
        case 3:
          this.setState({
            StringRate: 'Excelente',
          });
          break;
        default:
          this.setState({
            StringRate: '',
          });
          break;
      }
    } else {
      this.setState({
        StringRate: 'Error al enviar el dato',
      });
    }
  }
}

export default withNavigation(DateForm);
