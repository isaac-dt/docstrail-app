import { AppError } from "../../../generated/types/common.pb";
import { Product } from "../../../generated/types/catalog/product/product.pb";
/** Product service. */
export declare class ProductDataService {
    readonly db: any;
    getProduct(args: {
        productId: string;
    }): Promise<Product | AppError>;
    createProduct(args: {
        productData: Partial<Product>;
    }): Promise<Product | AppError>;
    updateProductFields(args: {
        productId: string;
        productData: Partial<Product>;
    }): Promise<Product | AppError>;
}
