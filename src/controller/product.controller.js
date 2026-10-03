import productModel from "../models/product.model.js";

export const createProducts = async (req, res) => {
  try {
    let { title, description, price, imageUrl } = req.body;
    let isUrlExist = await productModel.findOne({ imageUrl });
    if (isUrlExist) {
      return res.status(409).json({
        message: "This url is already exist",
      });
    }

    let product = await productModel.create({ title, description, price, imageUrl });

    res.status(201).json({
      message: "Product is created successfully",
      data: product,
    });
  } catch (error) {
    console.log("ERROR IN CREATION->", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let { title, description, price, imageUrl } = req.body;
    let { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await productModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      imageUrl,
    });

    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log("ERROR IN UPDATE PRODUCT ->", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async(req,res)=>{
    try {
        let {id} = req.params
        let product = await productModel.findById(id)
        {if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }}

        await productModel.findByIdAndDelete(id)

        res.status(200).json({
            message:"Product is deleted successfully"
        })
    } catch (error) {
        console.log("ERROR IN DELETION->",error)
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const allProducts = async (req, res) => {
    try {
        const products = await productModel.find({});

        if (products.length === 0) {
            return res.status(200).json({
                message: "No products are added yet"
            });
        }

        return res.status(200).json({
            message: "All products are fetched successfully",
            data: products
        });

    } catch (error) {
        console.log("ERROR IN FETCHING PRODUCTS ->", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product is not found"
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            data: product
        });

    } catch (error) {
        console.log("ERROR IN FETCHING PRODUCT ->", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};