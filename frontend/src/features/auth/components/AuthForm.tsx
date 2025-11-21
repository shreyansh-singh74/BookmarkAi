interface AuthFormProps{
    type: 'login' | 'register'
}

export default function AuthForm(props: AuthFormProps){
    return(
        <form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
                <input type="email" placeholder="Email" className="border rounded p-2" />
            <input type="password" placeholder="Password" className="border rounded p-2" />

            {props.type === 'register' && (
                <input type="password" placeholder="Confirm Password" className="border rounded p-2" />
            )}

            <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">{props.type == 'login'? 'Sign-In':'Sign-Up'}</button>
            </div>
        </form>
    )
}