import React, { useCallback, useState } from "react";
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  Divider,
  Box,
  ListItem,
  CircularProgress,
} from "@mui/material";
import { useUsers } from "hooks/useUsers";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InfiniteScroll from "react-infinite-scroll-component";
import s from "./index.module.scss";
import { User } from "interface/Users.interface";

interface SidebarProps {
  onSelectUser: (id: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSelectUser }) => {
  const { users, hasMore, fetchUsers, loading } = useUsers();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const Row = useCallback(
    ({ user }: { user: User }) => (
      <ListItem
        onClick={() => onSelectUser(Number(user.id))}
        className={s.sidebar__item}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          cursor: "pointer",
        }}
      >
        <ListItemAvatar>
          <Avatar src={user.avatar} />
        </ListItemAvatar>
        {!isCollapsed && <ListItemText primary={user.firstName} secondary={user.email} />}
      </ListItem>
    ),
    [isCollapsed, onSelectUser]
  );

  return (
    <Paper
      className={s.sidebar}
      sx={{
        width: isCollapsed ? 80 : 270,
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={isCollapsed ? "center" : "space-between"}
        p={2}
        sx={{ height: 64, flexShrink: 0 }}
      >
        {!isCollapsed && <Typography variant="h6">Пользователи</Typography>}
        <IconButton onClick={toggleSidebar}>
          {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ flexShrink: 0 }} />

      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <InfiniteScroll
          dataLength={users.length}
          next={fetchUsers}
          hasMore={hasMore}
          loader={
            !loading && (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress size={24} />
              </Box>
            )
          }
          height={"calc(100vh - 120px)"}
          scrollThreshold={0.9}
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {users.map((user) => (
            <Row key={user.id} user={user} />
          ))}
        </InfiniteScroll>
      </Box>
    </Paper>
  );
};
