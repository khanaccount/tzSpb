import { useSelector } from "react-redux";
import { UsersState } from "interface/Users.interface";

export const useUser = (userId: number | string) => {
  const userIdStr = String(userId);

  const user = useSelector((state: { users: UsersState }) => {
    const foundUser = state.users.users.find((u) => {
      return String(u.id) === userIdStr;
    });

    return foundUser;
  });

  return user;
};
