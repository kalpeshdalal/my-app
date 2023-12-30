

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const moment = require('moment');
const { authService, userService, tokenService } = require('../services');
const { sendResponse } = require('../utils/responseHandler');

const register = catchAsync(async (req, res) => {

  try {
    const { email, password, name, role } = req.body;
    const isEmailTaken = await authService.checkEmail(email)
    
    if(isEmailTaken){
      sendResponse(res, httpStatus.BAD_REQUEST, "Email Already taken", null,null);
    }
    let roleOfUser = role ? role : 'user';
    let userObj = {
      email,
      password,
      name,
      role: roleOfUser,
    };
    
    const user = await authService.singup(userObj);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (error) {
    sendResponse(res, httpStatus.BAD_REQUEST, error.message, null,null);
  }

});

const singup = catchAsync(async (req, res) => {

  try {
    const { email, password, name } = req.body;
    let generatedOtp = Math.floor(Math.random() * 9000) + 1000;
    // let generatedOtp = 1234;
    let userObj = {
      email,
      password,
      name,
      role: 'user',
    };
    
    const user = await authService.singup(userObj);
    if(user.code == 200){

    const tokens = await tokenService.generateAuthTokens(user.data);
    res.status(httpStatus.CREATED).send({ user, tokens });
}
   sendResponse(res,httpStatus.BAD_REQUEST,user,null)
  } catch (error) {
  sendResponse(res,httpStatus.BAD_REQUEST,error.message,null)
  }

});






const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

    const user = await authService.loginUserWithEmailAndPassword(email, password);
    if(user && !user.user){
      sendResponse(res, httpStatus.FORBIDDEN, null,user.msg);
      return;
    }
    const tokens = await tokenService.generateAuthTokens(user.user);
    sendResponse(res, httpStatus.OK, { user:user.user, tokens }, null);
});





const getCurrentUser = catchAsync(async (req, res) => {
  try {
    const { token } = req.body;
    const userRes = await authService.getCurrentUser(token);
    if (userRes.status) {
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        status:true,
        data: { userData: userRes.userData, profileData:userRes.profileData }
      });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        status:false,
        data: 'something went wrong',
      });
    }
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      data: err.message,
    });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  getCurrentUser,
  singup,
};
