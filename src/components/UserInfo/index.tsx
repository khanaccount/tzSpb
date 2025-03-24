import React, { useEffect } from "react";
import { TextField, Button, Box, Avatar, Typography, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import s from "./index.module.scss";
import { useUser } from "hooks/useUser";
import { useEditUser } from "hooks/useEditUser";
import { useValidation } from "hooks/useValidator";

interface UserInfoProps {
  userId: number;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userId }) => {
  const user = useUser(userId);
  const { isEditing, loading, editedUser, handleChange, toggleEditing, handleSave } =
    useEditUser(user);
  const { email, setEmail, age, setAge, errors, validateForm } = useValidation(
    user?.email || "",
    user?.age.toString() || ""
  );

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave();
    }
  };

  useEffect(() => {
    if (editedUser) {
      setEmail(editedUser.email);
      setAge(editedUser.age.toString());
    }
  }, [editedUser]);

  if (!user) return <CircularProgress />;

  return (
    <Box className={s.user} sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ width: 56, height: 56, mr: 2 }} src={user.avatar}>
          {user.firstName[0]}
          {user.lastName[0]}
        </Avatar>
        {!isEditing ? (
          <Box>
            <Typography variant="h6">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {user.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Age: {user.age}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user.email}
            </Typography>
          </Box>
        ) : null}
      </Box>

      {isEditing && editedUser && (
        <>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="First Name"
              value={editedUser.firstName}
              onChange={handleChange("firstName")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Last Name"
              value={editedUser.lastName}
              onChange={handleChange("lastName")}
              margin="normal"
              variant="outlined"
            />
          </Box>

          <TextField
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            helperText={errors.age}
            error={!!errors.age}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors.email}
            error={!!errors.email}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </>
      )}

      <Box display="flex" justifyContent="space-between" mt={2}>
        {!isEditing && (
          <Typography variant="caption" color="text.disabled">
            ID: {user.id}
          </Typography>
        )}
        <Button
          variant="contained"
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          onClick={isEditing ? handleSubmit : toggleEditing}
          color="primary"
          disabled={loading}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Box>
    </Box>
  );
};
