import React, { useState } from "react";
import { Sidebar } from "components/Sidebar";
import { UserInfo } from "components/UserInfo";
import { Box } from "@mui/material";

export const Home: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar onSelectUser={setSelectedUserId} />
      <Box sx={{ flex: 1, p: 3 }}>
        {selectedUserId !== null && <UserInfo userId={selectedUserId} />}
      </Box>
    </Box>
  );
};
