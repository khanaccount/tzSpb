import { useEffect, useState } from "react";
import { User } from "interface/Users.interface";
import { updateUser } from "store/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { updateUserApi } from "services/userServices";

export const useEditUser = (user?: User) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(user ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.id !== editedUser?.id) {
      setEditedUser(user);
    } else if (!user) {
      setEditedUser(null);
    }
  }, [user]);

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleChange = (field: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return;
    setEditedUser((prev) => ({
      ...(prev as User),
      [field]: event.target.value,
    }));
  };

  const handleSave = async () => {
    if (!editedUser || !editedUser.id) {
      toast.error("Ошибка: отсутствует ID пользователя");
      return;
    }

    setLoading(true);

    try {
      const updatedUser = await updateUserApi(editedUser);
      dispatch(updateUser(updatedUser));
      setIsEditing(false);
      toast.success("Новые данные сохранены!");
    } catch (error) {
      console.error("Ошибка при обновлении пользователя", error);
      toast.error("Не удалось обновить данные");
    } finally {
      setLoading(false);
    }
  };

  return { isEditing, editedUser, loading, handleChange, toggleEditing, handleSave };
};
