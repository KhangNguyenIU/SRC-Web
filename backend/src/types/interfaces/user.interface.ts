import { Faculty } from "@entities/faculty.entity";
import { Feedback } from "@entities/feedback.entity";
import { ROLE } from "@enums";

export class UserDecode{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    avatar:string;
    role: ROLE;
    feedback: Feedback;
    faculty: Faculty
}
