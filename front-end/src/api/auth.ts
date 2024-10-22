
export const logoutUser = async ():Promise<boolean> => {
    return fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include", // 쿠키를 포함하여 요청
    })
        .then((response) => {
            if (response.ok) {
                console.log("Logged out");
                return true;
            }
            else {
                return false;
            }
        })
        .catch((error) => {
            console.error("Logout failed", error);
            return false;
        });
  };
