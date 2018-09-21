import * as React from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Body,
    Left,
    Right,
    Thumbnail,
    Separator,
    Icon,
    List,
    ListItem,
    Card,
    CardItem
} from 'native-base';

import styles from './styles';
import { Field } from 'redux-form';
export interface Props {
    navigation: any;
    list: any;
    isReady: boolean;
    onBack: Function;
    onReady: Function;
}
export interface State { }
class WaitingRoom extends React.Component<Props, State> {
    renderPlayerLists(users, max) {
        let _users = users.map((user, i) => {
            let _right;
            if (user.isReady) {
                _right = 
                <Right>
                    <Text>Ready</Text>
                    <Icon style={styles.readyStatus} active name="checkmark" />
                </Right>;
            }
            return (
            <ListItem icon key={i}>
                <Left>
                    <Button style={user.isReady ? styles.playerIconReady : styles.playerIconNotReady } key={i}><Icon active name="person" /></Button>
                </Left>
                <Body>
                    <Text>{user.name}</Text>
                </Body>
                {_right}
            </ListItem>
            );
        });

        for(let i=0; i < max-users.length; i++) {
            _users.push(
                <ListItem icon key={users.length+i}>
                    <Left>
                        <Button style={styles.playerIcon}><Icon active name="person" /></Button>
                    </Left>
                    <Body>
                        <Text>Waiting for player...</Text>
                    </Body>
                    <Right>
                        <Icon active name="timer" />
                    </Right>
                </ListItem>
            );
        }

        return (_users);
    }
    
    render() {
        const { handleSubmit, valid } = this.props;
        const params = this.props.navigation.state.params || {};
        const gameType = params.gameType || 'Any';
        const location = params.location || 'Siam Center';
        const roomName = params.roomName || 'My room';
        const min = params.min;
        const max = params.max || 6;
        const users = [{
            name: 'Frowningstick',
            isReady: true
        }, {
            name: 'Slumpfickle',
            isReady: false
        },{
            name: 'CheeseclothAngel',
            isReady: true
        },{
            name: 'Icestoppers',
            isReady: true
        }];

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.onBack(params)}>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Waiting Room</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <List>
                            <ListItem icon>
                                <Left><Icon active name="home" /></Left>
                                <Body><Text>{roomName}</Text></Body>
                            </ListItem>
                            <ListItem icon>
                                <Left><Icon active name="md-options" /></Left>
                                <Body><Text>{gameType}</Text></Body>
                            </ListItem>
                            <ListItem icon>
                                <Left><Icon active name="md-map" /></Left>
                                <Body><Text>{location}</Text></Body>
                            </ListItem>
                            <Separator bordered>
                                <Text>Players</Text>
                            </Separator>                            
                            {this.renderPlayerLists(users, max)}
                        </List>
                    </Card>
                    <Button block rounded success={!this.props.isReady} danger={this.props.isReady} style={styles.submitButton} onPress={() => this.props.onReady()}>
                        <Text>{this.props.isReady ? 'Unready': 'Ready'}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default WaitingRoom;
