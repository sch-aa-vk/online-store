import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useAppDispatch } from 'store/store.hooks';
import { setPriceRange } from 'store/slices/filters.slice';


function valuetext(value: number) {
  return `${value}°C`;
}

interface ISliderProps {
    max: number,
    min: number,
}

export function RangeSlider(props: ISliderProps) {
  const [value, setValue] = React.useState<number[]>([20, 37]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("props change");
    setValue([props.min, props.max] as number[]);
  }, [props.min, props.max]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
    dispatch(setPriceRange(value as number[]));
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        max={props.max}
        min={props.min}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}