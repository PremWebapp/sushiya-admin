import { useState } from "react"

const Token = () => {
    const token = localStorage.getItem('token');
    return (
        { token }
    )
}

const UserId = () => {
    const user_id = localStorage.getItem('user_id');

    return (
        { user_id }
    )
}

const PathUrl =() => {

   const [urlData, setUrlData] = useState({

    development: 'http://localhost:8000/api',
    production: 'http://52.91.235.134/api',


});

   return (
    {urlData}
)
}
const baseUrl = {
    development: 'http://localhost:8000/api',
    production: 'https://shushiya.webapp.world/api',
}

export { Token, UserId, PathUrl,baseUrl }