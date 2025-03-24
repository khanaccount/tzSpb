import fs from "fs";
import { User } from "./src/interface/Users.interface";

const totalImages = 70;

const users: User[] = Array.from({ length: 1000000 }, (_, i) => ({
  id: `${i + 1}`,
  firstName: `Пользователь ${i + 1}`,
  lastName: "Задайте фамилию",
  age: Math.floor(Math.random() * 50) + 18,
  email: `user${i + 1}@example.com`,
  avatar: `https://i.pravatar.cc/1000?img=${(i % totalImages) + 1}`,
}));

fs.writeFileSync("db.json", JSON.stringify({ users }, null, 2), "utf8");
console.log("✅ db.json создан с повторяющимися аватарами!");
