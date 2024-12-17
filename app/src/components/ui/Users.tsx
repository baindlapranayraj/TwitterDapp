import { useState } from "react";
import Input from "../Input";
import { KeyRound } from "lucide-react";

const Users = () => {

  const [input,setInput] = useState("")

  const btnHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setInput(value)
  };

  return (
    <div className="w-screen border-solid border-r-2 border-purple-300">
      <Input
        inputFn={inputHandle}
        inputValue={input}
        btnFn={btnHandle}
        icon={<KeyRound />}
        name="Users"
        placeHolderName="enter user publickey hear...."
      />
    </div>
  );
};

export default Users;
