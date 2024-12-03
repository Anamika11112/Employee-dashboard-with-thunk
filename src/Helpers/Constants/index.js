export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
export const phoneRegex = /^[0-9]{10}$/;
export const textRegex = /^[a-zA-Z]+$/;
export const designationRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
export const baseUrl = "http://localhost:8000/api";