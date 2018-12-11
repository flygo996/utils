const setCookie = (name, value) => {
    const Days = 30;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
};

const getCookie = (name) => {
    let arr;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);

    if (arr = document.cookie.match(reg)) { return unescape(arr[2]); } else { return null; }
};

const delCookie = (name) => {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null) { document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`; }
};
