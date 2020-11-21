import React, { Fragment } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

export class StartScene extends React.Component {

    constructor(props) {
        super(props);
        this.client = props.client;
        this.state = { startOpen: false, joinOpen: false, partyName: "", lobbyId: "", partyInvalid: false, lobbyInvalid: false};

        this.openStartDialog = () => { this.setState({ startOpen: true }); }
        this.closeStartDialog = () => { this.setState({ startOpen: false }); }

        this.openJoinDialog = () => { this.setState({ joinOpen: true }); }
        this.closeJoinDialog = () => { this.setState({ joinOpen: false }); }

        this.changePartyName = (event) => {
            let partyInvalid = false;
            if (event.target.value === "") {
                partyInvalid = true;
            }
            this.setState({partyName: event.target.value, partyInvalid: partyInvalid});
        };

        this.changeLobbyId = (event) => {
            let lobbyInvalid = false;
            if (event.target.value === "") {
                lobbyInvalid = true;
            }
            this.setState({lobbyId: event.target.value})
        };
    }

    startGame() {
        if(this.state.partyName === "") {
            this.setState({partyInvalid: true});
            return
        }
        const startPromise = this.client.startGame({name: this.state.partyName});
        
        startPromise.then(lobby => {
            this.closeStartDialog();
            this.props.onStart(lobby);
        });
    }

    joinGame() {
        if(this.state.lobbyId === "") {
            this.setState({lobbyInvalid: true});
            return
        }

        const joinPromise = this.client.joinGame({name: this.state.lobbyId});
        joinPromise.then(lobby => {
            this.closeJoinDialog();
            this.props.onJoin(lobby);
        });
    }

    render() {
        return <Fragment>
            <Container className="justify-content-md-center">
                <Row className="justify-content-center">
                    <Col className="align-self-center"><Button onClick={this.openStartDialog}>Start a Game</Button></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="align-self-center"><Button onClick={this.openJoinDialog}>Join a Game</Button></Col>
                </Row>
            </Container>
            <Modal centered show={this.state.startOpen} onHide={this.closeStartDialog}>
                <Modal.Header closeButton >
                    <Modal.Title>Start a Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter a name for your political party:</Form.Label>
                        <Form.Control isInvalid={this.state.partyInvalid} value={this.state.partyName} onChange={this.changePartyName} type="text" placeholder="Greenback Labor Party" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.startGame.bind(this)}>Start</Button>
                </Modal.Footer>
            </Modal>
            <Modal centered show={this.state.joinOpen} onHide={this.closeJoinDialog}>
                <Modal.Header closeButton >
                    <Modal.Title>Join a Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter the lobby code:</Form.Label>
                        <Form.Control isInvalid={this.state.lobbyInvalid} required onChange={this.changeLobbyId} value={this.state.lobbyId} type="text"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.joinGame.bind(this)}>Join</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    }
}