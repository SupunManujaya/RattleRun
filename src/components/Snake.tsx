import { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { Coordinate } from "../types/types";
import { Colors } from "../styles/colors";

interface SnakeProps {
  snake: Coordinate[];
}

export default function snake({ snake }: SnakeProps): JSX.Element {
  return (
    <Fragment>
      {snake.map((segment: Coordinate, index: number) => {
        const segmentsyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={index} style={[style.snake, segmentsyle]} />
      })}
    </Fragment>
  )
}

const style = StyleSheet.create({
  snake: {
    width: 15,
    higth: 15,
    borderRadius: 7,
    backgroundcolor: Colors.primary,
    position: 'absolute'
  }
})
