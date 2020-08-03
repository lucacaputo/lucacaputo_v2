import React, { useEffect, useState } from "react";

interface TypeWriterProps {
    wordSequence: Array<string>;
    beforeSentence: string;
    afterSentence: string;
    timing?: number;
    textColor?: string;
    bg?: string;
    fontSize?: number;
}

const getIntervalledLetters = async (letters: Array<string>, cb: (lett: string) => void, time: number) => {
    return await new Promise((res, rej) => {
        let [first, ...rest] = letters;
        cb(first);
        if (rest.length === 0) {
            setTimeout(res, time*5);
        }
        else {
            setTimeout(() => {
                res(getIntervalledLetters(rest, cb, time));
            }, time)
        }
    })
    .then(() => letters)
    .catch(err => console.log(err));
}

const TypeWriter: React.FC<TypeWriterProps> = ({ wordSequence, beforeSentence, afterSentence, textColor, bg, fontSize, timing=300 }) => {
    const splittedWords = wordSequence.map(el => el.trim().replace(/\s+/g, "\u00a0").split(""));
    const [content, setContent] = useState<Array<string>>([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        getIntervalledLetters(splittedWords[index], l => setContent(c => [...c,l]), timing)
        .then(arr => getIntervalledLetters(arr as Array<string>, l => setContent(c => c.slice(0, c.length-1)), 100))
        .then(() => {
            if (index === splittedWords.length-1) setIndex(0);
            else setIndex(index+1);
        })
    }, [index]);
    return (
        <div className="typeWriter">
            <span>{beforeSentence}</span>&nbsp;
            <span className="animatableSpan">
                {content.join("")}
                <span className="cursor" />
            </span>&nbsp;
            <span style={{marginLeft: 7}}>{afterSentence}</span>

            <style jsx>
                {`
                    .typeWriter {
                        display: flex;
                        position: relative;
                        width: 100%;
                        flex-wrap: wrap;
                        background-color: ${bg ?? "#141414"};
                    }
                    span {
                        position: relative;
                        color: ${textColor ?? "#fff"};
                        font-size: ${fontSize ?? 16}px;
                        line-height: ${fontSize ? fontSize+4 : 20}px;
                        font-family: "Roboto Mono";
                    }
                    .cursor {
                        position: absolute;
                        transform: translateX(100%);
                        right: 0;
                        top: 0;
                        display: block;
                        height: 100%;
                        width: 7px;
                        background-color: ${textColor ?? "#fff"};
                        animation-name: blink;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                        animation-duration: .5s;
                        will-change: opacity;
                    }
                    @keyframes blink {
                        0% {
                            opacity: 0;
                        }
                        50% {
                            opacity: 1;
                        }
                        100% {
                            opacity: 0;
                        }
                    }
                    @media (max-width: 767px) {
                        span {
                            font-size: 21px;
                            line-height: 24px;
                        }
                        .typeWriter {
                            align-items: center;
                        }
                    }
                `}
            </style>

        </div>
    );
}

export default React.memo(TypeWriter);