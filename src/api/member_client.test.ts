import axios from 'axios';
import { registerMember, getMemberById, listAllMembers, deleteMember } from './member_client';
import { Member } from '../types/member';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Member API Client', () => {
    const mockMember: Member = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890'
    };

    it('should register a member', async () => {
        mockedAxios.post.mockResolvedValue({ data: mockMember });
        const result = await registerMember(mockMember);
        expect(result).toEqual(mockMember);
    });

    it('should get a member by ID', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockMember });
        const result = await getMemberById('1');
        expect(result).toEqual(mockMember);
    });

    it('should return null if member not found', async () => {
        mockedAxios.get.mockRejectedValue({ response: { status: 404 } });
        const result = await getMemberById('2');
        expect(result).toBeNull();
    });

    it('should list all members', async () => {
        mockedAxios.get.mockResolvedValue({ data: [mockMember] });
        const result = await listAllMembers();
        expect(result).toEqual([mockMember]);
    });

    it('should delete a member', async () => {
        mockedAxios.delete.mockResolvedValue({});
        await expect(deleteMember('1')).resolves.toBeUndefined();
    });
});