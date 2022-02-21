const awsmobile = {
  Auth: {
    region : process.env.REACT_APP_PROJECT_REGION,
    identityPoolId : process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    identityPoolRegion : process.env.REACT_APP_COGNITO_REGION,
    userPoolId : process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId : process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
  }
}

export default awsmobile
