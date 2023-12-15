import { IApi } from "types";
import { http } from "./http";

export const List = () => http.get("/tic-tac-toe");

export const Single = ({ gameId }: IApi.Single.Request) => http.get(`/tic-tac-toe/${gameId}`);

export const Create = (data: IApi.Create.Request) => http.post("/tic-tac-toe", JSON.stringify(data));

export const Delete = ({ gameId }: IApi.Delete.Request) => http.delete(`/tic-tac-toe/${gameId}`);

export const Reset = ({ gameId }: IApi.Reset.Request) => http.put(`/tic-tac-toe/reset/${gameId}`);

export const Move = ({ gameId, ...data }: IApi.Move.Request) => http.post(`/tic-tac-toe/move/${gameId}`, JSON.stringify(data));
