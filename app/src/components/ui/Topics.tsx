import { useState } from "react";
import Input from "../Input";
import { Hash } from "lucide-react";

const Topics = () => {

  const [input,setInput] = useState("")


  const btnHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    
  };

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
        icon={<Hash />}
        name="Topic"
        placeHolderName="topic"
      />
    </div>
  );
};

export default Topics;
