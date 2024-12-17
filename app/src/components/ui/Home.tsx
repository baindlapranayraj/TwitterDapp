import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import { InputType } from "../../types";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";

const Home = () => {
  const [input, setInput] = useState<InputType>({
    content: "",
    topic: "",
  });
  const [char, setChar] = useState(280);

  const { connected } = useWallet();

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name == "content") {
      let number = 280 - value.length;
      setChar(number);
    }
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(input);
    if (char < 0 || input.content.length > 280) {
      toast.error("The content is too long");
      return;
    } else if (input.topic.length > 25) {
      toast.error("The topic is too long");
      return;
    }
    toast.success("Successfully added your tweet");
  };



  return (
    <div className=" w-screen border-solid border-x-2 border-purple-300">
      <Box className="p-5 border-solid border-b-2 border-purple-300">
        <Heading>Home</Heading>
      </Box>
      {/* Input Section */}
      <Box className="p-7 border-solid border-b-2 border-purple-300 flex-col justify-start items-start">
        {connected ? (
          <div>
            <input
              value={input?.content}
              name="content"
              onChange={(e) => inputHandle(e)}
              type="text"
              className="border-none focus-within:ring-0 focus-within:outline-none text-purple-600 text-lg font-medium bg-purple-200 w-full py-3 "
              placeholder="Write Your Thoughts Hear"
            />
            <Box className="topic-input-field flex justify-between items-end">
              <Box className="bg-pink-200 w-56 rounded-full flex items-center justify-center px-4">
                <Text className="text-xl font-semibold text-pink-400">#</Text>
                <input
                  name="topic"
                  value={input?.topic}
                  onChange={(e) => inputHandle(e)}
                  className="border-none w-full focus-within:ring-0 text-pink-400 font-bold focus-within:outline-none p-2 bg-pink-200 rounded-full"
                />
              </Box>
              <Box className="flex gap-9 items-center ">
                <Text
                  className={`text-pink-400 font-semibold ${char > 0 ? "text-pink-400" : "text-red-400 "}`}
                >
                  {char} left
                </Text>
                <Button
                  onClick={(e) => submitHandle(e)}
                  size={"4"}
                  className="cursor-pointer bg-pink-200 hover:bg-pink-300 duration-150"
                  color="pink"
                  variant="soft"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </div>
        ) : <div >
            
              <Text className="font-bold text-purple-600">Conncet Your Wallet Onicha......</Text>
          </div>}
      </Box>

      {/* Tweets Section */}
    </div>
  );
};

export default Home;
