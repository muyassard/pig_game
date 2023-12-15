import { Router } from "express";
import { faker } from "@faker-js/faker";

import { games } from "./db";
import { IEntity } from "./types";
import * as Mappers from "./mappers";

const router = Router();

//  List
router.get("/", (req, res) => {
  const miniGames = games.map(Mappers.Mini);

  res.send({ data: miniGames, message: null });
}); // { data: [],  message: null }

// Single
router.get("/:gameId", (req, res) => {
  const { gameId } = req.params;

  const game = games.find((game) => game.id === gameId);

  if (!game) return res.status(404).send({ data: null, message: `Game not found with id ${gameId}` });

  res.send({ data: game, message: null });
}); // { data: {},  message: null }

router.post("/", (req, res) => {
  const { player1, player2 } = req.body as Pick<IEntity.Game.Main, "player1" | "player2">;

  const game: IEntity.Game.Main = {
    id: faker.string.uuid(),
    player1: {
      id: faker.string.uuid(),
      name: player1.name,
      currentScore: 0,
      totalScore: 0
    },
    player2: {
      id: faker.string.uuid(),
      name: player2.name,
      currentScore: 0,
      totalScore: 0
    },
    currentPlayer: player1.id,
    winner: null
  };
  game.currentPlayer = game.player1.id;

  games.push(game);
  const miniGames = games.map(Mappers.Mini);

  res.send({ data: game, message: "Game successfully created 🎁" });
}); // { data: { id: "adsadsa", player1: "Kent", player2: "Mark" }, message: "Game successfully created 🎁" }

router.post("/dice/:gameId", (req, res) => {
  let mes = "";
  const body = req.body as { playerId: string };
  const { gameId } = req.params;
  const game = games.find((game) => game.id === gameId);
  if (!game) return res.status(404).send({ data: null, message: `Game not found with id ${gameId}` });
  let player = game.currentPlayer === game.player1.id ? game.player1 : game.player2;
  const rollDice = Math.floor(Math.random() * (6 - 1) + 1);
  
  if (rollDice === 1) {
    player = player.id === game.player1.id ? game.player2 : game.player1;
    mes = "you got number 1 😕";
  } else {
    player.currentScore += rollDice;
    mes = `number ${rollDice} has been added to you`;
    if (player.totalScore >= 60) {
      mes = "you won 🎉";
    }
  }

  res.send({ data: player, message: mes });
}); // { data: {1-6}, message: null }

router.post("/hold/:gameId", (req, res) => {
  let mes = "";
  const body = req.body as { playerId: string };
  const { gameId } = req.params;
  const game = games.find((game) => game.id === gameId);
  if (!game) return res.status(404).send({ data: null, message: `Game not found with id ${gameId}` });
  let player = game.currentPlayer === game.player1.id ? game.player1 : game.player2;
  if (game.currentPlayer === game.player1.id) {
    game.currentPlayer = game.player2.id;
  } else if (game.currentPlayer === game.player1.id) {
    game.currentPlayer += game.player1.id;
  }

  res.send({ data: player, message: mes });
}); // { data: single game({}), message: null }

router.put("/reset/:gameId", (req, res) => {
  const { gameId } = req.params;
  let game = games.find((game) => game.id === gameId);

  if (game === undefined) return res.status(404).send({ data: null, message: `Game not found with id ${gameId}` });
  game = {
    ...game,
    winner: null,
    player1: {
      ...game.player1,
      currentScore: 0,
      totalScore: 0
    },
    player2: {
      ...game.player2,
      currentScore: 0,
      totalScore: 0
    },
    currentPlayer: game.player1.id
  };
  game.currentPlayer = game.player1.id;

  res.send({ data: game, message: "Game successfully restarted 🔁" });
}); // { data: single game({}), message: "Game successfully restarted 🔁" }

router.delete("/:gameId", (req, res) => {
  const { gameId } = req.params;

  const gameIdx = games.findIndex((game) => game.id === gameId);
  if (gameIdx === -1) return res.status(404).send({ data: null, message: `Game not found with id ${gameId}` });

  const [deletedGame] = games.splice(gameIdx, 1);
  res.send({ data: deletedGame, message: "Game successfully deleted 🗑️" });
}); // { data: deleted game({}), message: "Game successfully deleted 🗑️" }

export default router;
