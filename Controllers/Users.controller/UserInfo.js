import ApiResponse from "../../Utils/ApiResponse.js";


const UserInfo = async (req, res) => {
    const userData = req.user;
    // console.log(userData)
    let response;
    if (userData) {
       response = new ApiResponse(200,userData.fullname,"authenticated user");
    } else {
          response = new ApiResponse(401,"unauthenticated user");
    }
res.status(response.statusCode).json(response)
}



export default UserInfo;