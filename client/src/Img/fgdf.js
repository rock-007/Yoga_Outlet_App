
    
    // product here is an object and quantity(number) is quantity of product customer selected and both coming from child component(Home) and saving as object in basketItems
    const addBasketitems = (product, quantity) => {
        setBasketItems((prevItems) => {
           console.log("prevItems", prevItems);
           console.log("product", product);
           console.log("quantity", quantity);
          return window.localStorage.setItem("user-basket", JSON.stringify([...prevItems, { ...product, quantity }])); // here i can not spread prevItems as it is coming up as null when i console and error
    });
    
return (
<Router>
<Switch>
<Route
path="/"
exact
render={(props) => <Home {...props} userData={userData} userstatus={siginalready} addBasketitems={addBasketitems} />} /
</Switch>
