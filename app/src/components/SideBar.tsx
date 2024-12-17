import { sideBarType } from "../types";
import { MessagesSquare, User, Users, HomeIcon, Hash } from "lucide-react";
import { Box, Flex } from "@radix-ui/themes";
import { Link } from "react-router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const SideBar = () => {
  const navIteams: sideBarType[] = [
    {
      name: "Home",
      icon: <HomeIcon className="text-xl" />,
      path: "/",
    },
    {
      name: "Topic",
      icon: <Hash />,
      path: "/topics",
    },
    {
      name: "Users",
      icon: <Users />,
      path: "/all-users",
    },
    {
      name: "Profile",
      icon: <User />,
      path: "/profile",
    },
  ];

  return (
    <div className=" py-11 ">
      <Box className="parent flex-col items-center justify-center">
        <Link to={"/"}>
          {" "}
          <Box className="logo flex justify-center items-center gap-3 cursor-pointer">
            <MessagesSquare className="cursor-pointer" size={50} />
            <h1 className="text-xl font-semibold font-sans">Pakodi Chat</h1>
          </Box>
        </Link>

        {/* NavLinks */}
        <Box className="nav-bar-iteams flex-col text-center mt-12">
          {navIteams.map((iteam, i) => (
            <Link className="cursor-pointer" to={iteam.path} key={i}>
              <Flex
                gap={"3"}
                justify={"start"}
                align={"center"}
                // mt={"3"}
                className="hover:bg-purple-300 py-4 px-12 text-center rounded-lg duration-150"
              >
                <span className="text-xl font-bold">{iteam.icon}</span>
                <h1 className="text-xl font-bold">{iteam.name}</h1>
              </Flex>
            </Link>
          ))}
        </Box>

        {/* Wallet-Connect */}
        <Box className="wallet-connect mt-4">
          <WalletMultiButton />
        </Box>
      </Box>
    </div>
  );
};

export default SideBar;
