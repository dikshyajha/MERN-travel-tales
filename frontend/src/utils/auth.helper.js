import baseAxios from "../plugins/axios";

export const setAuthorizationHeader = (token)=>{
    if(token){
        baseAxios.defaults.headers.common.Authorization = 'bearer ' + token;
    }
}


export const logout = ()=>{
    delete baseAxios.defaults.headers.common.Authorization;
    localStorage.clear();
    window.location.reload();
}