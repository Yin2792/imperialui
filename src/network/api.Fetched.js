import * as API_PATH from './imperial.api'
export const FetchAdminControllerLogin = ({ email, password }, callback) => {
    fetch(API_PATH.AUTH_CONTROLLER_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ email: email, password: password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}
export const FetchUserControllerGetMenu = callback => {
    fetch(API_PATH.USER_CONTROLLER_GET_MENU, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}
export const FetchUserControllerGetMenuActive = callback=>{
    fetch(API_PATH.USER_CONTROLLER_GET_MENU_Active,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
    })
    .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}
export const FetchUserControllerGetFoodActive = callback =>{
    fetch(API_PATH.USER_CONTROLLER_GET_FOOD_Active,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
    })
    .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}
export const FetchAdminControllerAddFood = ({ ProductData, token }, callback) => {
    fetch(API_PATH.ADMIN_CONTROLLER_ADD_FOOD, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: ProductData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}
export const FetchAdminControllerAddMenu = ({ MenuItems,menuStatus, token }, callback) => {
    fetch(API_PATH.ADMIN_CONTROLLER_ADD_MENU, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ menuName: MenuItems,status:menuStatus })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))

}
export const FetchAdminControllerFoodMenu = (token, callback) => {

    fetch(API_PATH.ADMIN_CONTROLLER_GET_FOOD_MENU, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`

        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))


}
export const FetchUserControllerGetFood = callback => {
    fetch(API_PATH.USER_CONTROLLER_GET_FOOD, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {

                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}
export const FetchUserControllerGetFoodBYID = (menuId, callback) => {

    fetch(API_PATH.USER_CONTROLLER_GET_FOOD + `/${menuId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data)
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}


export const FetchAdminControllerUpdateFood = ({ ProductUpdateData, foodId, token }, callback) => {
    console.log(ProductUpdateData)
    fetch(API_PATH.ADMIN_CONTROLLER_UPDATE_FOOD + `/${foodId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: ProductUpdateData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}

export const FetchAdminControllerUpdateMenu = ({ MenuItems, menuId,menuStatus ,token }, callback) => {

    fetch(API_PATH.ADMIN_CONTROLLER_UPDATE_MENU + `/${menuId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ menuName: MenuItems,status:menuStatus })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}
export const FetchAuthControllerRegister = ({ name, email, password, phone }, callback) => {
    fetch(API_PATH.AUTH_CONTROLLER_REGISTER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ name: name, email: email, password: password, phone: phone }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }
        })
        .catch(error => callback(error, null, null))
}
