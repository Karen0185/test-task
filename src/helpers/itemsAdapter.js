const itemsAdapter = (data) => {
    const allItems = []
    data.result.forEach((item) => {
        const isHasItem = allItems.find((currentIntem) => currentIntem.id === item.id);
        if(!isHasItem) {
            allItems.push(item)
        }
    })

    return allItems;
} 

export default itemsAdapter;