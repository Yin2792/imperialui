import React, { useState, useEffect } from 'react'
import { MDBBtn, MDBInput, MDBDataTable, MDBContainer } from "mdbreact"
import { readCookie } from '../../../helper/cookieUser'
import { withCookies } from 'react-cookie'
import Image from '../../../assets/icons/logo/default.png'
import DashboardNavbar from '../../../features/admin/components/dashboardnavbar'

import {
    FetchUserControllerGetMenu, FetchAdminControllerAddFood, FetchAdminControllerAddMenu,
    FetchAdminControllerFoodMenu, FetchAdminControllerUpdateFood, FetchAdminControllerUpdateMenu, FetchUserControllerGetMenuActive
} from '../../../network/api.Fetched'
import { Modal } from '../components/modal'
import * as RoutePath from "../../../config/routeConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ImageAPI } from '../../../network/imperial.api'
import { Menu } from '@material-ui/core';
import CategoryModal from '../components/categorymodal'



const AdminDashboardContainer = props => {
    const [foodImage, setImage] = useState(null)
    const [price, setPrice] = useState(5000);
    const [size, setSize] = useState("");
    const [menuId, setMenuId] = useState(-1);
    const [foodName, setFoodName] = useState("");
    const [MenuData, setUserMenu] = useState([])
    const [MenuItems, setMenuItems] = useState("")
    const [status, setStatus] = useState(false)
    const [MenuStatus, setMenuStatus] = useState(false)
    const [UpdateStatus, setUpdateStatus] = useState(false)
    const [FoodMenu, setFoodMenu] = useState([])
    const [foodId, setFoodId] = useState()
    const [file, setFile] = useState(null)
    const [msg, setMsg] = useState(false)
    const [index, setIndex] = useState(-1)
    const [menuIndex, setMenuIndex] = useState(-1)
    const [red, setRed] = useState(false)
    const [imageName, setImageName] = useState(null)
    const [isActive, setActive] = useState(localStorage.getItem('active') === null ? true : JSON.parse(localStorage.getItem('active')))
    const [menuStatus, setmenuStatus] = useState(true)
    const [menuDataActive, setMenuDataActive] = useState([])
    let fetch_menu_id = ""
    // let fileInput = null
    let timeoutId = null;

    useEffect(() => {
        const userData = readCookie(props.cookies)

        if (userData) {
            props.history.push(`${RoutePath.AdminDashboard}`)
            Fetch_Food_Menu(userData)
        }
        else {
            props.history.push(`${RoutePath.Login}`)
        }
        Fetch_Menu()
        Fetch_Menu_Status_Active()

        return () => {
            clearTimeout(timeoutId);
            localStorage.removeItem('active')
        }
    }, [])
    console.log({ MenuData })
    ///FetchFromAPI
    const Fetch_Menu = () => {
        FetchUserControllerGetMenu((networkErr, userErr, data) => {

            if (networkErr != null) { console.log(networkErr) }
            else if (userErr != null) { console.log(JSON.stringify(userErr.message)) }
            else {
                setUserMenu(data.payload)

                //localStorage.setItem('menu_data',JSON.stringify(data.payload))
            }
        })

    }

    const Fetch_Menu_Status_Active = () => {
        FetchUserControllerGetMenuActive((networkErr, userErr, data) => {

            if (networkErr != null) { console.log(networkErr) }
            else if (userErr != null) { console.log(JSON.stringify(userErr.message)) }
            else {
                setMenuDataActive(data.payload)

            }
        })
    }

    const Fetch_Food_Menu = userData => {
        const token = userData.token
        FetchAdminControllerFoodMenu(token, (networkErr, userErr, data) => {
            if (networkErr != null) { console.log(networkErr) }
            else if (userErr != null) {
                if (userErr.message == "jwt expired") {
                    props.history.push(`${RoutePath.Login}`)
                }
                console.log(JSON.stringify(userErr.message))
            }
            else {
                setFoodMenu(data.payload)
            }
        })
    }
    const HandleUpdateProductAdd = (e, index) => {
        e.preventDefault();
        const temp = FoodMenu[index]
        const userData = readCookie(props.cookies)
        // const isOrigin = FoodMenu.filter(d=> d.food_id==temp.food_id && d.food_name.toUpperCase() == foodName.toUpperCase()).length>0;
        const space = foodName.trim()
        let pattern = /[^!@#$%*:?+_<>={}"]+$/;
        const a = foodName.match(pattern)
        if (a == null) {
            setRed(true)
        }
        else {
            const flag = FoodMenu.reduce((r, c) => {
                // console.log("Food name", c.food_name, "Boolean", c.food_name === foodName)
                // console.log("result",r)
                //c.food_name and foodName check if they are matched while looping.and then the results are stored in r
                return r ? r : c.food_id !== temp.food_id && c.food_name.split(' ').join('').toUpperCase() === foodName.split(' ').join('').toUpperCase()
            }, false)
            console.log("new flag", flag)
            if (flag || space == '') {
                setImageName(null)
                setRed(true)
            }
            else {

                let ProductUpdateData = new FormData()
                ProductUpdateData.append('foodName', foodName.trim());
                ProductUpdateData.append('price', price)
                ProductUpdateData.append('size', size.trim())
                ProductUpdateData.append('menuId', menuId);
                ProductUpdateData.append('foodImage', foodImage)
                ProductUpdateData.append('status', menuStatus)
                FetchAdminControllerUpdateFood({ ProductUpdateData, foodId: foodId, token: userData.token }, (networkErr, userErr, data) => {
                    if (networkErr != null) { console.log(networkErr) }
                    else if (userErr != null) { console.log(JSON.stringify(userErr.message)) }
                    else {
                        Fetch_Food_Menu(userData)
                        setRed(false)
                        setFile(null)
                        setImageName(null)
                        const modals = document.getElementById('UpdateTable')
                        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                        modals.classList.remove('show')
                        document.body.removeChild(modalBackdrops[0]);
                        toast.success("Succeded !", {
                            position: toast.POSITION.TOP_CENTER,
                            closeButton: false
                        });

                        //modals.style.display = 'none';
                        timeoutId = setTimeout(() => window.location.reload(), 2000)


                    }

                })

            }

        }


    }

    const Handle_Add_Menu_Items = e => {
        e.preventDefault();
        const userData = readCookie(props.cookies)
        let token = userData.token
        const space = MenuItems.trim()
        let pattern = /[^!@#$%*:?+_<>={}"]+$/;
        // let pattern =  /^(?![. 0-9]())(?!.*[.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/;
        const a = MenuItems.match(pattern)
        if (a == null) {
            setRed(true)
        }
        else {
            const flag = MenuData.reduce((r, c) => {
                //c.food_name and foodName check if they are matched while looping.and then the results are stored in r
                return r ? r : c.menu_name.split(' ').join('').toUpperCase() === MenuItems.split(' ').join('').toUpperCase()
            }, false)
            console.log(flag)
            if (flag || space == '') {
                setRed(true)

            }
            else {

                toast.dismiss()

                FetchAdminControllerAddMenu({ MenuItems: MenuItems.trim(), menuStatus, token }, (networkErr, userErr, data) => {
                    if (networkErr != null) {
                        console.log(networkErr)
                    }
                    else if (userErr != null) {
                        console.log(JSON.stringify(userErr.message))
                    }
                    else {
                        Fetch_Menu(userData)
                        setRed(false)
                        const modals = document.getElementById('menuItems')
                        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                        modals.classList.remove('show')
                        document.body.removeChild(modalBackdrops[0]);
                        setMenuStatus(data.success)
                        // setStatus(false)
                        // setMsg(false)
                        setMenuItems("")
                        toast.success("Succeded !", {
                            position: toast.POSITION.TOP_CENTER,
                            closeButton: false
                        });



                    }


                })
            }

        }






    }
    const Handle_Update_Menu_Items = (e, index) => {
        e.preventDefault();
        const category = MenuData[index]
        const userData = readCookie(props.cookies)
        let token = userData.token
        const space = MenuItems.trim()
        let pattern = /[^!@#$%*:?+_<>={}"]+$/;
        const a = MenuItems.match(pattern)
        console.log("pattern", a)
        if (a == null) {
            setRed(true)
        }
        // console.log("Food name", c.food_name, "Boolean", c.food_name === foodName)
        // console.log("result",r)
        //c.food_name and foodName check if they are matched while looping.and then the results are stored in r
        else {
            const flag = MenuData.reduce((r, c) => {
                return r ? r : c.menu_id !== category.menu_id && c.menu_name.split(' ').join('').toUpperCase() === MenuItems.split(' ').join('').toUpperCase()
            }, false)


            if (flag || space == '') {
                setRed(true)
            }

            else {

                toast.dismiss()

                FetchAdminControllerUpdateMenu({ MenuItems: MenuItems.trim(), menuId, menuStatus, token }, (networkErr, userErr, data) => {
                    if (networkErr != null) { console.log(networkErr) }
                    else if (userErr != null) {

                        console.log(JSON.stringify(userErr.message))
                    }
                    else {

                        Fetch_Menu(userData)
                        setStatus(data.success)
                        setRed(false)
                        const modals = document.getElementById('UpdateCategoryTable')
                        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                        modals.classList.remove('show')
                        //modals.classList.remove('modal-open')
                        document.body.removeChild(modalBackdrops[0]);
                        toast.success("Succeded !", {
                            position: toast.POSITION.TOP_CENTER,
                            closeButton: false
                        });

                        // modals.style.display = 'none';
                        timeoutId = setTimeout(() => window.location.reload(), 2000)


                    }
                })

            }
        }
    }
    const HandleProductAdd = e => {
        e.preventDefault();

        const userData = readCookie(props.cookies)
        const space = foodName.trim()
        console.log("space", space)
        let pattern = /[^!@#$%*:?+_<>={}"]+$/
        const a = foodName.match(pattern) //return string
        console.log("aaaaaa =>", a)
        if (a == null) {
            setRed(true)
        }
        else {
            const falg = FoodMenu.reduce((r, c) => {
                // console.log("Food name", c.food_name, "Boolean", c.food_name === foodName)
                // console.log("result",r)
                //c.food_name and foodName check if they are matched while looping.and then the results are stored in r

                return r ? r : c.food_name.split(' ').join('').toUpperCase() === foodName.split(' ').join('').toUpperCase()
            }, false)

            if (falg || space == '') {
                setRed(true)


            }
            else {


                toast.dismiss()
                let ProductData = new FormData();
                ProductData.append('foodName', foodName.trim());
                ProductData.append('price', price)
                ProductData.append('size', size.trim())
                ProductData.append('menuId', menuId);
                ProductData.append('foodImage', foodImage)
                ProductData.append('status', menuStatus)
                FetchAdminControllerAddFood({ ProductData, token: userData.token }, (networkErr, userErr, data) => {
                    if (networkErr != null) { console.log(networkErr) }
                    else if (userErr != null) {

                        console.log(JSON.stringify(userErr.message))
                    }
                    else {

                        Fetch_Food_Menu(userData)
                        setStatus(data.success)
                        setRed(false)
                        const modals = document.getElementById('Product')
                        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                        modals.classList.remove('show')
                        document.body.removeChild(modalBackdrops[0]);
                        toast.success("Succeded !", {
                            position: toast.POSITION.TOP_CENTER,
                            closeButton: false
                        });


                    }
                })


            }
        }



    }
    ///setVAlues
    const HandleAddMenuItems = MenuItems => {

        setMenuItems(MenuItems)
    }

    const HandleFoodName = foodName => {
        setFoodName(foodName)

    }

    const HandleImage = (foodImage, e) => {

        // console.log("foodimage is=>",foodImage);


        if (foodImage == undefined) {

            if (e.target.files[0]) setImageName(e.target.files[0].name)

        }
        else {
            setFile(URL.createObjectURL(foodImage))
            setImage(foodImage)
            setImageName(e.target.files[0].name)
        }


    }
    const HandleMenuId = menuId => {
        console.log(menuId)
        setMenuId(menuId)
    }
    const HandlePrice = (price, e, index) => {
        if (price <= 999999) {
            setPrice(parseInt(price))
        }


    }
    const HandleSize = size => {
        setSize(size)
    }
    //update modal

    const HandleUpdateeDataTable = (e, index) => {

        const temp = FoodMenu[index]
        setFoodId(temp.food_id)
        setPrice(temp.price);
        setSize(temp.size);
        setImage(temp.image);
        setMenuId(temp.menu_id);
        setFoodName(temp.food_name);
        setIndex(index)
        setFile(null)
        setImageName(null)
        setRed(false)
        setmenuStatus(temp.status)

    }
    const HandleUpdateCategoryTable = (e, index) => {

        const category = MenuData[index]
        setMenuItems(category.menu_name)
        setMenuId(category.menu_id)
        setMenuIndex(index)
        const status = category.status == 1 ? true : false;
        setmenuStatus(status)


    }
    const addProductBtnClick = () => {
        const userData = readCookie(props.cookies)
        Fetch_Menu_Status_Active(userData)
        setPrice(5000);
        setSize("");
        setImage(null);
        setImageName(null)
        setFile(Image)
        setMenuId(-1);
        setFoodName("");
        setmenuStatus(true)


    }
    console.log("menu iiid", menuId)
    const clearMenuItem = () => {
        setMenuItems("")
        setRed(false)
        setmenuStatus(true)
    };

    const ClearState = () => {
        let a = document.getElementById("upload-photo")
        a.value = null
        setPrice(5000);
        setSize("");
        setImage(null);
        setFile(null)
        setMenuId(-1);
        setFoodName("");
        setRed(false)
        setIndex(0)
        setFoodId()
        setImageName(null)
        setmenuStatus(true)

    }

    ///forstatechanging,in parent render,it must have written,onclick={methodname}
    ///forsubmit and child component,it must have written,onclick={()=>methodname()}
    const ClickCategory = () => {
        setActive(true)
        localStorage.setItem("active", true)
        setMenuId(menuDataActive[0].menu_id)

    }
    const ClickProduct = () => {
        const userData = readCookie(props.cookies)
        setActive(false)
        localStorage.setItem("active", false)
        console.log("menuid", menuDataActive[0].menu_id)
        setMenuId(menuDataActive[0].menu_id)
        Fetch_Menu_Status_Active(userData)
    }


    const AddCategoryBtn = () => {
        setmenuStatus(true)
        setMenuItems("")
    }
    // const OffAlertStatus = e => setStatus(false)

    // const OffAlertMenu = e => setMenuStatus(false)

    // const OffAlertUpdate = e => setUpdateStatus(false)
    const HandleDeleteDataTable = (e, index, id) => {
        console.log(index)
    }
    const CheckOnChange = e => {
        setmenuStatus(e.target.checked)
    }
    const menuData = menuDataActive.map((v, k) => {
        return <option key={k} value={v.menu_id}>{v.menu_name}</option>
    })
    
    const food = FoodMenu.reduce((r, c, index) => {

        c.status_column = <MDBBtn id="button" size="sm" color={c.status == true ? "success" : "danger"} style={{ width: '110px' }} disabled>{c.status == true ? "active" : "no active"}</MDBBtn>
        c.Image = <img className="img-thumbnail" alt='Product' style={{ height: '50px', width: '50px' }} src={`${ImageAPI}/${c.image}`} />
        c.update = <MDBBtn color="primary" size="sm" data-toggle="modal" data-target="#UpdateTable" onClick={(e) => HandleUpdateeDataTable(e, index)}><span><i className="fa fa-edit">update</i></span></MDBBtn>
        c.no = index+1;
        return [...r, c]

    }, [])

    let menu = [];
    menu = MenuData.length > 0 ? MenuData.reduce((r, c, menuIndex) => {
        c.update = <MDBBtn color="primary" size="sm" data-toggle="modal" data-target="#UpdateCategoryTable" onClick={(e) => HandleUpdateCategoryTable(e, menuIndex)}><span><i className="fa fa-edit">update</i></span></MDBBtn>
        c.status_column = <MDBBtn id="button" size="sm" color={c.status == true ? "success" : "danger"} style={{ width: '110px' }} disabled>{c.status == true ? "active" : "no active"}</MDBBtn>
        c.no = menuIndex+1
        return [...r, c]

    }, []) : []


    const data = isActive ? {
        columns: [
            {
                label: 'NO',
                field: 'no'
            },
            {
                label: 'Category Name',
                field: 'menu_name',
                sort: 'asc',
            },
            {
                label: 'Action',
                field: 'update',
                sort: 'asc',
            },
            {
                label: 'status',
                field: 'status_column',
                sort: 'asc',

            },

        ],
        rows: menu
    } : {
            columns: [
                {
                    label: 'NO',
                    field: 'no',
                },
                {
                    label: 'Food Name',
                    field: 'food_name',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Category Name',
                    field: 'menu_name',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Food Price',
                    field: 'price',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Food Size',
                    field: 'size',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Image',
                    field: 'Image',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Action',
                    field: 'update',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Status',
                    field: 'status_column',
                    sort: 'asc',
                    width: 150
                },
            ],
            rows: food
        }
    //checkIFTHEREISSAMENAME   



    return (
        <div>
            <DashboardNavbar />
            <div className="container container-mobile">

                <div class="d-flex justify-content-between my-3">

                    {isActive ? <MDBBtn data-toggle="modal" data-target="#menuItems" onClick={() => AddCategoryBtn()} > <span><i className="fa fa-plus"></i></span> Add category</MDBBtn> :
                        <MDBBtn data-toggle="modal" data-target="#Product" onClick={() => addProductBtnClick()}> <span><i className="fa fa-plus"></i></span> Add products</MDBBtn>}
                    <div className="d-flex flex-row">
                        <div onClick={() => ClickCategory()} className="mr-5 my-4 category-mobile" style={{ cursor: 'pointer' }}><strong style={isActive ? { color: 'white', backgroundColor: 'rgb(128,0,0)', padding: '10px 10px', boxShadow: '0 10px 6px -6px #777' } : { color: 'black' }}>CATEGORY</strong></div>
                        <div onClick={() => ClickProduct()} className="my-4" style={{ cursor: 'pointer' }}><strong style={isActive ? { color: 'black' } : { color: 'white', backgroundColor: 'rgb(128,0,0)', padding: '10px 10px', boxShadow: '0 10px 6px -6px #777' }}>PRODUCT</strong></div>
                    </div>

                </div>
                <div>
                    <MDBContainer>
                        <MDBDataTable striped bordered hover data={data} noBottomColumns entries={5} entriesOptions={[5, 10, 15, 20, 25, 30]} responsive />
                    </MDBContainer>

                    <Modal
                        idname="Product"
                        HandleImage={HandleImage}
                        HandleMenuId={HandleMenuId}
                        HandleSize={HandleSize}
                        HandleFoodName={HandleFoodName}
                        HandlePrice={HandlePrice}
                        HandleProductAdd={HandleProductAdd}
                        menuData={menuData}
                        foodName={foodName} menuId={menuId} price={price} size={size}
                        title={"Add Products"}
                        text={"Add"}
                        image={foodImage}
                        file={file}
                        clearState={ClearState}
                        red={red}
                        menuStatus={menuStatus}
                        CheckOnChange={CheckOnChange}
                        imageName={imageName}

                    />
                    <Modal
                        idname="UpdateTable"
                        HandleImage={HandleImage}
                        HandleMenuId={HandleMenuId}
                        HandleSize={HandleSize}
                        HandleFoodName={HandleFoodName}
                        HandlePrice={HandlePrice}
                        HandleProductAdd={HandleUpdateProductAdd}
                        menuData={menuData}
                        foodName={foodName} menuId={menuId} price={price} size={size}
                        title={"Edit Products"}
                        text={"Update"}
                        image={foodImage}
                        file={file}
                        msg={msg}
                        clearState={ClearState}
                        message={"same values are not allowed to be updated"}
                        index={index}
                        red={red}
                        menuStatus={menuStatus}
                        CheckOnChange={CheckOnChange}
                        imageName={imageName}

                    // fileInput={fileInput}
                    />
                    <CategoryModal
                        idname={"menuItems"}
                        title={"Add Category"}
                        red={red}
                        text={"Add"}
                        MenuItems={MenuItems}
                        menuStatus={menuStatus}
                        CheckOnChange={CheckOnChange}
                        Handle_Add_Menu_Items={Handle_Add_Menu_Items}
                        HandleAddMenuItems={HandleAddMenuItems}
                        clearMenuItem={clearMenuItem}
                    />
                    <CategoryModal
                        idname={"UpdateCategoryTable"}
                        title={"Edit Category"}
                        red={red}
                        text={"Update"}
                        menuIndex={menuIndex}
                        MenuItems={MenuItems}
                        CheckOnChange={CheckOnChange}
                        menuStatus={menuStatus}
                        Handle_Add_Menu_Items={Handle_Update_Menu_Items}
                        HandleAddMenuItems={HandleAddMenuItems}
                        clearMenuItem={clearMenuItem}
                    />
                </div>
            </div>

        </div>

    )




}
export default withCookies(AdminDashboardContainer)