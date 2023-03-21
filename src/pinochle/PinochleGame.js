import { useState } from 'react';
import { useSpring, animated, config, easings, useSprings } from '@react-spring/web';
// import styled, { keyframes } from 'styled-components';
// import { merge, tada, flip } from 'react-animations';
// import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
import './pinochle-title.scss';
import qos_png from './qos.png';
import jod_png from './jod.png';

export default function PinochleGame() {
    const [titleReverse, setTitleReverse] = useState(false);
    const titleProps = useSpring({
        // loop: true,
        from: { transform: "rotateY(0deg)" },
        to: [
            // { transform: "rotateY(45deg)" },
            // { transform: "rotateY(90deg)" },
            // { transform: "rotateY(135deg)" },
            { transform: "rotateY(180deg)" },
            // { transform: "rotateY(90deg)" },
            // { transform: "rotateY(360deg)" },
            { transform: "rotateY(0deg)" },
            { transform: "rotateY(0deg)" },
            { transform: "rotateY(0deg)" },
        ],
        config: Object.assign(config.gentle, {
            easing: easings.default,
            duration: 1000,
            bounce: 1
        }),
        // clamp: true,
        reverse: titleReverse,
        onRest: () => setTitleReverse(!titleReverse)
    });
    // const TadaFlip = styled.div`font-size: 48px; margin-top: 0.6em; animation: ${keyframes`${merge(tada, flip)}`} 5s infinite`;
    // const CardQS = styled.img`height: 20vmin; inline-block; animation: ${keyframes`from {transform: rotate(0deg);} to {transform: rotate(360deg);}`} infinite 3s alternate;`;
    // const CardJD = styled.img`height: 20vmin; inline-block; animation: ${keyframes`from {transform: rotate(360deg);} to {transform: rotate(0deg);}`} infinite 3s alternate;`;
    // const WavyText = styled.div`font-size: 20px; animation: ${wavifyKeyframes} 1s ease-in-out infinite;`;
    return (
        <div class="title-page">
            <animated.div style={titleProps}>Nickster Cards™</animated.div>
            {/* <div class="title-text">Nickster Cards™</div> */}
            <p/><p/>
            <div class="title-cards" style={{ "white-space": "nowrap" }}>
                <img class="title-card-left" src={qos_png} alt="Queen of Spades" />
                <img class="title-card-right" src={jod_png} alt="Jack of Diamonds" />
            </div>
            <p/><p/>
            <div class="loading">{ ("Loading...").split('').map(function (a) { return <span>{a}</span> }) }</div>
            <p/>
            {/* <p/><p/>
            <button style={{height: "30px", width: "100px", fontSize: "16px"}} onClick={this.start}>Play!</button> */}
        </div>
    );
}