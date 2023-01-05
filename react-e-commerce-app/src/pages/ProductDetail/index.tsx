import {
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useFetchProduct } from "../../hooks";
import { ColorPalette, FavoriteButton, Loading } from "../../components";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ChevronRight,
  DescriptionOutlined,
  Star,
  Person2Outlined,
} from "@mui/icons-material";
import { useState } from "react";
import { ProductCareIcon, ProductMaterialsIcon } from "../../ui";
import { height } from "@mui/system";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, product } = useFetchProduct(searchParams.get("id") || "");
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<"description" | "reviews">(
    "reviews"
  );

  const renderComments = () => {};

  const renderProductDescription = () => {
    return (
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        rowGap="40px"
      >
        {/* DESCRIPTION */}
        <Stack alignItems="center">
          <DescriptionOutlined
            sx={{
              marginBottom: "49px",
              height: "67px",
              width: "52.2px",
              opacity: "0.1",
            }}
          />
          <Typography
            fontSize="16px"
            fontWeight="600"
            textAlign="center"
            sx={{ marginBottom: "35px" }}
          >
            Details and product description
          </Typography>
          <Typography fontSize="14px">
            {product?.description.details}
          </Typography>
        </Stack>

        {/* MATERIALS */}
        <Stack alignItems="center">
          <ProductMaterialsIcon
            sx={{
              marginBottom: "49px",
              height: "67px",
              width: "52.2px",
            }}
            viewBox="0 0 30.15 67"
            data-testid="productMaterials"
          />
          <Typography
            fontSize="16px"
            fontWeight="600"
            textAlign="center"
            sx={{ marginBottom: "35px" }}
          >
            Material(s) and care
          </Typography>
          <Typography fontSize="14px" sx={{ marginBottom: "10px" }}>
            {product?.description.materials}
          </Typography>
          <ProductCareIcon
            sx={{
              height: "28px",
              width: "215px",
            }}
            viewBox="0 0 215 28"
            data-testid="productMaterials"
          />
        </Stack>
      </Stack>
    );
  };

  const renderProductReviews = () => {
    return (
      <Stack direction="row" flexWrap="wrap" rowGap="40px">
        {/* RATING*/}
        <Stack rowGap="40px" alignItems="center">
          <Stack
            gap="40px"
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            {/* RATING POINTS */}
            <Stack alignItems="center">
              <Typography fontSize="59px" fontWeight="600">
                4.5
              </Typography>
              <Rating
                name="read-only"
                defaultValue={4.5}
                precision={0.5}
                readOnly
                size="small"
                sx={{ marginBottom: "14px" }}
              />
              <Typography
                fontSize="12px"
                color="#B9B9B9"
                sx={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <Person2Outlined sx={{ height: "15px" }} /> 81 all opinions
              </Typography>
            </Stack>

            {/* RATING CHART */}
            <Stack rowGap="7px">
              {[1, 2, 3, 4, 5].map((number, index) => (
                <Stack direction="row" alignItems="center" key={number}>
                  <Star sx={{ fill: "#ffb53d" }} />
                  <Typography
                    sx={{
                      marginLeft: "9px",
                      marginRight: "18px",
                      width: "4px",
                    }}
                  >
                    {number}
                  </Typography>
                  <Box
                    sx={{
                      width: "142px",
                      height: "2px",
                      background: "#DBDBDB",
                      borderRadius: "2px",
                      position: "relative",
                      "&:before": {
                        background: "#ffb53d",
                        borderRadius: "2px",
                        content: '""',
                        height: "2px",
                        position: "absolute",
                        left: "0px",
                        right: `calc(${Math.floor(Math.random() * 101)}%)`,
                        zIndex: 2,
                      },
                    }}
                  ></Box>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <Button
            sx={{
              backgroundColor: "#FBB03B",
              borderRadius: "56px",
              color: "#000000",
              display: "flex",
              alignItems: "center",
              fontSize: "13px",
              height: "49px",
              maxWidth: { xs: "400px", sm: "448px" },
              textAlign: "center",
              width: "189px",
              "&:hover": {
                backgroundColor: "#ffb53d",
              },
            }}
          >
            ADD TO OPINION
          </Button>
        </Stack>

        {/* COMMENT */}
        <Stack></Stack>
      </Stack>
    );
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Stack sx={{ minHeight: "500px" }}>
        {product ? (
          <>
            {/* PRODUCT IMAGE */}
            <Box
              sx={{
                position: "relative",
                maxHeight: "375px",
                width: "100%",
                "& .product-detail-image": { maxWidth: "100%" },
              }}
            >
              <img src={product.imageUrl} className="product-detail-image" />
              <FavoriteButton />
            </Box>

            {/* PRICE - COLOR - BUTTONS */}
            <Stack
              sx={{
                padding: "36px",
                marginTop: "33px",
                rowGap: "39px",
              }}
            >
              {/* NAME AND PRICE */}
              <Box>
                <Typography fontSize="21px" fontWeight="400">
                  {product.name}
                </Typography>
                <Typography fontSize="21px" fontWeight="400">
                  ${product.price}
                </Typography>
              </Box>

              {/* COLOR PALETTE */}
              <Box>
                <Typography
                  fontSize="13px"
                  fontWeight="300"
                  marginBottom="17px"
                >
                  Color:
                </Typography>
                <ColorPalette
                  colors={product.colors}
                  sx={{
                    columnGap: "13px",
                    "& .colorBox": { border: "1px solid #E6E6E6 !important" },
                  }}
                />
              </Box>

              {/* SIZE */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "17px",
                  }}
                >
                  <Typography fontSize="13" fontWeight="300">
                    Size:{" "}
                  </Typography>
                  <Typography
                    fontSize="13"
                    sx={{
                      cursor: "pointer",
                      fontWeight: { xs: "400", sm: "600" },
                    }}
                  >
                    See size table
                  </Typography>
                </Box>
                <IconButton
                  component="button"
                  sx={{
                    border: "1px solid #D8D8D8",
                    borderRadius: "49px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px 26.9px 15px 31px",
                    height: "49px",
                    width: "184px",
                  }}
                >
                  <Typography
                    color="#AAAAAA"
                    fontSize="13px"
                    fontWeight="500"
                    textTransform="uppercase"
                  >
                    Choose size
                  </Typography>
                  <ChevronRight sx={{ fontSize: "20px", fill: "#B5B5B5" }} />
                </IconButton>
              </Box>

              <Typography fontSize="13px" fontWeight="300" marginBottom="-17px">
                Quantity:
              </Typography>

              {/* BUTTONS  */}
              <Stack
                direction="row"
                gap="15px"
                flexWrap="wrap"
                alignItems="center"
              >
                {/* QUANTITY */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  columnGap="21px"
                  sx={{
                    border: "1px solid #D8D8D8",
                    borderRadius: "49px",
                    padding: "15px",
                    height: "49px",
                    width: "184px",
                  }}
                >
                  <IconButton
                    component="button"
                    sx={{
                      color: `${productQuantity > 1 ? "#000000" : "#D8D8D8"}`,
                    }}
                    {...(productQuantity === 1 && { disabled: true })}
                    onClick={() =>
                      setProductQuantity((prevState) => prevState - 1)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    color="#000000"
                    fontSize="16px"
                    fontWeight="500"
                    textAlign="center"
                    sx={{ width: "10px" }}
                  >
                    {productQuantity}
                  </Typography>
                  <IconButton
                    component="button"
                    sx={{
                      color: `${
                        productQuantity >= product.stockAmount
                          ? "#D8D8D8"
                          : "#000000"
                      }`,
                    }}
                    {...(productQuantity >= product.stockAmount && {
                      disabled: true,
                    })}
                    onClick={() =>
                      setProductQuantity((prevState) => prevState + 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>

                {/* ADD TO CART - FAVORITE */}
                <Stack direction="row" gap="15px" alignItems="center">
                  <Button
                    sx={{
                      backgroundColor: "#FBB03B",
                      borderRadius: "56px",
                      color: "#000000",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "13px",
                      height: "49px",
                      maxWidth: { xs: "400px", sm: "448px" },
                      textAlign: "center",
                      width: "189px",
                      "&:hover": {
                        backgroundColor: "#ffb53d",
                      },
                    }}
                  >
                    ADD TO CART
                  </Button>
                  <FavoriteButton position="static" />
                </Stack>
              </Stack>
            </Stack>

            {/* DESCRIPTION - REVIEWS */}
            <Stack
              sx={{
                padding: "36px",
                marginTop: "33px",
                rowGap: "39px",
              }}
            >
              <Stack direction="row" sx={{ columnGap: { xs: "10px" } }}>
                <Button
                  sx={{
                    height: "49px",
                    width: "189px",
                    border: `1px solid ${
                      selectedTab === "description" ? "#FBB03B" : "#D8D8D8"
                    }`,
                    borderRadius: "49px",
                    color: `${
                      selectedTab === "description" ? "#000000" : "#D4D4D4"
                    }`,
                    textAlign: "center",
                    "&:hover": {
                      background: `${
                        selectedTab === "description" && "#FBB03B"
                      }`,
                    },
                  }}
                  onClick={() => setSelectedTab("description")}
                >
                  DESCRIPTION
                </Button>
                <Button
                  sx={{
                    height: "49px",
                    width: "189px",
                    border: `1px solid ${
                      selectedTab === "reviews" ? "#FBB03B" : "#D8D8D8"
                    }`,
                    borderRadius: "49px",
                    color: `${
                      selectedTab === "reviews" ? "#000000" : "#D4D4D4"
                    }`,
                    textAlign: "center",
                    "&:hover": {
                      background: `${selectedTab === "reviews" && "#FBB03B"}`,
                    },
                  }}
                  onClick={() => setSelectedTab("reviews")}
                >
                  REVIEWS &nbsp; (3)
                </Button>
              </Stack>
              <Stack rowGap="20px">
                {selectedTab === "reviews"
                  ? renderProductReviews()
                  : renderProductDescription()}
              </Stack>
            </Stack>
          </>
        ) : (
          <Typography>Something went wrong</Typography>
        )}
      </Stack>
    </>
  );
};

export default ProductDetail;