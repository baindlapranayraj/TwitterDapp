import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { InputComponentType } from "../types";

const Input = ({icon,name,placeHolderName,btnFn,inputFn,inputValue}:InputComponentType) => {
  return (
    
      <div>
        <Box className="p-5 border-solid border-b-2 border-purple-300">
          <Heading>{name}</Heading>
        </Box>
        <Box>
          <Box className="bg-pink-200 flex items-center p-3">
            <Text className="text-2xl font-bold text-pink-400">{icon}</Text>
            <input
            onChange={(e)=>inputFn(e)}
              placeholder={placeHolderName}
              type="text"
              value={inputValue}
              className="border-none w-full focus-within:ring-0 text-pink-400 font-bold focus-within:outline-none p-2 py-4 bg-pink-200 "
            />
            <Button
            onClick={(e)=>btnFn(e)}
              color="red"
              size={"3"}
              variant="soft"
              className="cursor-pointer"
            >
              Search
            </Button>
          </Box>
        </Box>
      </div>
  
  );
};

export default Input;
