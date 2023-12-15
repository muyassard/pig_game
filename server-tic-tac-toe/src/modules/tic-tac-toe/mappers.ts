import { IEntity } from "modules/tic-tac-toe/types";

export const Mini = ({ id, player1, player2 }: IEntity.Game.Main): IEntity.Game.Mini => ({
  id,
  player1,
  player2
});
