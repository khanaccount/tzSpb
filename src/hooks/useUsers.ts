import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useState } from "react";
import { getUsers } from "services/userServices";
import { RootState } from "store/store";
import { setUsers } from "store/userSlice";

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) =>
    [...state.users.users].sort((a, b) => Number(a.id) - Number(b.id))
  );

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const fetchUsers = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newUsers = await getUsers(offset, limit);

      if (newUsers.length === 0) {
        setHasMore(false);
        return;
      }

      const allUsers = [...users, ...newUsers].sort((a, b) => Number(a.id) - Number(b.id));

      setTimeout(() => {
        dispatch(setUsers(allUsers));
        localStorage.setItem("users", JSON.stringify(allUsers));
        setOffset(offset + newUsers.length);
        setHasMore(newUsers.length === limit);
      }, 800);
    } finally {
      setLoading(false);
    }
  }, [offset, users, loading, hasMore, dispatch]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    setTimeout(() => {
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        dispatch(setUsers(parsedUsers));
        setOffset(parsedUsers.length);
      } else {
        fetchUsers();
      }
    });
  }, [dispatch]);

  return {
    users,
    hasMore,
    loading,
    fetchUsers,
  };
};
