const express = require("express");
var cors = require("cors");
const stripe = require("stripe")('sk_test_51OOjVBSHT8qeCdBLPSdbjauNZQtaBdTu7eUyQG3eSpGlBBGuV6HqzzmebL734iNuEGMtoZ7jdqXxWcg6ymyYlBxi00tbfvgl3r')

const app = express();
app.use(cors())

app.use(express.static("public"))
app.use(express.json());

app.post("/checkout", async (req,res) => {
    const items = req.body;
    let lineItems = [];

    items.forEach( (item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    })
    console.log(lineItems);
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode:'payment',
        success_url : "http://localhost:5713/success",
        cancel_url: "http://localhost:5713/cancel"
    })


    res.send(JSON.stringify({
        url: session.url
    }))
})


app.listen(3000, () => {
    console.log("Server started at port 3000");
})