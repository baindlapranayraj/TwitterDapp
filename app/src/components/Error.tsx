import { Box, Text, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-purple-200">
      <Box className="p-6 rounded-lg shadow-lg bg-purple-100 border border-gray-200 text-center">
        {/* Error Image */}
        <Box className="flex items-center justify-center mb-6">
          <img
            className="h-64 rounded-md"
            src="https://i.pinimg.com/originals/94/64/3f/94643f8aebabf6a2c52177dce5dbe912.gif"
            alt="Error Illustration"
          />
        </Box>

        {/* Error Message */}
        <Text  className="text-3xl font-bold text-gray-800 mb-4">
          Fuck You RPC !!!
        </Text>
        <Text as="p" className="text-gray-600 mb-6">
          There seems to be an issue with the RPC. Please try again later or go back to the homepage.
        </Text>

        {/* Button to Navigate Home */}
        <Link to="/">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Go Back to Homepage
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Error;
