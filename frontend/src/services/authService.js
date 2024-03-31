const baseUrl = "http://localhost:8080/api/v1/auth";

const loginUser = async (formData, navigate, setError) => {
    try {
        const response = await fetch(`${baseUrl}/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            navigate("/home");
        } else {
            const errorMessage = await response.text();
            setError(errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while logging in. Please try again.");
    }
};

const signupUser = async (formData, navigate, setError) => {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                role: "USER"
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            navigate("/home");
        } else {
            const errorMessage = await response.text();
            setError(errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while signing up. Please try again.");
    }
};

export { loginUser, signupUser };
