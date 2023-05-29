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
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Menu, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import ColorMode from "../colorMode/ColorMode";
import { useRef } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsShopWindow } from "react-icons/bs";
import { RiCalendarTodoLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <ChakraProvider>
      <Box p={6}>
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
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
                    <Flex alignItems="center">
                      <IconButton
                        variant="ghost"
                        colorScheme="teal"
                        aria-label="summary"
                        icon={<AiOutlineDashboard />}
                        _hover={{ bgColor: "none" }}
                      />
                      <NavLink to="/">
                        <MenuItem
                          onClick={onClose}
                          _hover={{ color: "teal.400" }}
                        >
                          <Text ml="-3" mt="0.5">
                            Summary
                          </Text>
                        </MenuItem>
                      </NavLink>
                    </Flex>
                    <Flex>
                      <IconButton
                        variant="ghost"
                        colorScheme="teal"
                        aria-label="summary"
                        icon={<BsShopWindow />}
                        _hover={{ bgColor: "none" }}
                      />
                      <NavLink to="/product-management">
                        <MenuItem
                          onClick={onClose}
                          _hover={{ color: "teal.400" }}
                        >
                          <Text ml="-3" mt="0.2rem">
                            Product Management
                          </Text>
                        </MenuItem>
                      </NavLink>
                    </Flex>
                    <Flex>
                      <IconButton
                        variant="ghost"
                        colorScheme="teal"
                        aria-label="summary"
                        icon={<RiCalendarTodoLine />}
                        _hover={{ bgColor: "none" }}
                      />
                      <NavLink to="/order-management">
                        <MenuItem
                          onClick={onClose}
                          _hover={{ color: "teal.400" }}
                        >
                          <Text ml="-3" mt="0.5">
                            Order Management
                          </Text>
                        </MenuItem>
                      </NavLink>
                    </Flex>
                    <Flex>
                      <IconButton
                        variant="ghost"
                        colorScheme="teal"
                        aria-label="summary"
                        icon={<FaUsers />}
                        _hover={{ bgColor: "none" }}
                      />
                      <NavLink to="/user-management">
                        <MenuItem
                          onClick={onClose}
                          _hover={{ color: "teal.400" }}
                        >
                          <Text ml="-3" mt="0.5">
                            User Management
                          </Text>
                        </MenuItem>
                      </NavLink>
                    </Flex>
                  </MenuGroup>
                  <MenuDivider />
                </Box>
              </Menu>
            </DrawerBody>
            <DrawerFooter>
              <Box>
                <NavLink to="/login">
                  <Button mr={4} colorScheme="teal" variant="outline">
                    Log in
                  </Button>
                </NavLink>
                <NavLink to="/signup" onClick={onClose}>
                  <Button colorScheme="teal" variant="outline">
                    Sign in
                  </Button>
                </NavLink>
              </Box>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
      <ColorMode />
    </ChakraProvider>
  );
};

export default DrawerMenu;
