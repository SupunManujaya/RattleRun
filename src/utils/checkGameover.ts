import { Coordinate } from "../types/types";

export const checkGameover = (
  snakeHead: Coordinate,
  boundaries: any
): boolean => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y > boundaries.xMax ||
    snakeHead.y < boundaries.xMin
  );
};