import AuthForm from "../components/AuthForm"

export default function SignUp(){
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <AuthForm type="register" />
        </div>
    )
}