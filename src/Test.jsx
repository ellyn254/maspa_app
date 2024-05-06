import React, {useState} from "react";

const Test = () => {
    const[like, setLike] = useState(100);

    const handleClick = () => {
    setLike(like+1);
    }
    return(
        <div>
            <button onClick={handleClick}>Like</button>
            <span>{like} {like===1 ? 'like': 'like'}</span>
        </div>
    )
}
export default Test
