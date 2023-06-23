import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiFillShop } from "react-icons/ai";
import StyledNavLink from "../../customComp/StyledNavLink";

const Logo = () => {
  return (
    <Flex display={"flex"} alignItems={"center"} fontSize={"2xl"}>
      <Text fontSize={24}>
        <AiFillShop />
      </Text>
      <Text
        textAlign={useBreakpointValue({ base: "center", md: "left" })}
        fontFamily={"cursive"}
        color={useColorModeValue("gray.800", "white")}
        marginX={1}
      >
        Shopzify
      </Text>
    </Flex>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const year = new Date().getFullYear();

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      mt={"2rem"}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <StyledNavLink to="/">Overview</StyledNavLink>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <StyledNavLink to="/">
                <Text
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: "teal.400",
                  }}
                >
                  Features
                </Text>
              </StyledNavLink>
              <Tag
                size={"sm"}
                bg={useColorModeValue("teal.400", "teal.700")}
                ml={2}
                color={"white"}
              >
                New
              </Tag>
            </Stack>
            <StyledNavLink to="/">Tutorials</StyledNavLink>
            <StyledNavLink to="/">Pricing</StyledNavLink>
            <StyledNavLink to="/">Releases</StyledNavLink>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <StyledNavLink to="/">About Us</StyledNavLink>
            <StyledNavLink to="/">Press</StyledNavLink>
            <StyledNavLink to="/">Careers</StyledNavLink>
            <StyledNavLink to="/">Contact Us</StyledNavLink>
            <StyledNavLink to="/">Partners</StyledNavLink>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <StyledNavLink to="/">Cookies Policy</StyledNavLink>
            <StyledNavLink to="/">Privacy Policy</StyledNavLink>
            <StyledNavLink to="/">Terms of Service</StyledNavLink>
            <StyledNavLink to="/">Law Enforcement</StyledNavLink>
            <StyledNavLink to="/">Status</StyledNavLink>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <StyledNavLink to="/">FaceBook</StyledNavLink>
            <StyledNavLink to="/">Instagram</StyledNavLink>
            <StyledNavLink to="/">Twitter</StyledNavLink>
            <StyledNavLink to="/">LinkedIn</StyledNavLink>
            <StyledNavLink to="/">GitHub</StyledNavLink>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © {year} Shopzify. All rights reserved
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
