import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { colors } from "../styles/colors";
import { Direction, GestureEventType, coordinate } from '../types/types';

const SNAKE_INITIAL_POSITION = [{ X: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS_ = { xMin: 0, xMax: 35, YMin: 0, yMax: 63 };
const MOVE_INITIAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
    const [direction, setdirection] = React.useState<Direction>(Direction.Right);
    const [snake, setsanake] = React.useState<coordinate[]>(
      SNAKE_INITIAL_POSITION
    );
   
    const [food, setFood] = React.useState<coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver,SetisGameOver] = React.useState<Boolean>(false);
    const [ispaused, setispaused] = React.useState<Boolean>(false);
    
    const handlegesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;

        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) { 
                setdirection(Direction.Right);
            }  else {
                setdirection(Direction.Left); 
            }
        } else {
            if (translationY > 0) {
                setdirection(Direction.Down);
            } else {
                setdirection(Direction.Up);  
            }
        }
    };

    return (
        <PanGestureHandler onGestureEvent={handlegesture}>
            <SafeAreaView style={style.container}></SafeAreaView>
        </PanGestureHandler>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
}); ''

