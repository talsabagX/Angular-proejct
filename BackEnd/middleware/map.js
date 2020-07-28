let mapArray = new Array()

function saveUserInfo(token, succesfolLoginDetails) {
    let userInformation = {
        key: token,
        value: succesfolLoginDetails
    }
    mapArray.push(userInformation)
    return mapArray
}

function checkMapForUserId(token) {
    let id;
    for (let index = 0; index < mapArray.length; index++) {

        if (token == "Bearer" + " " + mapArray[index].key) {
            id = mapArray[index].value[0].id
        }

    }
    return id
}

function getUserInfo(token) {
    let userInfo
    for (let index = 0; index < mapArray.length; index++) {

        if (token == "Bearer" + " " + mapArray[index].key) {
            userInfo = mapArray[index].value
        }
    }
    // console.log(userInfo)
    return userInfo
}



module.exports = { saveUserInfo, checkMapForUserId , getUserInfo}