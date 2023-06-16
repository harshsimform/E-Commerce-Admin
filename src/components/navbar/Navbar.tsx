import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	Menu,
	MenuButton,
	Avatar,
	MenuList,
	MenuItem,
	MenuDivider,
	Center,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { AiFillShop } from 'react-icons/ai';
import ColorMode from '../colorMode/ColorMode';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	const { isOpen, onToggle } = useDisclosure();

	const isNavbarFixed = useBreakpointValue({ base: false, md: true });

	return (
		<Box
			position={isNavbarFixed ? 'fixed' : 'static'}
			top={0}
			left={0}
			right={0}
			zIndex={10}
		>
			<Flex
				bg={useColorModeValue('white', 'gray.700')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.600')}
				align={'center'}
				userSelect="none"
			>
				<Flex ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
					<NavLink to="/">
						<Flex display={'flex'} alignItems={'center'}>
							<Text fontSize={18} ml={1}>
								<AiFillShop />
							</Text>
							<Text
								textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
								fontFamily={'cursive'}
								color={useColorModeValue('gray.800', 'white')}
								marginX={1}
							>
								Shopzify
							</Text>
						</Flex>
					</NavLink>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={3}
				>
					<ColorMode />

					<Menu>
						<MenuButton
							as={Button}
							rounded={'full'}
							variant={'link'}
							cursor={'pointer'}
							minW={0}
						>
							<Avatar
								size={'sm'}
								src={'https://avatars.dicebear.com/api/male/username.svg'}
							/>
						</MenuButton>
						<MenuList alignItems={'center'}>
							<br />
							<Center>
								<Avatar
									size={'2xl'}
									src={'https://avatars.dicebear.com/api/male/username.svg'}
								/>
							</Center>
							<br />
							<Center>
								<p>Hello, Admin</p>
							</Center>
							<br />
							<MenuDivider />
							<MenuItem>Account</MenuItem>
							<MenuItem>Logout</MenuItem>
						</MenuList>
					</Menu>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
};

export default Navbar;
