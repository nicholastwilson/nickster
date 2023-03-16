import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { merge, tada, flip } from 'react-animations';
import './pinochle.css';
import qos_png from './qos.png';
import jod_png from './jod.png';

class PinochleGame extends Component {

    render() {
        const TadaFlip = styled.div`font-size: 48px; margin-top: 0.6em; animation: ${keyframes`${merge(tada, flip)}`} 5s infinite`;
        const CardQS = styled.img`height: 20vmin; inline-block; animation: ${keyframes`from {transform: rotate(0deg);} to {transform: rotate(360deg);}`} infinite 3s alternate;`;
        const CardJD = styled.img`height: 20vmin; inline-block; animation: ${keyframes`from {transform: rotate(360deg);} to {transform: rotate(0deg);}`} infinite 3s alternate;`;
        // const WavyText = styled.div`font-size: 20px; animation: ${wavifyKeyframes} 1s ease-in-out infinite;`;
        return (
            <div class="Pinochle">
                <TadaFlip>Nickster Cards™</TadaFlip>
                <p/><p/>
                <CardQS src={qos_png} alt="Queen of Spades" />
                <CardJD src={jod_png} alt="Jack of Diamonds" />
                <p/><p/>
                <div class="wavify">
                    {
                        ("Loading...").split('').map(function (letter) {
                            return <span>{letter}</span>
                        })
                    }
                </div>
                <p/>
                {/* <p/><p/>
                <button style={{height: "30px", width: "100px", fontSize: "16px"}} onClick={this.start}>Play!</button> */}
            </div>
        );
    }

}

export default PinochleGame;