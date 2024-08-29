import React from 'react';
import { Box, Image, Heading, Text, HStack, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const ProductCard = ({ product, onOpen, handleDeleteProduct }) => {
  // Define default values for bg and textColor or pass them as props if needed
  const bg = "white"; // or any color you prefer
  const textColor = "black"; // or any color you prefer

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme='blue'
            aria-label='Edit product'
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme='red'
            aria-label='Delete product'
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
