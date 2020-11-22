import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function check() {
    return <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-patch-check-fll" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
  </svg>
}

export function Tweet(props) {
    const partyName = props.tweet.party.replaceAll(' ', '_');
    return <div className="tweet">
        <div className="tweet-avatar"></div>
        <div className="tweet-account-name">{partyName} <span className="tooter-blue-fg">{check()}</span></div>
        <div className="tweet-handle">@{partyName}Official</div>
        <div className="tweet-text">{props.tweet.tweet}</div>
        <div className="clear-fix"></div>
        <div className="tweet-controls">
            <Container>
                <Row>
                    <Col className="tweet-control">🗩</Col>
                    <Col className="tweet-control">⭯</Col>
                    <Col className="tweet-control">🫀</Col>
                    <Col className="tweet-control">🥔</Col>
                </Row>
            </Container>
        </div>
    </div>
} 