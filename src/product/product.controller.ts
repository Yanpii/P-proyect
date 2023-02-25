import { Controller, Get, Post, Delete, Put, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {

constructor(private productService: ProductService){};


@Get('/')
async getProducts(@Res() res){
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
        products
    })
}

@Get('/:productID')
async getProduct(@Res() res, @Param('productID') productID ){
    const product = await this.productService.getProduct(productID);
   
    if(!product) throw new NotFoundException('Product does not exists');
   
    return res.status(HttpStatus.OK).json(product);
}

@Post('/create')
async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO){

   const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
    message: 'received',
    product: product
});
    
}

@Delete('/delete')
async deleteProduct(@Res() res, @Query('productID') productID){

   const productDeleted = await this.productService.deleteProduct(productID);
   if(!productDeleted) throw new NotFoundException('Product does not exists');
 
   return res.status(HttpStatus.OK).json({
    message: 'Product deleted succesfully',
    productDeleted

});
}

@Put('/update')
async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID){
    const updateProduct = await this.productService.updateProduct(productID, createProductDTO);
    if(!updateProduct) throw new NotFoundException('Product does not exists');
    return res.status(HttpStatus.OK).json({
        message: 'Product update succesfully',
        updateProduct
    
    });
}


}
