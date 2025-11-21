import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "../features/auth/page/Signin";
import SignUp from "../features/auth/page/Signup";

export default function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

