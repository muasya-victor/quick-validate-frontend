export const baseUrl = "https://kejacrm-api-0d785412ff3f.herokuapp.com/api/"

export const headers = {
    "Content-Type": "application/json",
};
export const userType = JSON.parse(localStorage.getItem("authData"))?.user?.user_type;
export const activeUser = JSON.parse(localStorage.getItem("authData"))?.user;

export const projectName = 'Quick Validate'