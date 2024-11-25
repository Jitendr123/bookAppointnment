export const apiBasePath = "";
export const apiPicklist = apiBasePath + '/api/picklist_a.php';



function replaceSpecialChar(getString) {
    if (typeof getString != "number" && getString != null) {
        getString = getString.replace(/\#/g, "^^hash^^");
        getString = getString.replace(/\+/g, "^^plus^^");
        getString = getString.replace(/\%/g, "^^mod^^");
        getString = getString.replace(/\&amp;/g, "^^and^^");
        getString = getString.replace(/\&/g, "^^and^^");
        getString = getString.replace(/\=/g, "^^equal^^");
    }
    return getString;
}

function ajaxRequest() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}
export const callApi = (url, prm, Success) => {
    var prms = "";
    if (typeof prm != "undefined") {
        for (let i = 0; i < prm.length; i++) {
            if (prms.length > 0) prms = prms + "&";
            prms = prms + (i + 1) + "=" + replaceSpecialChar(prm[i]);
        }
    }
    var xhr = new ajaxRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var SessXML = xhr.responseText
                .replace(/[\r\n\s]*</g, "<")
                .replace(/[\r\n\s]*$/g, "");
            if (SessXML.search(".php") >= 0) {
                alert(SessXML);

                //$('.loader').hide();
            }
            else if (SessXML.trim() === '{"msg": "MSG0010"}') {
                let keysToRemove = ['sessionId', 'userSrno', 'userId', 'entitytype', 'active', 'name', 'orderno', 'ordertype', 'isExist'];
                keysToRemove.forEach(k =>
                    sessionStorage.removeItem(k)
                );
                sessionStorage.isSessionTimeout = "1";
                const myLoc = window.location.href.split('/');
                window.location.replace(myLoc[0] + '//' + myLoc[2] + '/login');
            }
            else {
                Success(SessXML);
            }
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(prms);
};


// Input field Validations
const intRegExp = new RegExp("^([0-9]+)$");
export const validateNumValue = (e, f) => {
    if (e === "" || intRegExp.test(e)) {
        if (f) {
            return f(e);
        } else {
            return e;
        }
    } else {
        return false;
    }
};

const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
export const validateDecValue = (e, f) => {
    if (e === "" || floatRegExp.test(e)) {
        f(e);
    } else {
        return false;
    }
}

const alpRegExp = new RegExp('^([a-zA-Z ]+)$');
export const validateAlpValue = (e, f) => {
    if (e === "" || alpRegExp.test(e)) {
        if (f) {
            f(e);
        } else {
            return e;
        }
    } else {
        return false;
    }
}


const emailRegExp = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[.]+[A-Za-z]+$");
export const validtateEmail = (e, f) => {
    if (e === "" || emailRegExp.test(e)) {
        f(e);
    } else {
        f("");
    }
};

const alpNumRegExp = new RegExp('^([0-9a-zA-Z ]+)$');
export const validateAlpNumValue = (e, f) => {
    if (e === "" || alpNumRegExp.test(e)) {
        f(e);
    } else {
        return false;
    }
}

export const dateDMY = (dt) => {
    // Convert to DD/MM/YYYY
    // console.log(dt.toJSON());
    if (dt === "" || dt === null) {
        return dt;
    } else {
        return dt.toJSON().slice(0, 10).split("-").reverse().join("/");
    }
};

export const dateDMYStr = (dt) => {       // Convert to DD/MM/YYYY
    if (dt === "" || dt === null) {
        return dt;
    } else {
        return dt.slice(0, 10).split('-').reverse().join('/');
    }
}

export const validateAlpNumVal = (e) => {
    if (e === "" || alpNumRegExp.test(e)) {
        return e;
    } else {
        return e.slice(0, -1);
    }
}


