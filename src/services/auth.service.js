const httpStatus = require('http-status');
const tokenService = require('./token.service');
const Token = require('../models/token.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const mongoose = require('mongoose');


/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const singup = async (userBody, res) => {
  
  let isUser = await User.findOne({email:userBody.email,active:true});

  if(isUser ){
    return {data: "User already exist with this email address.", status: false, code: 400 }
  }

	const user = await User.create(userBody);
	return {data: user,status: true, code:200};
};




/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
 
 
  let user = await User.findOne({ email, active: true });

  
  if (user && !(user.role == 'user')) {
    return {user:null,msg: 'User is not authorized'} ;
  }
  if (!user || !(await user.isPasswordMatch(password))) {

    return {user:null,msg:'Incorrect email or password'} 
  }
  return {user};
};


/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.removeToken();

};



/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await User.findById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.removeToken();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};


/**
 * getCurrentUser
 * @param {string} token
 * @returns {Promise}
 */
const getCurrentUser = async (token) => {
  try {
    const { user } = await tokenService.verifyToken(token, 'refresh');
    const userData = await User.findOne({ _id: mongoose.Types.ObjectId(user), active: true });
    return { userData, status: true, statusCode: 200 };
  } catch (error) {
    // throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'getCurrentUser failed');
    return { userData: null, profileData: null, isError: 'getCurrentUser failed', status: false, statusCode: 500 }
  }
};

//check Email already exists
const checkEmail = async (email) => {
  return await User.findOne({ email: email });
}; 

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  getCurrentUser,
  singup,
  checkEmail,
};
