import React , {useState}from "react";


import 'react-datepicker/dist/react-datepicker.css'
import MultiRangeSlider from "multi-range-slider-react";
import {formatDate} from '../utils/utility'
function DatePickerComponent({min,max,minValue,setMinValue,maxValue,setMaxValue}){


  const handleInput = (e) => {
    console.log(e);
    
    console.log(new Date(e.minValue))
    console.log(new Date(e.maxValue))
    setMinValue(new Date(e.minValue));
    setMaxValue(new Date(e.maxValue));
  };


    return (
      
         <MultiRangeSlider
          min={min.getTime()}
          max={max.getTime()}
          step={24 * 60 * 60 * 1000}
          minValue={minValue}
          maxValue={maxValue}
          minCaption={formatDate(minValue)}
          maxCaption={formatDate(maxValue)}
          onChange={(e)=>handleInput(e)}
          ruler={false}
          label={false}
          className="w-50"
        />
    )
}

export default DatePickerComponent;