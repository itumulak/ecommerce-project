export interface AuthRequestBody {
    email: string;
    password: string;
    currentEmail?: string;
    confirmPassword?: string;
    fullName?: string;
    currentFullName?: string;
    imageUrl?: string;
}