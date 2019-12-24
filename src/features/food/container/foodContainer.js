import React from "react";
import FoodCards from "../components/foodCards";

const FoodContainer = props => {
  const { val,val1, handleOnChange, tempData, food,MenuLists } = props
  return (
    <div>
      <FoodCards val={val} val1={val1} handleOnChange={handleOnChange} tempData={tempData} food={food} MenuLists={MenuLists}/>
    </div>
  );
};

export default FoodContainer;

const FoodData = [
  {
    food_id: 1,
    food_name: "beef",
    image: "images/food/food (1).jpg",
    price: 12000,
    size: "normal",
    menu_id: 1
  },
  {
    food_id: 2,
    food_name: "beef",
    image: "images/food/food (2).jpg",
    price: 12000,
    size: "normal",
    menu_id: 2
  },
  {
    food_id: 3,
    food_name: "beef",
    image: "images/food/food (3).jpg",
    price: 12000,
    size: "normal",
    menu_id: 3
  },
  {
    food_id: 4,
    food_name: "beef",
    image: "images/food/food (4).jpg",
    price: 12000,
    size: "normal",
    menu_id: 4
  }
];
