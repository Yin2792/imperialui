import React, { useState, useEffect } from "react";
import FoodContainer from "../../food/container/foodContainer";
import Banner from "../../app/banner/banner";
import { FetchUserControllerGetFoodActive, FetchUserControllerGetMenuActive } from '../../../network/api.Fetched'

const Home = () => {
  const [MenuLists, setMenuLists] = useState([])
  const [val, setVal] = useState([])
  const [FoodData, setFood] = useState([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    Fetch_Menu_Status_Active()
    Fetch_GET_Food_Status_Active()
  }, [])

  const Fetch_Menu_Status_Active = () => {
    FetchUserControllerGetMenuActive((networkErr, userErr, data) => {
      if (networkErr != null) { console.log(networkErr) }
      else if (userErr != null) { console.log(JSON.stringify(userErr.message)) }
      else {
        setMenuLists(data.payload)
      }
    })
  }


  const Fetch_GET_Food_Status_Active = () => {
    FetchUserControllerGetFoodActive((networkErr, userErr, data) => {
      if (networkErr != null) { console.log(networkErr) }
      else if (userErr != null) { console.log(JSON.stringify(userErr.message)) }
      else {
        setFood(data.payload)
      }
    })
  }

  const HandleOnChange = inputvalue => {
    setVal([])
    setInputValue(inputvalue.toLocaleLowerCase())
  }

  const HandleCheck = check_id => {
    setInputValue("")
    val.includes(check_id) ? setVal(val.filter(d => d != check_id)) : setVal([...val, check_id])
  }

  const tempData = inputValue.length === 0
    ? FoodData.reduce((r, c) => { return val.includes(c.menu_id) ? [...r, c] : r }, [])
    : FoodData.filter(d => d.food_name.toLocaleLowerCase().includes(inputValue)
      || d.price.includes(inputValue)
      || d.size.toLocaleLowerCase().includes(inputValue)
    )

  return (
    <div>
      <Banner handleOnChange={HandleOnChange} val1={inputValue} handleCheck={HandleCheck} val={val} foodData={FoodData} MenuLists={MenuLists} />
      <FoodContainer val={val} val1={inputValue} handleOnChange={HandleCheck} tempData={tempData} food={FoodData} MenuLists={MenuLists} />
      <div className="container-fluid" style={{ background: 'black', minHeight: '99px' }}>
        <div className="d-flex justify-content-center">
          <h5 className="text-light my-5">Copyright © 2019 - All Rights Reserved by KUMO Solutions.</h5>
        </div>
      </div>
    </div>
  );
};

export default Home;


