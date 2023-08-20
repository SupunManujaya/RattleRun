import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Colors } from "../styles/colors";
import { Direction, GestureEventType, Coordinate } from '../types/types';
import Snake from './Snake';
import { checkGameover } from '../utils/checkGameover';
import Food from './Food';
import { checkEatsFood } from '../utils/checkEatsFood';
import { randomFoodposition } from '../utils/randomFoodposition';
import { Header } from 'react-native/Libraries/NewAppScreen';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS_ = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INITIAL = 55;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
    const [direction, setdirection] = useState<Direction>(Direction.Right);
    const [snake, setsanake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setisGameOver] = useState<Boolean>(false);
    const [ispaused, setispaused] = useState<Boolean>(false);
    const [score, setscore] = useState<number>(0);

    useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !ispaused && movesnake();
            }, MOVE_INITIAL);
            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, ispaused]);

    const movesnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead } 

        if (checkGameover(snakeHead, GAME_BOUNDS_)) {
            setisGameOver((prev) => !prev);
            return
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1
                break;
            case Direction.Down:
                newHead.y += 1
                break;
            case Direction.Left:
                newHead.x -= 1
                break;
            case Direction.Right:
                newHead.x += 1
                break;
            default:
                break;
        }

        if (checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodposition(GAME_BOUNDS_.xMax, GAME_BOUNDS_.yMax));
            setsanake([newHead, ...snake]);
            setscore(score + SCORE_INCREMENT);
        } else {
            setsanake([newHead, ...snake]);
        }
    }

    const handlegesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setdirection(Direction.Right);
            } else {
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

    const pauseGame = () => {
        setispaused(!ispaused);
    };

    const reloadGame = () => {
        setsanake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setisGameOver(false);
        setscore(0);
        setdirection(Direction.Right);
        setispaused(false);
    };

    return (
        <PanGestureHandler onGestureEvent={handlegesture}>
            <SafeAreaView style={style.container}>
                {/* <Header
                    ispaused={ispaused}
                    pauseGame={pauseGame}
                    reloadGame={reloadGame}
                >
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: Colors.primary,
                    }}
                    >
                        {score}
                    </Text>
                </Header> */}
                <View style={style.boundaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        // flex: 1,
        marginTop: 25,
        height: 740,
        bordercolor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background
    },
});

