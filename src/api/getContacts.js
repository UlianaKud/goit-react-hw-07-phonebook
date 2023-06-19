import axios from "axios";

export const fetchContacts = async () => {
	const { data } = await axios.get('https://648c92f28620b8bae7ed17e5.mockapi.io/contacts/contacts')
	return data
}

export const addContacts = async (payload) => {
	const { data } = await axios.post(
		`https://648c92f28620b8bae7ed17e5.mockapi.io/contacts/contacts`,
        payload
	)
	return data
}

export const deleteContacts = async (id) => {
	const { data } = await axios.delete(
		`https://648c92f28620b8bae7ed17e5.mockapi.io/contacts/contacts/${id}`
	)
	return data
}