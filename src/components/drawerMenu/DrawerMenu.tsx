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
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Menu, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import ColorMode from "../colorMode/ColorMode";
import { useRef } from "react";

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
            <DrawerHeader
              borderBottom={1}
              borderStyle="solid"
              borderColor={"gray.200"}
            >
              Dashboard
            </DrawerHeader>
            <DrawerBody>
              <Menu>
                <Box>
                  <MenuGroup>
                    <NavLink to="/">
                      <MenuItem
                        onClick={onClose}
                        _hover={{ color: "teal.400" }}
                      >
                        Home
                      </MenuItem>
                    </NavLink>
                    <NavLink to="/product-management">
                      <MenuItem
                        onClick={onClose}
                        _hover={{ color: "teal.400" }}
                      >
                        Product Management
                      </MenuItem>
                    </NavLink>
                    <NavLink to="/order-management">
                      <MenuItem
                        onClick={onClose}
                        _hover={{ color: "teal.400" }}
                      >
                        Order Management
                      </MenuItem>
                    </NavLink>
                    <NavLink to="/user-management">
                      <MenuItem
                        onClick={onClose}
                        _hover={{ color: "teal.400" }}
                      >
                        User Management
                      </MenuItem>
                    </NavLink>
                  </MenuGroup>
                  <MenuDivider />
                </Box>
              </Menu>
            </DrawerBody>
            <DrawerFooter>
              <Box>
                <Button mr={4} colorScheme="teal" variant="outline">
                  Log in
                </Button>

                <Button colorScheme="teal" variant="outline">
                  Sign in
                </Button>
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
