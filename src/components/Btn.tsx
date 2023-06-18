import React from "react";

type BtnProps = {
    text: string
    style?: string
    onClick?: () => void
}

const Btn: React.FC<BtnProps> = ({onClick, text, style}) => {
    return (
        <button onClick={onClick} className={`btn ${style || ""}`}>
            {text}
        </button>
    )
}

export default Btn;