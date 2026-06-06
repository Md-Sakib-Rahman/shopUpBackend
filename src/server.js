require("dotenv").config();
const http = require("http")
const {connectDB} =require("./config/db")


const authRoutes = require("./routes/auth.routes") 


const handleRequest = async (req, res) =>{
    res.setHeader("Content-Type", "application/json");

    if(req.url.startsWith("/api/auth")){
        return authRoutes(req, res)
    }

    res.statusCode = 404
    res.end(
        JSON.stringify({
            message:"Route Not Found"
        })
    )
}

async function startServer() {
  try {
    await connectDB();

    const server = http.createServer(handleRequest);

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();