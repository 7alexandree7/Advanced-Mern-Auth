export const userNotPassword = (user) => {

    const userResponse = user.toObject();
    delete userResponse.password;
    return userResponse;

}