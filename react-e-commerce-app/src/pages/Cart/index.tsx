import { useEffect, useState } from "react";

import {
  LocalShippingOutlined,
  PaymentOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Stack, Step, Stepper, Typography } from "@mui/material";

import {
  AddressAndDelivery,
  CartProductsRenderer,
  CartSummary,
  Loading,
} from "../../components";
import { useFetchProductsByIds, useUser } from "../../hooks";
import { IModifiedProduct } from "../../types/product";

const Cart = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useUser();
  const { isLoading, getProductsByIds, products } = useFetchProductsByIds();
  const [modifiedProducts, setModifiedProducts] =
    useState<IModifiedProduct[]>();

  const steps = [
    "Shopping Cart",
    "Address data and type of delivery",
    "Summary",
  ];

  useEffect(() => {
    if (user?.productsInCart.length) {
      const productIds = user.productsInCart.map((product) => product.id);
      getProductsByIds(productIds);
    }
  }, [user]);

  useEffect(() => {
    modifyProducts();
  }, [products]);

  // adds additional fields such as amount
  const modifyProducts = () => {
    if (products?.length && user?.productsInCart.length) {
      let copyProducts = [...products];
      let { productsInCart } = user;
      const mappedProducts: IModifiedProduct[] = copyProducts.map(
        (copyProduct) => {
          const matchedProductInCart = productsInCart.find(
            (item) => item.id === copyProduct.id
          );

          return { ...copyProduct, amount: matchedProductInCart!.amount };
        }
      );

      setModifiedProducts(mappedProducts);
    }
  };

  const handleClickStepIcon = (index: number) => {
    setActiveStep(index);
  };

  const renderPageContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <CartProductsRenderer
            modifiedProducts={modifiedProducts || []}
            setProducts={setModifiedProducts}
          />
        );
      case 1:
        return <AddressAndDelivery />;
      case 2:
        return <CartSummary />;
    }
  };

  const renderStepperIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ShoppingCartOutlined />;
      case 1:
        return <LocalShippingOutlined />;
      case 2:
        return <PaymentOutlined />;
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Stack
        sx={{
          paddingLeft: { xs: "16px", lg: "116px" },
          paddingRight: { xs: "16px", lg: "116px" },
        }}
        rowGap="63px"
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          columnGap="10px"
          sx={{ justifyContent: { xs: "center", lg: "space-between" } }}
        >
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm768: "initial" },
              fontSize: "20px",
              fontWeight: "500",
              maxWidth: { sm768: "288px", md: "343px" },
              width: "100%",
              height: "60px",
              textAlign: { xs: "center", sm768: "initial" },
            }}
          >
            {steps[activeStep]}
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{
              minWidth: "288px",
              maxWidth: { xs: "450px", sm768: "320px" },
              height: "60px",
              width: "100%",
            }}
          >
            {steps.map((label, index) => {
              return (
                <Step
                  key={label}
                  onClick={() => handleClickStepIcon(index)}
                  sx={{
                    height: "36px",
                    width: "36px",
                    backgroundColor: `${
                      index < activeStep
                        ? "#ffffff"
                        : index === activeStep
                        ? "#FBB03B"
                        : "unset"
                    }`,
                    border: `${
                      index > activeStep ? "none" : "1px solid #FBB03B"
                    }`,
                    borderRadius: "100%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "& svg": {
                      color: `${
                        index < activeStep
                          ? "#FBB03B"
                          : index === activeStep
                          ? "#ffffff"
                          : "#D8D8D8"
                      }`,
                    },
                  }}
                >
                  {renderStepperIcon(index)}
                </Step>
              );
            })}
          </Stepper>
        </Stack>
        {renderPageContent()}
      </Stack>
    </>
  );
};

export default Cart;
