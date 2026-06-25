import {useNavigate} from 'react-router-dom'

function Login(){
    const Navigate = useNavigate()

    function onSubmit(){
        Navigate('/admin')
    }
    return(
        <>
        <h1>Login Here</h1>
        <button onClick={onSubmit}>Login..!!</button>
        </>
    )
}

export default Login