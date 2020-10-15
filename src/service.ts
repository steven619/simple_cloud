// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const TOKEN = 'TOKEN';

const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo:any) {
    let users = getUsers();
    users.push({
        account: userInfo.account,
        password: userInfo.password
    });
    uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const getToken = function () {
    let ret = '';
    ret = uni.getStorageSync(TOKEN);
    if (!ret) {
        ret = '';
    }
    return ret;
}

const setToken = function (token:string) {
    uni.setStorageSync(TOKEN, token);
}

export default {
    getUsers,
    addUser,
    getToken,
    setToken
}
