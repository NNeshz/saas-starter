export const authorizedUsers = process.env.AUTHORIZED_EMAILS ? 
    process.env.AUTHORIZED_EMAILS.split(',').map(email => ({
        email: email.trim(),
    })) : [
        {
            email: process.env.NEFTALI_HERNANDEZ_MAIL,
        }
    ];