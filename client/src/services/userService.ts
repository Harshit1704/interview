import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

const app = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = async (): Promise<User[] | undefined> => {
    try {
        const response = await app.get("/users");
        return response.data;
    }catch (error) {
        console.error("Error fetching users:", error);
    }

}

export const addUser = async (user: Omit<User, "id">): Promise<User | undefined> => {
    try {
        const response = await app.post("/users", user);
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        alert("Error adding user. Please try again.");
    }
};