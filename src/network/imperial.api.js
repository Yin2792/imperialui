export const Base_URL = "http://192.168.100.106:3333/api/v1"


export const AUTH_CONTROLLER_REGISTER = Base_URL + "/auth/register"
export const AUTH_CONTROLLER_LOGIN = Base_URL + "/auth/login"

export const ADMIN_CONTROLLER_UPDATE_MENU =Base_URL + "/admin/updateMenu"
export const ADMIN_CONTROLLER_UPDATE_FOOD =Base_URL + "/admin/updateFood"
export const ADMIN_CONTROLLER_ADD_MENU =Base_URL + "/admin/addMenu"
export const ADMIN_CONTROLLER_ADD_FOOD =Base_URL + "/admin/addFood"
export const ADMIN_CONTROLLER_GET_FOOD_MENU = Base_URL + "/admin/getAllMenuFood"
export const ADMIN_CONTROLLER_DELETE_MENU = Base_URL + "/deleteMenu"


export const USER_CONTROLLER_GET_FOOD_BY_ID=Base_URL +"/user/getFood"
export const USER_CONTROLLER_GET_MENU=Base_URL +"/user/getMenu"
export const USER_CONTROLLER_GET_FOOD = Base_URL +'/user/getFood'
export const USER_CONTROLLER_GET_FOOD_Active= Base_URL +'/user/getFoodbyStatus'
export const USER_CONTROLLER_GET_MENU_Active=Base_URL + '/user/getMenubyStatus'


export const ImageAPI ="http://192.168.100.106:3333/uploads"