import post from "./client";

const allItems = {
    getItems: async (data) => {
        return post('',data)
    },
    getAllItems: async (data) => {
        return post('',data)
    }
}

export default allItems;