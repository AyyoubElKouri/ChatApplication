import { useState } from 'react'
import { toast } from 'react-hot-toast';

const handleInputError = (fullName, username, password, confirmPassword, gender) => {
    // Check if all fields are filled
    if (
        !fullName ||
        !username ||
        !password ||
        !confirmPassword ||
        !gender
    ) {
        toast.error("Please fill in all fields.");

        return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        toast.error("Passwords do not match.");

        return false;
    }

    if( password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return false;
    }

    return true;
}

export const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputError(fullName, username, password, confirmPassword, gender)
        if(!success) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    password,
                    confirmPassword,
                    gender,
                }),
            });

            const data = await res.json();
            console.log(data);

            if(data.Error) {
                toast.error(data.Error);
            } else {
                toast.success("Signup successful");
                window.location.href = "/login";
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    return { loading, signup};
}
