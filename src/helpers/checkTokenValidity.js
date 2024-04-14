import jwt from 'jsonwebtoken';

function checkTokenValidity(token) {
    try {
        jwt.verify(token, 'your-secret-key');
        return { isValid: true, token };
    } catch (error) {
        return { isValid: false, message: 'Token is no longer valid. Please login again.' };
    }
}

export default checkTokenValidity;