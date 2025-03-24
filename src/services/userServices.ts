import axios from "axios";
import { User } from "interface/Users.interface";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/users";

export const getUsers = async (offset: number, limit: number): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(API_URL, {
      params: { _start: offset, _limit: limit },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка API:", error);
    throw error;
  }
};

export const updateUserApi = async (user: User): Promise<User> => {
  if (!user.id)
    throw (
      (new Error("Ошибка: ID пользователя отсутствует"),
      toast.error("Ошибка: ID пользователя отсутствует"))
    );
  const response = await axios.put<User>(`${API_URL}/${user.id}`, user);
  return response.data;
};
