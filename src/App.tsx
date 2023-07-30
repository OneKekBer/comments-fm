import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
    UserButton,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main/Main";

if (!import.meta.env["VITE_CLERK_PUBLISHABLE_KEY"]) {
    throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env["VITE_CLERK_PUBLISHABLE_KEY"];

function PublicPage() {
    return (
        <>
            <div>
                <a href="/protected">Go to protected page</a>
                <div className="">
                    <UserButton />
                </div>

                <Main />
            </div>
        </>
    );
}

function ProtectedPage() {
    return (
        <div>
            <div className="">
                <UserButton />
            </div>

            <Main />
        </div>
    );
}

function ClerkProviderWithRoutes() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            publishableKey={clerkPubKey}
            navigate={(to) => navigate(to)}
        >
            <Routes>
                <Route path="/" element={<PublicPage />} />
                <Route
                    path="/sign-in/*"
                    element={<SignIn routing="path" path="/sign-in" />}
                />
                <Route
                    path="/sign-up/*"
                    element={<SignUp routing="path" path="/sign-up" />}
                />
                <Route
                    path="/protected"
                    element={
                        <>
                            <SignedIn>
                                <ProtectedPage />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </>
                    }
                />
            </Routes>
        </ClerkProvider>
    );
}

function App() {
    return (
        <BrowserRouter>
            <ClerkProviderWithRoutes />
        </BrowserRouter>
    );
}

export default App;
