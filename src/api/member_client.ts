import axios from 'axios';
import { Member } from '../types/member';

const BASE_URL = process.env.REACT_APP_API_URL + '/api/members';

/**
 * Registers a new member.
 * @param member - The member to register.
 * @returns The registered member.
 */
export const registerMember = async (member: Member): Promise<Member> => {
    const response = await axios.post<Member>(BASE_URL, member);
    return response.data;
};

/**
 * Retrieves a member by their ID.
 * @param id - The ID of the member.
 * @returns The member if found, otherwise null.
 */
export const getMemberById = async (id: string): Promise<Member | null> => {
    try {
        const response = await axios.get<Member>(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

/**
 * Lists all members.
 * @returns An array of all members.
 */
export const listAllMembers = async (): Promise<Member[]> => {
    const response = await axios.get<Member[]>(BASE_URL);
    return response.data;
};

/**
 * Deletes a member by their ID.
 * @param id - The ID of the member to delete.
 * @returns Void.
 */
export const deleteMember = async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
};