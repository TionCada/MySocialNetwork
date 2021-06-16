import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "6552d84d-93ee-4b88-973a-b5206743f797"}
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    deleteSubscription(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    addSubscription(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    authorizationCheck() {
        return authAPI.authorizationCheck()
    },
    getProfileInfo(userId) {
        return profileAPI.getProfileInfo(userId)
    }
}

export const profileAPI = {
    getProfileInfo(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
            .then(response => response.data)
    },
    updateProfilePicture(picture) {
        const formData = new FormData();
        formData.append("image", picture);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
            .then(response => response.data)
    },
}

export const authAPI = {
    authorizationCheck() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login(email, password, rememberMe = false, captcha = null) {
        debugger
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get(`security/get-captcha-url`)
            .then(response => response.data)
    }
}