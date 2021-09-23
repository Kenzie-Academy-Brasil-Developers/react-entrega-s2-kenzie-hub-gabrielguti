import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0; 
    }
    :root{
        --softPurple : #a5bcfc;
        --backgroundImage: #7d8fee;
    }
    body{
        height: 100vh;
        background-color:var(--softPurple);
    }
    body, input, button{
        font-family: 'Comfortaa', cursive;
    }
    button{
        cursor: pointer;
    }
    a{
        text-decoration: none;
    }
    ul, li {
        list-style: none;
    }
`