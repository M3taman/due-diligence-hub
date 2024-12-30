
import supabase from './supabaseClient';

// Function to fetch all profiles
export async function fetchProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error('Error fetching profiles:', error);
        return null;
    }
    return data;
}

// Function to insert a new profile
export async function insertProfile(email: string, role: string) {
    const { data, error } = await supabase
        .from('profiles')
        .insert([{ email, role }]);

    if (error) {
        console.error('Error inserting profile:', error);
        return null;
    }
    return data;
}

// Function to update a profile
export async function updateProfile(id: number, email: string, role: string) {
    const { data, error } = await supabase
        .from('profiles')
        .update({ email, role })
        .eq('id', id);

    if (error) {
        console.error('Error updating profile:', error);
        return null;
    }
    return data;
}

// Function to delete a profile
export async function deleteProfile(id: number) {
    const { data, error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting profile:', error);
        return null;
    }
    return data;
}