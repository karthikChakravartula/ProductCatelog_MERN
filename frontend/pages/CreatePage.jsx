import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const[newProduct, SetNewProduct] = useState(
    {
 name:"",
 price:"",
 image:"",
    }
  );

  const toast = useToast()

  const { createProduct } = useProductStore();
  const handleAddProduct = async () =>{
    const { success, message } = await createProduct(newProduct);
    console.log("success:", success);
    console.log("Message:", message);
    if(success){
      toast({
title:"Success",
description:message
      });
      SetNewProduct({ name:"",price:"",image:"" });
    }
  };
  
  return <Container maxH={"container.sm"}>
<VStack spacing={8}> 
<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
Create New Product
</Heading>
<Box w={"full"} bg= {useColorModeValue("White","gray.800")} p={6} rounded={"lg"} shadow={"md"}>
<VStack spacing={4}>
<Input placeholder='Product Name' name='name' value={newProduct.name}
 onChange={(e) => SetNewProduct({ ...newProduct, name: e.target.value})}></Input>

 <Input placeholder='Price' name='price' value={newProduct.price} type='number'
 onChange={(e) => SetNewProduct({ ...newProduct, price: e.target.value})}></Input>

 <Input placeholder='Image Url' name='image' value={newProduct.image}
 onChange={(e) => SetNewProduct({ ...newProduct, image: e.target.value})}

></Input>
<Button colorScheme='blue' onClick={handleAddProduct} w="full">Add Product</Button>
</VStack>
</Box>
</VStack>

  </Container>
}

export default CreatePage