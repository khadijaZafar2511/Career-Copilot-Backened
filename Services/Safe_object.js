const toSafeObject = (user) => {
    const safeObject = user.toObject()
    delete safeObject.password
    delete safeObject.refreshToken;
    return safeObject;
}

export {toSafeObject}