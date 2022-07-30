export const validate = (userData: { name?: string; email: string; password: string; confirmPassword?: string }) => {
    let errorObj = {
        name: true,
        email: true,
        password: true,
        confirmPassword: true
    }
    if (typeof userData.name === 'string' &&
     userData.name.length > 0) errorObj.name = false;

    if (typeof userData.email === 'string' &&
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(userData.email) &&
       userData.email.length > 0) errorObj.email = false;

    if (typeof userData.password === 'string' &&
     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userData.password) &&
      userData.password.length > 0) errorObj.password = false;

    if (typeof userData.confirmPassword === 'string' &&
     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userData.password) &&
      userData.confirmPassword === userData.password &&
       userData.confirmPassword.length > 0) errorObj.confirmPassword = false;

    return errorObj;
}