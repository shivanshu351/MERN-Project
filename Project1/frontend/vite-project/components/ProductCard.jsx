import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
	// State to track updated product details
	const [updatedProduct, setUpdatedProduct] = useState({ ...product });

	// Color mode values for text and background
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	// Access product store methods
	const { deleteProduct, updateProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	// Handle product deletion
	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
	};

	// Handle product update
	const handleUpdateProduct = async (pid,updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		if (success) {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			onClose();
		} else {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	// Handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUpdatedProduct((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

			<Box p={4}>
				<Heading as="h3" size="md" mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteProduct(product._id)}
						colorScheme="red"
					/>
				</HStack>
			</Box>

			{/* Modal for Updating Product */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder="Product Name"
								name="name"
								value={updatedProduct.name}
								onChange={handleInputChange}
							/>
							<Input
								placeholder="Price"
								name="price"
								type="number"
								value={updatedProduct.price}
								onChange={handleInputChange}
							/>
							<Input
								placeholder="Image URL"
								name="image"
								value={updatedProduct.image}
								onChange={handleInputChange}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={()=>handleUpdateProduct(product._id,updatedProduct)}
						>
							Update
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default ProductCard;
