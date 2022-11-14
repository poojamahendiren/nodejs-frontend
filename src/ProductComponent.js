import React, {useEffect,useState} from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography, Box, Toolbar, AppBar, Card, CardContent, CardActions, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
function ProductComponent() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProduct() {
            const decodedToken = jwt.decode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate("/");
            } else {
                const response = await axios.get("http://localhost:3001/products/get" ,
            {
                headers : {
                    accesstoken : localStorage.getItem("token"),

            }
        });
            console.log(response.data);
            setProducts(response.data);

            }
            
        }
        getProduct();
        }, []);

        
        const updateProduct = async (id , value) => {
          const decodedToken = jwt.decode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate("/");
            } else {
          const response = await axios.put(`http://localhost:3001/products/update/${id}`,
          {
            products:{
              userQuantity : value,
            },
          },
          {headers:{
            accesstoken:localStorage.getItem("token"),
          }})
          let productsCopy = [...products];
          const index = productsCopy.findIndex((row) => row._id === id);
          products[index].userQuantity = response.data.value.userQuantity;
          setProducts(productsCopy);
        }
      };
      const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
      }
    return(
        <>
        <Grid>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GUVI-PRODUCTS
          </Typography>
          <Button color="inherit" onClick={()=>handleLogout()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid container spacing={2} style={{padding:"20px"}}>
      {products.map(row => (
        <Grid item key={row._id}>
          <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {row.productName}
        </Typography>
        
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Quantity : {row.quantity}
        </Typography>
        <Typography variant="body2">
        {row.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <strong>Price : {row.price}</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> updateProduct(row._id,++row.userQuantity)} disabled={row.userQuantity >= row.quantity}>+</Button> {row.userQuantity} <Button size="small" onClick={()=> updateProduct(row._id,--row.userQuantity) }disabled={row.userQuantity <= 0}>-</Button>
      </CardActions>
    </Card>
        </Grid>
      ))}
    </Grid>

        </Grid>
        </>
    )
}

export default ProductComponent;