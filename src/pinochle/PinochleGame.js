import React, { Component, useState } from 'react';
import { useSpring, animated } from 'react-spring';
// import styled, { keyframes } from 'styled-components';
// import { merge, tada, flip } from 'react-animations';
// import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
import './pinochle-title.scss';
import qos_png from './qos.png';
import jod_png from './jod.png';

class PinochleGame extends Component {
    render() {
        const [isFlipped, setIsFlipped] = useState(false);
        const { x, scale } = useSpring({
            from: { x: 0, scale: 1 },
            x: isFlipped ? 180 : 0,
            scale: isFlipped ? 0.8 : 1,
            config: { tension: 200, friction: 10 },
        });    
        // const TadaFlip = styled.div`font-size: 48px; margin-top: 0.6em; animation: ${keyframes`${merge(tada, flip)}`} 5s infinite`;
        // const CardQS = styled.img`height: 20vmin; inline-block; animation: ${keyframes`from {transform: rotate(0deg);} to {transform: rotate(360deg);}`} infinite 3s alternate;`;
        // const CardJD = styled.img`height: 20vmin; inline-block; animation: ${keyframes`from {transform: rotate(360deg);} to {transform: rotate(0deg);}`} infinite 3s alternate;`;
        // const WavyText = styled.div`font-size: 20px; animation: ${wavifyKeyframes} 1s ease-in-out infinite;`;
        return (
            <div class="title-page">
                <div class="title-text">Nickster Cards™</div>
                <p/><p/>
                <div class="title-cards" style={{ "white-space": "nowrap" }}>
                    <img class="title-card-left" src={qos_png} alt="Queen of Spades" />
                    <img class="title-card-right" src={jod_png} alt="Jack of Diamonds" />
                </div>
                <p/><p/>
                <div
                    className="tada-flip-container"
                    onClick={() => setIsFlipped(!isFlipped)}
                    >
                    <animated.div
                        className="tada-flip-card"
                        style={{
                        transform: x.interpolate(
                            (x) => `perspective(600px) rotateY(${x}deg)`
                        ),
                        scale: scale,
                        }}
                    >
                        <div className="tada-flip-front">Front</div>
                        <div className="tada-flip-back">Back</div>
                    </animated.div>
                </div>
                <p/><p/>
                <div class="loading">{ ("Loading...").split('').map(function (a) { return <span>{a}</span> }) }</div>
                <p/>
                {/* <p/><p/>
                <button style={{height: "30px", width: "100px", fontSize: "16px"}} onClick={this.start}>Play!</button> */}
            </div>
        );
    }

}

export default PinochleGame;