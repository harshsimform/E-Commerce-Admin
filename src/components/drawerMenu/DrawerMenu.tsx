import React from "react";
import {
  Box,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Menu, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiPlayListAddLine } from "react-icons/ri";
import { BsShopWindow } from "react-icons/bs";
import { RiCalendarTodoLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const menuBgColor = useColorModeValue("teal.400", "teal.500");

  return (
    <ChakraProvider>
      <Box p={6}>
        <Button
          ref={btnRef}
          colorScheme="teal"
          bgColor={menuBgColor}
          color="white"
          onClick={onOpen}
        >
          <RxHamburgerMenu />
        </Button>

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Dashboard</DrawerHeader>
            <DrawerBody overflowX="hidden">
              <Menu>
                <Box>
                  <MenuGroup>
                    <NavLink to="/">
                      <Flex alignItems="center" _hover={{ color: "teal.500" }}>
                        <Icon as={AiOutlineDashboard} boxSize={4} />
                        <MenuItem onClick={onClose}>
                          <Text mt="0.5">Summary</Text>
                        </MenuItem>
                      </Flex>
                    </NavLink>
                    <NavLink to="/add-product">
                      <Flex alignItems="center" _hover={{ color: "teal.500" }}>
                        <Icon as={RiPlayListAddLine} boxSize={4} />
                        <MenuItem onClick={onClose}>
                          <Text mt="0.5">Add Product</Text>
                        </MenuItem>
                      </Flex>
                    </NavLink>
                    <NavLink to="/product-management">
                      <Flex alignItems="center" _hover={{ color: "teal.500" }}>
                        <Icon as={BsShopWindow} boxSize={4} />
                        <MenuItem onClick={onClose}>
                          <Text mt="0.5">Products Management</Text>
                        </MenuItem>
                      </Flex>
                    </NavLink>
                    <NavLink to="/order-management">
                      <Flex alignItems="center" _hover={{ color: "teal.500" }}>
                        <Icon as={RiCalendarTodoLine} boxSize={4} />
                        <MenuItem onClick={onClose}>
                          <Text mt="0.5">Order Management</Text>
                        </MenuItem>
                      </Flex>
                    </NavLink>
                    <NavLink to="/user-management">
                      <Flex alignItems="center" _hover={{ color: "teal.500" }}>
                        <Icon as={FaUsers} boxSize={4} />
                        <MenuItem onClick={onClose}>
                          <Text mt="0.5">User Management</Text>
                        </MenuItem>
                      </Flex>
                    </NavLink>
                  </MenuGroup>
                  <MenuDivider />
                </Box>
              </Menu>
            </DrawerBody>
            <DrawerFooter>
              <Box>
                <NavLink to="/login" onClick={onClose}>
                  <Button
                    mr={4}
                    colorScheme="teal"
                    color={menuBgColor}
                    variant="outline"
                  >
                    Log in
                  </Button>
                </NavLink>
                <NavLink to="/signup" onClick={onClose}>
                  <Button
                    colorScheme="teal"
                    color={menuBgColor}
                    variant="outline"
                  >
                    Sign in
                  </Button>
                </NavLink>
              </Box>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </ChakraProvider>
  );
};

export default DrawerMenu;
