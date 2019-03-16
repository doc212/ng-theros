import { User } from "app/models/user";

const users : User[] = [
    {
        id: 1,
        fullname: "Super Joe",
        admin: true,
        password: "",
    },
    {
        id: 2,
        fullname: "Regular Joe",
        admin: false,
        password: "",
    },
    {
        id: 3,
        fullname: "Some shmoe",
        admin: false,
        password: "",
    },
];

const MockData = {
    users: users,
}
export {MockData};